// pages/timeline/timeline.js
var i18n = require('../../utils/i18n');
var eventBus = require('../../utils/event-bus');
var gameEngine = require('../../utils/game-engine');
var gameSave = require('../../utils/game-save');
var stageData = require('../../subpkg-chapters/data/game-stages');

var REGIONS = [
  { id: 'core', symbol: '>', label: 'CORE/', color: 'var(--color-region-core)', colorHex: '#3FB950' },
  { id: 'tools', symbol: '$', label: 'TOOLS/', color: 'var(--color-region-tools)', colorHex: '#58A6FF' },
  { id: 'runtime', symbol: '#', label: 'RUNTIME/', color: 'var(--color-region-runtime)', colorHex: '#BC8CFF' },
  { id: 'network', symbol: '@', label: 'NETWORK/', color: 'var(--color-region-network)', colorHex: '#F85149' },
  { id: 'practice', symbol: '!', label: 'PRACTICE/', color: 'var(--color-region-practice)', colorHex: '#D29922' }
];

var REGION_STAGES = {
  core: ['stage_s01','stage_s02','stage_s03','stage_s04','stage_s05','stage_s06'],
  tools: ['stage_s07','stage_s08','stage_s09','stage_s10','stage_s11'],
  runtime: ['stage_s12','stage_s13','stage_s14'],
  network: ['stage_s15','stage_s16','stage_s17','stage_s18','stage_s19'],
  practice: ['stage_bp01','stage_bp02','stage_bp03','stage_bp04','stage_bp05','stage_bp06','stage_bp07']
};

function _getStageTitle(stageId, locale) {
  var stages = stageData.stages;
  for (var i = 0; i < stages.length; i++) {
    if (stages[i].id === stageId) {
      var t = stages[i].title;
      return t[locale] || t.zh || t.en || stageId;
    }
  }
  return stageId;
}

Page({
  data: {
    locale: 'zh',
    regions: [],
    totalProgress: 0,
    levelInfo: {}
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
    var totalCleared = 0;
    var totalStages = 0;

    var regions = REGIONS.map(function(r) {
      var stageIds = REGION_STAGES[r.id];
      var unlocked = gameEngine.isRegionUnlocked(r.id, stageData.stages);
      var progress = gameEngine.getRegionProgress(stageIds);
      totalCleared += progress.cleared;
      totalStages += progress.total;

      var stages = stageIds.map(function(sId) {
        var sp = gameEngine.getStageProgress(sId);
        return {
          id: sId,
          chapter: sId.replace('stage_', ''),
          title: _getStageTitle(sId, locale),
          stars: sp ? sp.stars : 0,
          attempts: sp ? sp.attempts : 0,
          cleared: sp ? sp.stars > 0 : false
        };
      });

      return {
        id: r.id,
        symbol: r.symbol,
        label: r.label,
        colorHex: r.colorHex,
        unlocked: unlocked,
        cleared: progress.cleared,
        total: progress.total,
        totalStars: progress.totalStars,
        maxStars: progress.total * 3,
        barWidth: Math.round(progress.ratio * 100),
        stages: stages
      };
    });

    var totalProgress = totalStages > 0 ? Math.round(totalCleared / totalStages * 100) : 0;

    this.setData({
      locale: locale,
      regions: regions,
      totalProgress: totalProgress,
      levelInfo: levelInfo
    });
  },

  goToStage: function(e) {
    var stageId = e.currentTarget.dataset.stageid;
    var regionId = e.currentTarget.dataset.regionid;
    var region = null;
    for (var i = 0; i < this.data.regions.length; i++) {
      if (this.data.regions[i].id === regionId) {
        region = this.data.regions[i];
        break;
      }
    }
    if (!region || !region.unlocked) {
      wx.showToast({ title: '区域未解锁', icon: 'none' });
      return;
    }
    var chapter = stageId.replace('stage_', '');
    wx.navigateTo({
      url: '/subpkg-chapters/pages/chapter/chapter?id=' + chapter
    });
  },

  toggleRegion: function(e) {
    var regionId = e.currentTarget.dataset.regionid;
    var regions = this.data.regions.map(function(r) {
      if (r.id === regionId) {
        return Object.assign({}, r, { expanded: !r.expanded });
      }
      return r;
    });
    this.setData({ regions: regions });
  },

  onShareAppMessage: function() {
    return {
      title: 'Claude Code Terminal — 区域地图',
      path: '/pages/home/home'
    };
  },

  onShareTimeline: function() {
    return {
      title: 'Claude Code Terminal — 区域地图'
    };
  }
});
