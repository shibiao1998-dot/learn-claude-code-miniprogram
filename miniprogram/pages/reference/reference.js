// pages/reference/reference.js
var i18n = require('../../utils/i18n');
var eventBus = require('../../utils/event-bus');
var gameSave = require('../../utils/game-save');
var gameCards = require('../../utils/game-cards');
var gameDaily = require('../../utils/game-daily');
var gameAchievement = require('../../utils/game-achievement');

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
    showResetConfirm: false
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
