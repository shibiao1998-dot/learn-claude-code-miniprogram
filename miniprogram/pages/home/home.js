// pages/home/home.js
var i18n = require('../../utils/i18n');
var eventBus = require('../../utils/event-bus');
var gameSave = require('../../utils/game-save');
var gameEngine = require('../../utils/game-engine');
var gameCards = require('../../utils/game-cards');
var gameDaily = require('../../utils/game-daily');
var gameAchievement = require('../../utils/game-achievement');
var stageData = require('../../subpkg-chapters/data/game-stages');

var REGIONS = [
  { id: 'core', symbol: '>', label: 'CORE/', stages: ['stage_s01','stage_s02','stage_s03','stage_s04','stage_s05','stage_s06'] },
  { id: 'tools', symbol: '$', label: 'TOOLS/', stages: ['stage_s07','stage_s08','stage_s09','stage_s10','stage_s11'] },
  { id: 'runtime', symbol: '#', label: 'RUNTIME/', stages: ['stage_s12','stage_s13','stage_s14'] },
  { id: 'network', symbol: '@', label: 'NETWORK/', stages: ['stage_s15','stage_s16','stage_s17','stage_s18','stage_s19'] },
  { id: 'practice', symbol: '!', label: 'PRACTICE/', stages: ['stage_bp01','stage_bp02','stage_bp03','stage_bp04','stage_bp05','stage_bp06','stage_bp07'] }
];

Page({
  data: {
    locale: 'zh',
    t: {},
    levelInfo: {},
    streakInfo: {},
    collectionStats: {},
    regions: [],
    totalProgress: 0,
    dailyState: {},
    recentCards: [],
    nextStageId: null,
    nextRegionLabel: '',
  },

  onLoad: function() {
    this._buildPageData();
    this._localeListener = function(locale) {
      this.setData({ locale: locale });
      this._buildPageData();
    }.bind(this);
    eventBus.on('locale:change', this._localeListener);
  },

  onUnload: function() {
    eventBus.off('locale:change', this._localeListener);
  },

  onShow: function() {
    this._refreshGameState();
  },

  _buildPageData: function() {
    var locale = i18n.getLocale();
    var messages = {};
    try {
      switch (locale) {
        case 'en': messages = require('../../i18n/en.js'); break;
        case 'ja': messages = require('../../i18n/ja.js'); break;
        default:   messages = require('../../i18n/zh.js'); break;
      }
    } catch (e) {
      console.warn('[home] i18n load failed');
    }

    this.setData({ locale: locale, t: messages });
    this._refreshGameState();
  },

  _refreshGameState: function() {
    var levelInfo = gameSave.getLevelInfo();
    var streakInfo = gameDaily.getStreakInfo();
    var collectionStats = gameCards.getCollectionStats();
    var dailyState = gameDaily.getDailyState();

    var totalCleared = 0;
    var totalStages = 0;
    var nextStageId = null;
    var nextRegionLabel = '';

    var regions = REGIONS.map(function(r) {
      var progress = gameEngine.getRegionProgress(r.stages);
      var unlocked = gameEngine.isRegionUnlocked(r.id, stageData.stages);
      totalCleared += progress.cleared;
      totalStages += progress.total;

      if (!nextStageId && unlocked) {
        for (var i = 0; i < r.stages.length; i++) {
          var sp = gameEngine.getStageProgress(r.stages[i]);
          if (!sp || sp.stars === 0) {
            nextStageId = r.stages[i];
            nextRegionLabel = r.label;
            break;
          }
        }
      }

      return {
        id: r.id,
        symbol: r.symbol,
        label: r.label,
        cleared: progress.cleared,
        total: progress.total,
        totalStars: progress.totalStars,
        ratio: progress.ratio,
        unlocked: unlocked,
        barWidth: Math.round(progress.ratio * 100)
      };
    });

    var totalProgress = totalStages > 0 ? Math.round(totalCleared / totalStages * 100) : 0;

    var save = gameSave.load();
    var cardEntries = Object.keys(save.cards).map(function(id) {
      return { id: id, obtainedAt: save.cards[id].obtainedAt || 0 };
    });
    cardEntries.sort(function(a, b) { return b.obtainedAt - a.obtainedAt; });
    var recentCards = cardEntries.slice(0, 5).map(function(entry) {
      var card = gameCards.getCard(entry.id);
      if (!card) return null;
      return {
        id: card.id,
        name: card.name,
        rarity: card.rarity,
        region: card.region
      };
    }).filter(Boolean);

    gameAchievement.checkAndUnlock();

    this.setData({
      levelInfo: levelInfo,
      streakInfo: streakInfo,
      collectionStats: collectionStats,
      dailyState: dailyState,
      regions: regions,
      totalProgress: totalProgress,
      recentCards: recentCards,
      nextStageId: nextStageId,
      nextRegionLabel: nextRegionLabel
    });
  },

  goToDailyChallenge: function() {
    wx.navigateTo({
      url: '/subpkg-chapters/pages/chapter/chapter?mode=daily'
    });
  },

  goToContinue: function() {
    if (this.data.nextStageId) {
      var chapter = this.data.nextStageId.replace('stage_', '');
      wx.navigateTo({
        url: '/subpkg-chapters/pages/chapter/chapter?id=' + chapter
      });
    }
  },

  goToMap: function() {
    wx.switchTab({ url: '/pages/timeline/timeline' });
  },

  switchLocale: function(e) {
    var locale = e.currentTarget.dataset.locale;
    var app = getApp();
    app.setLocale(locale);
  },

  onShareAppMessage: function() {
    return {
      title: 'Claude Code Terminal — 游戏化学习',
      path: '/pages/home/home'
    };
  },

  onShareTimeline: function() {
    return {
      title: 'Claude Code Terminal — 游戏化学习'
    };
  },
});
