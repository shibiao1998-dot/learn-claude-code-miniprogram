// pages/home/home.js
const i18n = require('../../utils/i18n');
const progress = require('../../utils/progress');
const eventBus = require('../../utils/event-bus');
const meta = require('../../data/meta.js');

Page({
  data: {
    locale: 'zh',
    t: {},
    layers: [],
    readCount: 0,
    totalCount: 19,
  },

  onLoad() {
    this._buildPageData();
    this._localeListener = (locale) => {
      this.setData({ locale });
      this._buildPageData();
    };
    eventBus.on('locale:change', this._localeListener);
  },

  onUnload() {
    eventBus.off('locale:change', this._localeListener);
  },

  onShow() {
    this._refreshProgress();
  },

  _buildPageData() {
    const locale = i18n.getLocale();

    // 加载当前语言的全部文案
    let messages = {};
    try {
      switch (locale) {
        case 'en': messages = require('../../i18n/en.js'); break;
        case 'ja': messages = require('../../i18n/ja.js'); break;
        default:   messages = require('../../i18n/zh.js'); break;
      }
    } catch (e) {
      console.warn('[home] failed to load i18n messages');
    }

    // 构建带翻译内容的 layers 数据
    var foundNext = false;
    const layers = meta.layers.map(layer => {
      const versions = layer.versions.map(vid => {
        const v = meta.versions[vid];
        if (!v) return null;

        const contentLocale = (v.content && v.content[locale]) || (v.content && v.content['zh']) || {};
        const sessionLabel = (messages.sessions && messages.sessions[vid]) || vid;
        const isRead = progress.isRead(v.id);
        var isNext = false;
        if (!isRead && !foundNext) {
          isNext = true;
          foundNext = true;
        }

        return {
          id: v.id,
          title: sessionLabel,
          subtitle: contentLocale.subtitle || '',
          keyInsight: contentLocale.keyInsight || '',
          loc: v.loc || 0,
          layer: v.layer,
          isRead: isRead,
          isNext: isNext,
        };
      }).filter(Boolean);

      const layerLabel = (messages.layer_labels && messages.layer_labels[layer.id]) || layer.label;
      const layerReadCount = versions.filter(function(v) { return v.isRead; }).length;

      return {
        id: layer.id,
        label: layerLabel,
        color: layer.color,
        versions: versions,
        readCount: layerReadCount,
      };
    });

    // 统计总已读数
    const allIds = (meta.versionOrder || []).concat(meta.bpOrder || []);
    const readCount = progress.getReadCount(allIds);

    this.setData({
      locale,
      t: messages,
      layers,
      readCount,
      totalCount: allIds.length,
    });
  },

  _refreshProgress() {
    const allIds = (meta.versionOrder || []).concat(meta.bpOrder || []);
    const readCount = progress.getReadCount(allIds);

    // 更新每章 isRead/isNext 状态（避免对象展开语法，兼容小程序编译）
    var foundNext = false;
    const layers = this.data.layers.map(function(layer) {
      var versions = layer.versions.map(function(chapter) {
        var isRead = progress.isRead(chapter.id);
        var isNext = false;
        if (!isRead && !foundNext) {
          isNext = true;
          foundNext = true;
        }
        return Object.assign({}, chapter, {
          isRead: isRead,
          isNext: isNext,
        });
      });
      var layerReadCount = versions.filter(function(v) { return v.isRead; }).length;
      return Object.assign({}, layer, {
        versions: versions,
        readCount: layerReadCount,
      });
    });

    this.setData({ readCount: readCount, layers: layers });
  },

  goToChapter(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/subpkg-chapters/pages/chapter/chapter?id=${id}` });
  },

  goToStart() {
    wx.navigateTo({ url: '/subpkg-chapters/pages/chapter/chapter?id=s01' });
  },

  goToTimeline() {
    wx.switchTab({ url: '/pages/timeline/timeline' });
  },

  goToLayers() {
    wx.switchTab({ url: '/pages/layers/layers' });
  },

  goToCompare() {
    wx.navigateTo({ url: '/subpkg-compare/pages/compare/compare' });
  },

  switchLocale(e) {
    const locale = e.currentTarget.dataset.locale;
    const app = getApp();
    app.setLocale(locale);
  },
});
