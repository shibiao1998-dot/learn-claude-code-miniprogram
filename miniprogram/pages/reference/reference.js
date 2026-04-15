// pages/reference/reference.js
const i18n = require('../../utils/i18n');
const eventBus = require('../../utils/event-bus');
const bridgeDocsMeta = require('../../data/bridge-docs-meta.js');
const tipsIndex = require('../../data/tips-index.js');

Page({
  data: {
    locale: 'zh',
    t: {},
    foundationDocs: [],   // kind=map
    mechanismDocs: [],    // kind=mechanism
    tipCategories: [],    // Tips 分类列表
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

  _buildPageData() {
    const locale = i18n.getLocale();

    let messages = {};
    try {
      switch (locale) {
        case 'en': messages = require('../../i18n/en.js'); break;
        case 'ja': messages = require('../../i18n/ja.js'); break;
        default:   messages = require('../../i18n/zh.js'); break;
      }
    } catch (e) {
      console.warn('[reference] failed to load i18n messages');
    }

    const foundationDocs = [];
    const mechanismDocs = [];

    Object.values(bridgeDocsMeta).forEach(function(doc) {
      const title = (doc.title && (doc.title[locale] || doc.title['en'])) || doc.slug;
      const summary = (doc.summary && (doc.summary[locale] || doc.summary['en'])) || '';

      const entry = { slug: doc.slug, title: title, summary: summary };

      if (doc.kind === 'map') {
        foundationDocs.push(entry);
      } else if (doc.kind === 'mechanism') {
        mechanismDocs.push(entry);
      }
    });

    // 构建 Tips 分类数据
    var tipCategories = [];
    for (var i = 0; i < tipsIndex.length; i++) {
      var cat = tipsIndex[i];
      var label = (cat.label && (cat.label[locale] || cat.label['en'])) || cat.id;
      tipCategories.push({
        id: cat.id,
        slug: cat.slug,
        label: label,
        count: cat.count,
      });
    }

    this.setData({
      locale: locale,
      t: messages,
      foundationDocs: foundationDocs,
      mechanismDocs: mechanismDocs,
      tipCategories: tipCategories,
    });
  },

  openDoc(e) {
    const slug = e.currentTarget.dataset.slug;
    wx.navigateTo({
      url: '/subpkg-bridge/pages/bridge-doc/bridge-doc?slug=' + slug,
    });
  },

  openTipsCategory: function(e) {
    var slug = e.currentTarget.dataset.slug;
    if (slug) {
      wx.navigateTo({
        url: '/subpkg-bridge/pages/bridge-doc/bridge-doc?slug=' + slug,
      });
    }
  },

  switchLocale(e) {
    const locale = e.currentTarget.dataset.locale;
    getApp().setLocale(locale);
  },
});
