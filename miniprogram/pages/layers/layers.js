// pages/layers/layers.js
var i18n = require('../../utils/i18n');
var eventBus = require('../../utils/event-bus');
var gameCards = require('../../utils/game-cards');

var REGIONS = [
  { id: 'core', symbol: '>', label: 'CORE/', colorHex: '#3FB950' },
  { id: 'tools', symbol: '$', label: 'TOOLS/', colorHex: '#58A6FF' },
  { id: 'runtime', symbol: '#', label: 'RUNTIME/', colorHex: '#BC8CFF' },
  { id: 'network', symbol: '@', label: 'NETWORK/', colorHex: '#F85149' },
  { id: 'practice', symbol: '!', label: 'PRACTICE/', colorHex: '#D29922' }
];

Page({
  data: {
    locale: 'zh',
    stats: {},
    regions: [],
    activeFilter: 'all'
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
    var stats = gameCards.getCollectionStats();
    var filter = this.data.activeFilter;

    var regions = REGIONS.map(function(r) {
      var cards = gameCards.getCardsByRegion(r.id);

      if (filter === 'obtained') {
        cards = cards.filter(function(c) { return c.obtained; });
      } else if (filter === 'missing') {
        cards = cards.filter(function(c) { return !c.obtained; });
      }

      var displayCards = cards.map(function(c) {
        var name = c.name;
        return {
          id: c.id,
          name: name[locale] || name.zh || name.en || c.id,
          rarity: c.rarity,
          obtained: c.obtained
        };
      });

      var regionStats = stats.byRegion[r.id] || { total: 0, obtained: 0 };

      return {
        id: r.id,
        symbol: r.symbol,
        label: r.label,
        colorHex: r.colorHex,
        cards: displayCards,
        obtained: regionStats.obtained,
        total: regionStats.total,
        visible: displayCards.length > 0
      };
    });

    this.setData({
      locale: locale,
      stats: {
        total: stats.total,
        obtained: stats.obtained,
        percent: Math.round(stats.ratio * 100),
        byRarity: stats.byRarity
      },
      regions: regions
    });
  },

  setFilter: function(e) {
    var filter = e.currentTarget.dataset.filter;
    this.setData({ activeFilter: filter });
    this._buildPageData();
  },

  goToCard: function(e) {
    var cardId = e.currentTarget.dataset.cardid;
    var obtained = e.currentTarget.dataset.obtained;
    if (!obtained || obtained === 'false') {
      wx.showToast({ title: '未解锁', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: '/subpkg-bridge/pages/bridge-doc/bridge-doc?cardId=' + cardId
    });
  },

  onShareAppMessage: function() {
    return {
      title: 'Claude Code Terminal — 图鉴',
      path: '/pages/home/home'
    };
  },

  onShareTimeline: function() {
    return {
      title: 'Claude Code Terminal — 图鉴'
    };
  }
});
