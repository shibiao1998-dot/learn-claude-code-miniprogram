// pages/layers/layers.js
var i18n = require('../../utils/i18n');
var eventBus = require('../../utils/event-bus');
var progress = require('../../utils/progress');
var meta = require('../../data/meta.js');

var LAYER_CSS_COLORS = {
  core: '#059669',
  hardening: '#2563EB',
  runtime: '#7C3AED',
  platform: '#DB2777',
  'best-practice': '#EA580C',
};

var I18N_PAGE_TITLE = {
  zh: '架构层总览',
  en: 'Architecture Layers',
  ja: 'アーキテクチャレイヤー',
};

var I18N_PAGE_SUBTITLE = {
  zh: 'Claude Code 的架构与最佳实践',
  en: 'Architecture & Best Practices of Claude Code',
  ja: 'Claude Code のアーキテクチャとベストプラクティス',
};

var I18N_CHECKPOINT_LABEL = {
  zh: '阶段收口',
  en: 'Stage Checkpoint',
  ja: 'ステージチェックポイント',
};

var I18N_REBUILD_LABEL = {
  zh: '重建目标：',
  en: 'Rebuild target: ',
  ja: '再構築目標：',
};

Page({
  data: {
    locale: 'zh',
    t_pageTitle: '',
    t_pageSubtitle: '',
    t_checkpointLabel: '',
    t_rebuildLabel: '',
    layerSections: [],
    expandedCheckpoints: {},
  },

  onLoad: function () {
    this._buildPageData();
    var self = this;
    this._localeListener = function (locale) {
      self.setData({ locale: locale, expandedCheckpoints: {} });
      self._buildPageData();
    };
    eventBus.on('locale:change', this._localeListener);
  },

  onUnload: function () {
    eventBus.off('locale:change', this._localeListener);
  },

  onShow: function () {
    this._refreshProgress();
  },

  _buildPageData: function () {
    var locale = i18n.getLocale();

    var messages = {};
    try {
      switch (locale) {
        case 'en': messages = require('../../i18n/en.js'); break;
        case 'ja': messages = require('../../i18n/ja.js'); break;
        default:   messages = require('../../i18n/zh.js'); break;
      }
    } catch (e) {
      console.warn('[layers] failed to load i18n messages');
    }

    var t_pageTitle = I18N_PAGE_TITLE[locale] || I18N_PAGE_TITLE['zh'];
    var t_pageSubtitle = I18N_PAGE_SUBTITLE[locale] || I18N_PAGE_SUBTITLE['zh'];
    var t_checkpointLabel = I18N_CHECKPOINT_LABEL[locale] || I18N_CHECKPOINT_LABEL['zh'];
    var t_rebuildLabel = I18N_REBUILD_LABEL[locale] || I18N_REBUILD_LABEL['zh'];

    var layerSections = meta.layers.map(function (layer, index) {
      // 章节列表
      var versions = layer.versions.map(function (id) {
        var v = meta.versions[id];
        if (!v) return null;
        return {
          id: id,
          layer: v.layer,
          title: (messages.sessions && messages.sessions[id]) || v.title,
          loc: v.loc || 0,
          isRead: progress.isRead(id),
        };
      }).filter(Boolean);

      // stageCheckpoint
      var cp = (meta.stageCheckpoints || []).find(function (c) { return c.layer === layer.id; });
      var checkpoint = cp ? {
        titleText: (cp.title && (cp.title[locale] || cp.title['en'])) || '',
        bodyText: (cp.body && (cp.body[locale] || cp.body['en'])) || '',
        rebuildText: (cp.rebuild && (cp.rebuild[locale] || cp.rebuild['en'])) || '',
      } : null;

      var readCount = progress.getReadCount(layer.versions);

      return {
        id: layer.id,
        index: index + 1,
        label: (messages.layer_labels && messages.layer_labels[layer.id]) || layer.label,
        cssColor: LAYER_CSS_COLORS[layer.id] || '#94A3B8',
        desc: (messages.layers && messages.layers[layer.id]) || '',
        versions: versions,
        checkpoint: checkpoint,
        readCount: readCount,
        totalCount: layer.versions.length,
      };
    });

    this.setData({
      locale: locale,
      t_pageTitle: t_pageTitle,
      t_pageSubtitle: t_pageSubtitle,
      t_checkpointLabel: t_checkpointLabel,
      t_rebuildLabel: t_rebuildLabel,
      layerSections: layerSections,
    });
  },

  _refreshProgress: function () {
    if (!this.data.layerSections || !this.data.layerSections.length) return;
    var layerSections = this.data.layerSections.map(function (section) {
      return Object.assign({}, section, {
        readCount: progress.getReadCount(section.versions.map(function (v) { return v.id; })),
        versions: section.versions.map(function (v) {
          return Object.assign({}, v, { isRead: progress.isRead(v.id) });
        }),
      });
    });
    this.setData({ layerSections: layerSections });
  },

  toggleCheckpoint: function (e) {
    var layerId = e.currentTarget.dataset.layer;
    var key = 'expandedCheckpoints.' + layerId;
    var update = {};
    update[key] = !this.data.expandedCheckpoints[layerId];
    this.setData(update);
  },

  goToChapter: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/subpkg-chapters/pages/chapter/chapter?id=' + id });
  },

  goToChapterEntry: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/subpkg-chapters/pages/chapter/chapter?id=' + id });
  },

  openBridgeDoc: function (e) {
    var slug = e.currentTarget.dataset.slug;
    wx.navigateTo({ url: '/subpkg-chapters/pages/bridge-doc/bridge-doc?slug=' + slug });
  },

  switchLocale: function (e) {
    var locale = e.currentTarget.dataset.locale;
    var app = getApp();
    if (app && app.setLocale) app.setLocale(locale);
  },
});
