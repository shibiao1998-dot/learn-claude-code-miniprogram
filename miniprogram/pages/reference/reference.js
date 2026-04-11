// pages/reference/reference.js
const i18n = require('../../utils/i18n');
const eventBus = require('../../utils/event-bus');
const bridgeDocsMeta = require('../../data/bridge-docs-meta.json');

Page({
  data: {
    locale: 'zh',
    t: {},
    foundationDocs: [],   // kind=map
    mechanismDocs: [],    // kind=mechanism
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
      messages = require(`../../i18n/${locale}.json`);
    } catch (e) {
      try {
        messages = require('../../i18n/zh.json');
      } catch (e2) {
        console.warn('[reference] failed to load i18n messages');
      }
    }

    const foundationDocs = [];
    const mechanismDocs = [];

    Object.values(bridgeDocsMeta).forEach(doc => {
      const title = (doc.title && (doc.title[locale] || doc.title['en'])) || doc.slug;
      const summary = (doc.summary && (doc.summary[locale] || doc.summary['en'])) || '';

      const entry = { slug: doc.slug, title, summary };

      if (doc.kind === 'map') {
        foundationDocs.push(entry);
      } else if (doc.kind === 'mechanism') {
        mechanismDocs.push(entry);
      }
    });

    this.setData({
      locale,
      t: messages,
      foundationDocs,
      mechanismDocs,
    });
  },

  openDoc(e) {
    const slug = e.currentTarget.dataset.slug;
    wx.navigateTo({
      url: `/subpkg-chapters/pages/bridge-doc/bridge-doc?slug=${slug}`,
    });
  },

  switchLocale(e) {
    const locale = e.currentTarget.dataset.locale;
    getApp().setLocale(locale);
  },
});
