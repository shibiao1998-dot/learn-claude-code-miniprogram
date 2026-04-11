// pages/home/home.js
const i18n = require('../../utils/i18n');
const progress = require('../../utils/progress');
const eventBus = require('../../utils/event-bus');
const meta = require('../../data/meta.json');

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
      messages = require(`../../i18n/${locale}.json`);
    } catch (e) {
      try {
        messages = require('../../i18n/zh.json');
      } catch (e2) {
        console.warn('[home] failed to load i18n messages');
      }
    }

    // 构建带翻译内容的 layers 数据
    const layers = meta.layers.map(layer => {
      const versions = layer.versions.map(vid => {
        const v = meta.versions[vid];
        if (!v) return null;

        const contentLocale = (v.content && v.content[locale]) || (v.content && v.content['zh']) || {};
        const sessionLabel = (messages.sessions && messages.sessions[vid]) || vid;

        return {
          id: v.id,
          title: sessionLabel,
          subtitle: contentLocale.subtitle || '',
          keyInsight: contentLocale.keyInsight || '',
          loc: v.loc || 0,
          layer: v.layer,
          isRead: progress.isRead(v.id),
        };
      }).filter(Boolean);

      const layerLabel = (messages.layer_labels && messages.layer_labels[layer.id]) || layer.label;

      return {
        id: layer.id,
        label: layerLabel,
        color: layer.color,
        versions,
      };
    });

    // 统计总已读数
    const allIds = meta.versionOrder || [];
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
    const allIds = meta.versionOrder || [];
    const readCount = progress.getReadCount(allIds);

    // 更新每章 isRead 状态
    const layers = this.data.layers.map(layer => ({
      ...layer,
      versions: layer.versions.map(chapter => ({
        ...chapter,
        isRead: progress.isRead(chapter.id),
      })),
    }));

    this.setData({ readCount, layers });
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
