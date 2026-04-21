// utils/game-engine.js
var gameSave = require('./game-save');

// --- Stage Session ---
function createSession(stage) {
  return {
    stageId: stage.id,
    chapter: stage.chapter,
    region: stage.region,
    questions: stage.questions.slice(),
    starThresholds: stage.star_thresholds,
    rewardCards: stage.reward_cards,
    phase: 1,
    currentIndex: 0,
    answers: {},
    wrongIds: [],
    confirmAnswers: {},
    finished: false
  };
}

// --- Phase 1: Challenge (Ask First) ---
function getCurrentQuestion(session) {
  if (session.finished) return null;

  if (session.phase === 1 || session.phase === 2) {
    if (session.currentIndex >= session.questions.length) return null;
    return session.questions[session.currentIndex];
  }

  if (session.phase === 3) {
    if (session.currentIndex >= session.wrongIds.length) return null;
    var wrongId = session.wrongIds[session.currentIndex];
    for (var i = 0; i < session.questions.length; i++) {
      if (session.questions[i].id === wrongId) return session.questions[i];
    }
    return null;
  }

  return null;
}

function submitAnswer(session, questionId, chosenOptionId) {
  var question = null;
  for (var i = 0; i < session.questions.length; i++) {
    if (session.questions[i].id === questionId) {
      question = session.questions[i];
      break;
    }
  }
  if (!question) return null;

  var isCorrect = chosenOptionId === question.answer;

  if (session.phase === 1) {
    session.answers[questionId] = { chosen: chosenOptionId, correct: isCorrect };
    if (!isCorrect) {
      session.wrongIds.push(questionId);
    }
    session.currentIndex++;

    if (session.currentIndex >= session.questions.length) {
      session.phase = 2;
      session.currentIndex = 0;
    }
  } else if (session.phase === 3) {
    session.confirmAnswers[questionId] = { chosen: chosenOptionId, correct: isCorrect };
    session.currentIndex++;

    if (session.currentIndex >= session.wrongIds.length) {
      session.finished = true;
    }
  }

  return {
    correct: isCorrect,
    answer: question.answer,
    explanation: question.explanation
  };
}

// --- Phase 2: Teach (Review) ---
function completeReviewPhase(session) {
  if (session.phase !== 2) return;

  if (session.wrongIds.length === 0) {
    session.finished = true;
  } else {
    session.phase = 3;
    session.currentIndex = 0;
  }
}

// --- Scoring ---
function getSessionResult(session) {
  var totalQuestions = session.questions.length;
  var correctInPhase1 = 0;
  var keys = Object.keys(session.answers);
  for (var i = 0; i < keys.length; i++) {
    if (session.answers[keys[i]].correct) correctInPhase1++;
  }

  var ratio = totalQuestions > 0 ? correctInPhase1 / totalQuestions : 0;

  var stars = 0;
  if (ratio >= session.starThresholds[2]) stars = 3;
  else if (ratio >= session.starThresholds[1]) stars = 2;
  else if (ratio >= session.starThresholds[0]) stars = 1;

  var earnedCards = [];
  if (stars >= 1 && session.rewardCards.length > 0) earnedCards.push(session.rewardCards[0]);
  if (stars >= 2 && session.rewardCards.length > 1) earnedCards.push(session.rewardCards[1]);
  if (stars >= 3 && session.rewardCards.length > 2) earnedCards.push(session.rewardCards[2]);

  var expReward = stars === 3 ? 100 : stars === 2 ? 60 : stars === 1 ? 30 : 10;

  var reviewIds = [];
  for (var j = 0; j < session.wrongIds.length; j++) {
    var wId = session.wrongIds[j];
    if (!session.confirmAnswers[wId] || !session.confirmAnswers[wId].correct) {
      reviewIds.push(wId);
    }
  }

  return {
    stageId: session.stageId,
    stars: stars,
    correctCount: correctInPhase1,
    totalQuestions: totalQuestions,
    ratio: ratio,
    earnedCards: earnedCards,
    expReward: expReward,
    reviewIds: reviewIds
  };
}

// --- Persist Results ---
function saveStageResult(result) {
  gameSave.update(function(data) {
    var prev = data.stages[result.stageId];
    if (!prev || result.stars > prev.stars) {
      data.stages[result.stageId] = {
        stars: result.stars,
        bestScore: result.correctCount,
        attempts: prev ? prev.attempts + 1 : 1
      };
    } else {
      data.stages[result.stageId].attempts = (prev.attempts || 0) + 1;
    }

    result.reviewIds.forEach(function(qId) {
      if (data.review.indexOf(qId) === -1) {
        data.review.push(qId);
      }
    });
  });

  gameSave.addExp(result.expReward);
}

// --- Query Helpers ---
function getStageProgress(stageId) {
  var data = gameSave.load();
  return data.stages[stageId] || null;
}

function getRegionProgress(regionStageIds) {
  var data = gameSave.load();
  var cleared = 0;
  var totalStars = 0;
  regionStageIds.forEach(function(sId) {
    var s = data.stages[sId];
    if (s && s.stars > 0) {
      cleared++;
      totalStars += s.stars;
    }
  });
  return {
    cleared: cleared,
    total: regionStageIds.length,
    totalStars: totalStars,
    ratio: regionStageIds.length > 0 ? cleared / regionStageIds.length : 0
  };
}

function isRegionUnlocked(region, allStages) {
  var data = gameSave.load();
  var unlockRules = {
    core: { requires: null, count: 0 },
    tools: { requires: 'core', count: 4 },
    runtime: { requires: 'tools', count: 3 },
    network: { requires: 'runtime', count: 2 },
    practice: { requires: null, count: 0, specialRule: 'any3regions' }
  };

  var rule = unlockRules[region];
  if (!rule) return false;

  if (!rule.requires && !rule.specialRule) return true;

  if (rule.specialRule === 'any3regions') {
    var regionsClear = 0;
    var regions = ['core', 'tools', 'runtime', 'network'];
    regions.forEach(function(r) {
      var rStages = allStages.filter(function(s) { return s.region === r; });
      var cleared = 0;
      rStages.forEach(function(s) {
        var rec = data.stages[s.id];
        if (rec && rec.stars > 0) cleared++;
      });
      if (cleared >= Math.ceil(rStages.length * 0.5)) regionsClear++;
    });
    return regionsClear >= 3;
  }

  var reqStages = allStages.filter(function(s) { return s.region === rule.requires; });
  var cleared = 0;
  reqStages.forEach(function(s) {
    var rec = data.stages[s.id];
    if (rec && rec.stars > 0) cleared++;
  });
  return cleared >= rule.count;
}

module.exports = {
  createSession: createSession,
  getCurrentQuestion: getCurrentQuestion,
  submitAnswer: submitAnswer,
  completeReviewPhase: completeReviewPhase,
  getSessionResult: getSessionResult,
  saveStageResult: saveStageResult,
  getStageProgress: getStageProgress,
  getRegionProgress: getRegionProgress,
  isRegionUnlocked: isRegionUnlocked
};
