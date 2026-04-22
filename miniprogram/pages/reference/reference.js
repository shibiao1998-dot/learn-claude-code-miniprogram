// pages/reference/reference.js
var i18n = require('../../utils/i18n');
var eventBus = require('../../utils/event-bus');
var gameSave = require('../../utils/game-save');
var gameCards = require('../../utils/game-cards');
var gameDaily = require('../../utils/game-daily');
var gameAchievement = require('../../utils/game-achievement');
var gameEngine = require('../../utils/game-engine');

var REGIONS = [
  { id: 'core', label: 'CORE', color: 'var(--color-region-core)', stages: ['stage_s01','stage_s02','stage_s03','stage_s04','stage_s05','stage_s06'] },
  { id: 'tools', label: 'TOOLS', color: 'var(--color-region-tools)', stages: ['stage_s07','stage_s08','stage_s09','stage_s10','stage_s11'] },
  { id: 'runtime', label: 'RUNTIME', color: 'var(--color-region-runtime)', stages: ['stage_s12','stage_s13','stage_s14'] },
  { id: 'network', label: 'NETWORK', color: 'var(--color-region-network)', stages: ['stage_s15','stage_s16','stage_s17','stage_s18','stage_s19'] },
  { id: 'practice', label: 'PRACTICE', color: 'var(--color-region-practice)', stages: ['stage_bp01','stage_bp02','stage_bp03','stage_bp04','stage_bp05','stage_bp06','stage_bp07'] }
];

var CATEGORIES = [
  { id: 'explore', icon: '>', label: 'EXPLORE', color: 'var(--color-region-core)' },
  { id: 'collect', icon: '$', label: 'COLLECT', color: 'var(--color-region-tools)' },
  { id: 'mastery', icon: '#', label: 'MASTERY', color: 'var(--color-region-runtime)' },
  { id: 'persist', icon: '!', label: 'PERSIST', color: 'var(--color-region-practice)' }
];

Page({
  data: {
    locale: 'zh',
    levelInfo: {},
    streakInfo: {},
    collectionStats: {},
    achievementStats: {},
    categories: [],
    showResetConfirm: false,
    stats: null
  },

  onLoad: function() {
    this._buildPageData();
    this._localeListener = function() {
      this._buildPageData();
    }.bind(this);
    eventBus.on('locale:change', this._localeListener);
  },

  onShow: function() {
    this._buildPageData();
  },

  onUnload: function() {
    eventBus.off('locale:change', this._localeListener);
  },

  _buildPageData: function() {
    var locale = i18n.getLocale();
    var levelInfo = gameSave.getLevelInfo();
    var streakInfo = gameDaily.getStreakInfo();
    var collectionStats = gameCards.getCollectionStats();
    var achievementStats = gameAchievement.getAchievementStats();

    var saveData = gameSave.load();
    var stageKeys = Object.keys(saveData.stages);
    var totalAnswered = 0;
    var totalCorrect = 0;
    var clearedStages = 0;
    for (var si = 0; si < stageKeys.length; si++) {
      var stageRec = saveData.stages[stageKeys[si]];
      if (stageRec && stageRec.stars > 0) clearedStages++;
      if (stageRec && stageRec.bestScore) totalCorrect += stageRec.bestScore;
      if (stageRec && stageRec.attempts) totalAnswered += stageRec.attempts;
    }

    var regionStats = REGIONS.map(function(r) {
      var progress = gameEngine.getRegionProgress(r.stages);
      var maxStars = r.stages.length * 3;
      var pct = Math.round(progress.ratio * 100);
      var barFilled = Math.round(pct / 10);
      var bar = '';
      for (var b = 0; b < 10; b++) {
        bar += b < barFilled ? '█' : '░';
      }
      return {
        id: r.id,
        label: r.label,
        color: r.color,
        bar: bar,
        pct: pct,
        stars: progress.totalStars,
        maxStars: maxStars,
        cleared: progress.cleared,
        total: progress.total
      };
    });

    var stats = {
      totalAnswered: totalAnswered,
      clearedStages: clearedStages,
      totalExp: levelInfo.exp,
      regionStats: regionStats,
      streak: streakInfo,
      cards: collectionStats
    };

    var allAchievements = gameAchievement.getAllAchievements();

    var categories = CATEGORIES.map(function(cat) {
      var items = [];
      for (var i = 0; i < allAchievements.length; i++) {
        var ach = allAchievements[i];
        if (ach.category === cat.id) {
          items.push({
            id: ach.id,
            icon: ach.icon,
            name: ach.name[locale] || ach.name.zh || ach.name.en || ach.id,
            desc: ach.desc[locale] || ach.desc.zh || ach.desc.en || '',
            unlocked: ach.unlocked
          });
        }
      }
      var unlockedCount = 0;
      for (var j = 0; j < items.length; j++) {
        if (items[j].unlocked) unlockedCount++;
      }
      return {
        id: cat.id,
        icon: cat.icon,
        label: cat.label,
        color: cat.color,
        items: items,
        unlocked: unlockedCount,
        total: items.length
      };
    });

    this.setData({
      locale: locale,
      levelInfo: levelInfo,
      streakInfo: streakInfo,
      collectionStats: collectionStats,
      achievementStats: achievementStats,
      stats: stats,
      categories: categories,
      showResetConfirm: false
    });
  },

  switchLocale: function(e) {
    var locale = e.currentTarget.dataset.locale;
    getApp().setLocale(locale);
  },

  showReset: function() {
    this.setData({ showResetConfirm: true });
  },

  cancelReset: function() {
    this.setData({ showResetConfirm: false });
  },

  confirmReset: function() {
    gameSave.reset();
    this.setData({ showResetConfirm: false });
    this._buildPageData();
    wx.showToast({ title: '存档已重置', icon: 'none' });
  },

  onShareAppMessage: function() {
    return {
      title: 'Claude Code Terminal — 档案',
      path: '/pages/home/home'
    };
  },

  onShareTimeline: function() {
    return {
      title: 'Claude Code Terminal — 档案'
    };
  }
});
