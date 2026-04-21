// subpkg-chapters/pages/chapter/chapter.js
var i18n = require('../../../utils/i18n');
var gameEngine = require('../../../utils/game-engine');
var gameCards = require('../../../utils/game-cards');
var gameDaily = require('../../../utils/game-daily');
var gameSave = require('../../../utils/game-save');
var stageData = require('../../data/game-stages');

function _findStage(chapterId) {
  var stageId = 'stage_' + chapterId;
  var stages = stageData.stages;
  for (var i = 0; i < stages.length; i++) {
    if (stages[i].id === stageId) return stages[i];
  }
  return null;
}

var REGION_COLORS = {
  core: '#3FB950',
  tools: '#58A6FF',
  runtime: '#BC8CFF',
  network: '#F85149',
  practice: '#D29922'
};

Page({
  data: {
    mode: 'stage',
    locale: 'zh',
    stageTitle: '',
    regionLabel: '',
    regionColor: '#3FB950',

    phase: 0,
    phaseLabel: '',
    finished: false,

    currentQuestion: null,
    questionIndex: 0,
    totalQuestions: 0,
    progressPercent: 0,

    showFeedback: false,
    feedbackCorrect: false,
    feedbackExplanation: '',
    feedbackAnswer: '',
    selectedOption: '',

    showReview: false,
    reviewCards: [],

    showSettlement: false,
    result: null,
    earnedCardDetails: [],
    newLevel: null
  },

  _session: null,

  onLoad: function(options) {
    var locale = i18n.getLocale();
    this.setData({ locale: locale });

    if (options.mode === 'daily') {
      this._startDaily(locale);
    } else {
      var chapterId = options.id || 's01';
      this._startStage(chapterId, locale);
    }
  },

  _startStage: function(chapterId, locale) {
    var stage = _findStage(chapterId);
    if (!stage) {
      wx.showToast({ title: '关卡未找到', icon: 'none' });
      wx.navigateBack();
      return;
    }

    var t = stage.title;
    var title = t[locale] || t.zh || t.en || chapterId;
    var regionLabels = { core: 'CORE/', tools: 'TOOLS/', runtime: 'RUNTIME/', network: 'NETWORK/', practice: 'PRACTICE/' };

    this._session = gameEngine.createSession(stage);

    var q = gameEngine.getCurrentQuestion(this._session);
    this.setData({
      mode: 'stage',
      stageTitle: title,
      regionLabel: regionLabels[stage.region] || '',
      regionColor: REGION_COLORS[stage.region] || '#3FB950',
      phase: 1,
      phaseLabel: 'CHALLENGE',
      currentQuestion: this._formatQuestion(q, locale),
      questionIndex: 1,
      totalQuestions: stage.questions.length,
      progressPercent: Math.round(1 / stage.questions.length * 100)
    });
  },

  _startDaily: function(locale) {
    var questions = gameDaily.getDailyQuestions();
    if (!questions || questions.length === 0) {
      wx.showToast({ title: '每日挑战加载失败', icon: 'none' });
      wx.navigateBack();
      return;
    }

    var fakeDailyStage = {
      id: 'stage_daily',
      chapter: 'daily',
      region: 'core',
      questions: questions,
      star_thresholds: [0.4, 0.7, 1.0],
      reward_cards: []
    };

    this._session = gameEngine.createSession(fakeDailyStage);

    var q = gameEngine.getCurrentQuestion(this._session);
    this.setData({
      mode: 'daily',
      stageTitle: '每日挑战',
      regionLabel: 'DAILY/',
      regionColor: '#D29922',
      phase: 1,
      phaseLabel: 'CHALLENGE',
      currentQuestion: this._formatQuestion(q, locale),
      questionIndex: 1,
      totalQuestions: questions.length,
      progressPercent: Math.round(1 / questions.length * 100)
    });
  },

  _formatQuestion: function(q, locale) {
    if (!q) return null;
    var stem = q.stem;
    var stemText = stem[locale] || stem.zh || stem.en || '';
    var options = q.options.map(function(opt) {
      var text = opt.text;
      return {
        id: opt.id,
        text: text[locale] || text.zh || text.en || ''
      };
    });
    var diffLabels = { 1: '>_', 2: '>>', 3: '>>>' };
    return {
      id: q.id,
      stem: stemText,
      options: options,
      difficulty: q.difficulty,
      diffLabel: diffLabels[q.difficulty] || '>_'
    };
  },

  selectOption: function(e) {
    if (this.data.showFeedback) return;
    var optionId = e.currentTarget.dataset.optionid;
    this.setData({ selectedOption: optionId });
  },

  confirmAnswer: function() {
    if (!this.data.selectedOption || this.data.showFeedback) return;

    var session = this._session;
    var q = this.data.currentQuestion;
    var locale = this.data.locale;
    var result = gameEngine.submitAnswer(session, q.id, this.data.selectedOption);

    if (!result) return;

    var explanation = result.explanation;
    var explText = explanation[locale] || explanation.zh || explanation.en || '';

    this.setData({
      showFeedback: true,
      feedbackCorrect: result.correct,
      feedbackExplanation: explText,
      feedbackAnswer: result.answer
    });
  },

  nextQuestion: function() {
    var session = this._session;
    var locale = this.data.locale;

    if (session.phase === 2 && this.data.phase === 1) {
      this._enterReviewPhase(locale);
      return;
    }

    if (session.finished) {
      this._showSettlement();
      return;
    }

    var q = gameEngine.getCurrentQuestion(session);
    if (!q) {
      if (session.phase === 2) {
        this._enterReviewPhase(locale);
      } else {
        this._showSettlement();
      }
      return;
    }

    var totalQ = this.data.phase === 3 ? session.wrongIds.length : session.questions.length;
    var idx = session.currentIndex + 1;

    this.setData({
      currentQuestion: this._formatQuestion(q, locale),
      showFeedback: false,
      selectedOption: '',
      feedbackCorrect: false,
      feedbackExplanation: '',
      feedbackAnswer: '',
      questionIndex: idx,
      totalQuestions: totalQ,
      progressPercent: Math.round(idx / totalQ * 100)
    });
  },

  _enterReviewPhase: function(locale) {
    var session = this._session;

    var reviewCards = session.questions.map(function(q) {
      var ans = session.answers[q.id];
      if (!ans) return null;
      var stemText = q.stem[locale] || q.stem.zh || q.stem.en || '';
      var explText = q.explanation[locale] || q.explanation.zh || q.explanation.en || '';
      var correctText = '';
      for (var i = 0; i < q.options.length; i++) {
        if (q.options[i].id === q.answer) {
          var t = q.options[i].text;
          correctText = t[locale] || t.zh || t.en || '';
          break;
        }
      }
      return {
        stem: stemText,
        correct: ans.correct,
        correctAnswer: correctText,
        explanation: explText
      };
    }).filter(Boolean);

    this.setData({
      phase: 2,
      phaseLabel: 'REVIEW',
      showReview: true,
      showFeedback: false,
      reviewCards: reviewCards,
      currentQuestion: null
    });
  },

  continueAfterReview: function() {
    var session = this._session;
    var locale = this.data.locale;
    gameEngine.completeReviewPhase(session);

    if (session.finished) {
      this._showSettlement();
      return;
    }

    var q = gameEngine.getCurrentQuestion(session);
    this.setData({
      phase: 3,
      phaseLabel: 'CONFIRM',
      showReview: false,
      currentQuestion: this._formatQuestion(q, locale),
      questionIndex: 1,
      totalQuestions: session.wrongIds.length,
      progressPercent: Math.round(1 / session.wrongIds.length * 100)
    });
  },

  _showSettlement: function() {
    var session = this._session;
    var result = gameEngine.getSessionResult(session);
    var locale = this.data.locale;
    var prevLevel = gameSave.getLevelInfo();

    if (this.data.mode === 'daily') {
      gameDaily.completeDailyChallenge(result.correctCount);
    } else {
      gameEngine.saveStageResult(result);
      if (result.earnedCards.length > 0) {
        gameCards.obtainCards(result.earnedCards);
      }
    }

    var newLevelInfo = gameSave.getLevelInfo();
    var leveledUp = newLevelInfo.level > prevLevel.level;

    var earnedCardDetails = result.earnedCards.map(function(cardId) {
      var card = gameCards.getCard(cardId);
      if (!card) return null;
      var name = card.name;
      return {
        id: card.id,
        name: name[locale] || name.zh || name.en || cardId,
        rarity: card.rarity,
        region: card.region
      };
    }).filter(Boolean);

    this.setData({
      finished: true,
      showSettlement: true,
      showReview: false,
      showFeedback: false,
      currentQuestion: null,
      result: {
        stars: result.stars,
        correctCount: result.correctCount,
        totalQuestions: result.totalQuestions,
        expReward: result.expReward,
        ratio: Math.round(result.ratio * 100)
      },
      earnedCardDetails: earnedCardDetails,
      newLevel: leveledUp ? newLevelInfo : null
    });
  },

  goBack: function() {
    wx.navigateBack({ delta: 1 });
  },

  retryStage: function() {
    if (this.data.mode === 'daily') {
      wx.navigateBack();
      return;
    }
    var session = this._session;
    if (!session) return;
    var stage = _findStage(session.chapter);
    if (stage) {
      this._startStage(session.chapter, this.data.locale);
      this.setData({
        finished: false,
        showSettlement: false,
        showReview: false,
        showFeedback: false,
        selectedOption: ''
      });
    }
  },

  goToMap: function() {
    wx.switchTab({ url: '/pages/timeline/timeline' });
  },

  onShareAppMessage: function() {
    return {
      title: 'Claude Code Terminal — 闯关',
      path: '/pages/home/home'
    };
  },

  onShareTimeline: function() {
    return {
      title: 'Claude Code Terminal — 闯关'
    };
  }
});
