// utils/game-daily.js
var gameSave = require('./game-save');
var stageData = require('../subpkg-chapters/data/game-stages');

// --- Seeded daily random ---
function _dailySeed() {
  var today = gameSave._today();
  var hash = 0;
  for (var i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash + today.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function _seededRandom(seed) {
  var state = seed | 0;
  return function() {
    state = (state + 0x6D2B79F5) | 0;
    var t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- Pick 3 random questions for today ---
function getDailyQuestions() {
  var allQuestions = [];
  stageData.stages.forEach(function(stage) {
    stage.questions.forEach(function(q) {
      allQuestions.push(q);
    });
  });

  var rng = _seededRandom(_dailySeed());
  var shuffled = allQuestions.slice();
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(rng() * (i + 1));
    var temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled.slice(0, 3);
}

// --- Daily state ---
function getDailyState() {
  var data = gameSave.load();
  var today = gameSave._today();

  if (data.dailyChallenge.date !== today) {
    gameSave.update(function(d) {
      d.dailyChallenge = { date: today, completed: false, score: 0 };
    });
    return { date: today, completed: false, score: 0 };
  }

  return data.dailyChallenge;
}

function completeDailyChallenge(correctCount) {
  var today = gameSave._today();
  gameSave.update(function(data) {
    data.dailyChallenge = { date: today, completed: true, score: correctCount };
  });

  gameSave.addExp(20);
  _updateStreak();

  return { expAwarded: 20, allCorrect: correctCount === 3 };
}

// --- Streak ---
function _updateStreak() {
  var today = gameSave._today();
  gameSave.update(function(data) {
    var streak = data.streak;
    var daysSince = gameSave._daysBetween(streak.lastDate, today);

    if (daysSince === 0) {
      return;
    } else if (daysSince === 1) {
      streak.current++;
    } else if (daysSince === 2 && streak.shields > 0) {
      streak.shields--;
      streak.current++;
    } else {
      if (streak.current >= 30) {
        streak.current = 15;
      } else if (streak.current >= 7) {
        streak.current = 3;
      } else {
        streak.current = 0;
      }
      streak.current++;
    }

    if (streak.current > streak.best) {
      streak.best = streak.current;
    }

    if (streak.current > 0 && streak.current % 7 === 0) {
      streak.shields++;
    }

    streak.lastDate = today;
  });
}

function getStreakInfo() {
  var data = gameSave.load();
  return {
    current: data.streak.current,
    best: data.streak.best,
    shields: data.streak.shields,
    lastDate: data.streak.lastDate
  };
}

module.exports = {
  getDailyQuestions: getDailyQuestions,
  getDailyState: getDailyState,
  completeDailyChallenge: completeDailyChallenge,
  getStreakInfo: getStreakInfo
};
