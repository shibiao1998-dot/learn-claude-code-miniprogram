// subpkg-chapters/pages/chapter/chapter.js
var i18n = require('../../../utils/i18n');
var gameEngine = require('../../../utils/game-engine');
var gameCards = require('../../../utils/game-cards');
var gameDaily = require('../../../utils/game-daily');
var gameSave = require('../../../utils/game-save');
var gameReview = require('../../../utils/game-review');
var stageData = require('../../data/game-stages');
var sound = require('../../../utils/sound');
var shareCard = require('../../../utils/share-card');

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
    newLevel: null,
    animStep: 0,
    reviewMode: false,
    reviewMastered: 0,
    reviewRemaining: 0
  },

  _session: null,

  onLoad: function(options) {
    var locale = i18n.getLocale();
    this.setData({ locale: locale });

    if (options.mode === 'review') {
      this._startReview(locale);
    } else if (options.mode === 'daily') {
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

  _startReview: function(locale) {
    var queue = gameReview.getReviewQueue();
    if (!queue || queue.length === 0) {
      wx.showToast({ title: '暂无待复习题目', icon: 'none' });
      wx.navigateBack();
      return;
    }

    var allStages = stageData.stages;
    var questions = [];
    for (var i = 0; i < queue.length; i++) {
      var qId = queue[i].questionId;
      var found = false;
      for (var s = 0; s < allStages.length; s++) {
        var qs = allStages[s].questions;
        for (var q = 0; q < qs.length; q++) {
          if (qs[q].id === qId) {
            questions.push(qs[q]);
            found = true;
            break;
          }
        }
        if (found) break;
      }
    }

    if (questions.length === 0) {
      wx.showToast({ title: '题目数据加载失败', icon: 'none' });
      wx.navigateBack();
      return;
    }

    var fakeReviewStage = {
      id: 'stage_review',
      chapter: 'review',
      region: 'core',
      questions: questions,
      star_thresholds: [0.4, 0.7, 1.0],
      reward_cards: []
    };

    this._session = gameEngine.createSession(fakeReviewStage);

    var firstQ = gameEngine.getCurrentQuestion(this._session);
    this.setData({
      mode: 'review',
      reviewMode: true,
      stageTitle: '错题复习',
      regionLabel: 'REVIEW/',
      regionColor: '#D29922',
      phase: 1,
      phaseLabel: 'REVIEW',
      currentQuestion: this._formatQuestion(firstQ, locale),
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

    if (result.correct) {
      wx.vibrateShort({ type: 'light' });
      sound.play('correct');
    } else {
      wx.vibrateShort({ type: 'heavy' });
      sound.play('wrong');
    }
  },

  nextQuestion: function() {
    var session = this._session;
    var locale = this.data.locale;

    if (this.data.reviewMode && session.phase === 2) {
      session.finished = true;
      this._showSettlement();
      return;
    }

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

    if (this.data.mode === 'review') {
      var session = this._session;
      var mastered = 0;
      for (var i = 0; i < session.questions.length; i++) {
        var qId = session.questions[i].id;
        var ans = session.answers[qId];
        var correct = ans && ans.correct;
        gameReview.completeReview(qId, correct);
        if (correct) mastered++;
      }
      gameSave.addExp(result.correctCount * 10);
      var reviewStats = gameReview.getReviewStats();
      this.setData({
        reviewMastered: mastered,
        reviewRemaining: reviewStats.pending
      });
    } else if (this.data.mode === 'daily') {
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

    this._playSettlementAnimation();
  },

  _playSettlementAnimation: function() {
    var self = this;
    var stars = self.data.result ? self.data.result.stars : 0;

    setTimeout(function() { self.setData({ animStep: 1 }); }, 100);

    setTimeout(function() { self.setData({ animStep: 2 }); }, 400);

    var starDelay = 600;
    for (var i = 1; i <= 3; i++) {
      (function(idx) {
        setTimeout(function() {
          self.setData({ animStep: 2 + idx });
          if (idx <= stars) {
            wx.vibrateShort({ type: 'medium' });
            sound.play('star');
          }
        }, starDelay + idx * 200);
      })(i);
    }

    setTimeout(function() { self.setData({ animStep: 6 }); }, 1400);

    setTimeout(function() { self.setData({ animStep: 7 }); }, 1600);

    if (self.data.newLevel) {
      setTimeout(function() {
        self.setData({ animStep: 8 });
        wx.vibrateLong();
        sound.play('levelup');
      }, 1800);
    }

    var cardStartDelay = self.data.newLevel ? 2100 : 1800;
    var earnedCards = self.data.earnedCardDetails || [];
    for (var j = 0; j < earnedCards.length; j++) {
      (function(idx) {
        setTimeout(function() {
          self.setData({ animStep: 9 + idx });
          sound.play('card');
        }, cardStartDelay + idx * 150);
      })(j);
    }
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
        selectedOption: '',
        animStep: 0
      });
    }
  },

  goToMap: function() {
    wx.switchTab({ url: '/pages/timeline/timeline' });
  },

  shareResult: function() {
    if (!this.data.result) return;
    var self = this;
    var levelInfo = gameSave.getLevelInfo();
    var shareData = {
      title: self.data.stageTitle,
      stars: self.data.result.stars,
      score: self.data.result.correctCount,
      total: self.data.result.totalQuestions,
      ratio: self.data.result.ratio,
      exp: self.data.result.expReward,
      level: levelInfo.title + ' Lv.' + levelInfo.level,
      cards: self.data.earnedCardDetails.map(function(c) {
        return { name: c.name, rarity: c.rarity };
      })
    };

    wx.showLoading({ title: '生成中...' });
    shareCard.generateShareImage(shareData, function(tempFilePath) {
      wx.hideLoading();
      if (!tempFilePath) {
        wx.showToast({ title: '生成失败', icon: 'none' });
        return;
      }
      self._shareImagePath = tempFilePath;
      wx.showActionSheet({
        itemList: ['分享给好友', '保存到相册'],
        success: function(res) {
          if (res.tapIndex === 0) {
            wx.showToast({ title: '请点击右上角分享', icon: 'none' });
          } else if (res.tapIndex === 1) {
            self._saveToAlbum(tempFilePath);
          }
        }
      });
    });
  },

  _saveToAlbum: function(filePath) {
    wx.saveImageToPhotosAlbum({
      filePath: filePath,
      success: function() {
        wx.showToast({ title: '已保存到相册', icon: 'success' });
      },
      fail: function(err) {
        if (err.errMsg && err.errMsg.indexOf('auth deny') !== -1) {
          wx.showModal({
            title: '需要相册权限',
            content: '请在设置中开启相册访问权限',
            confirmText: '去设置',
            success: function(res) {
              if (res.confirm) {
                wx.openSetting();
              }
            }
          });
        } else {
          wx.showToast({ title: '保存失败', icon: 'none' });
        }
      }
    });
  },

  onShareAppMessage: function() {
    var shareObj = {
      title: 'Claude Code Terminal — 闯关',
      path: '/pages/home/home'
    };
    if (this._shareImagePath) {
      shareObj.imageUrl = this._shareImagePath;
    }
    return shareObj;
  },

  onShareTimeline: function() {
    return {
      title: 'Claude Code Terminal — 闯关'
    };
  }
});
