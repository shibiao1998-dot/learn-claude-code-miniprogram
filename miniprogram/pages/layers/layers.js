// pages/layers/layers.js
const i18n = require('../../utils/i18n');
const eventBus = require('../../utils/event-bus');
const progress = require('../../utils/progress');
const meta = require('../../data/meta.json');
const bridgeDocsMeta = require('../../data/bridge-docs-meta.json');

const LAYER_SUPPORT_DOCS = {
  core: ['s00-architecture-overview', 's00b-one-request-lifecycle', 's02a-tool-control-plane', 'data-structures'],
  hardening: ['s00a-query-control-plane', 's02b-tool-execution-runtime', 's10a-message-prompt-pipeline', 's00c-query-transition-model', 'data-structures'],
  runtime: ['s13a-runtime-task-model', 'data-structures', 'entity-map'],
  platform: ['team-task-lane-model', 's13a-runtime-task-model', 's19a-mcp-capability-layers', 'entity-map', 'data-structures'],
};

const LAYER_CSS_COLORS = {
  core: '#34D399',
  hardening: '#60A5FA',
  runtime: '#A78BFA',
  platform: '#F472B6',
};

Page({
  data: {
    locale: 'zh',
    t: {},
    layerSections: [],
    expandedCheckpoints: {},
  },

  onLoad() {
    this._buildPageData();
    this._localeListener = (locale) => {
      this.setData({ locale, expandedCheckpoints: {} });
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

    let messages = {};
    try {
      messages = require(`../../i18n/${locale}.json`);
    } catch (e) {
      try {
        messages = require('../../i18n/zh.json');
      } catch (e2) {
        console.warn('[layers] failed to load i18n messages');
      }
    }

    const layerSections = meta.layers.map((layer, index) => {
      // 章节列表
      const versions = layer.versions.map(id => {
        const v = meta.versions[id];
        if (!v) return null;
        const contentLocale = (v.content && v.content[locale]) || (v.content && v.content['zh']) || {};
        return {
          id,
          layer: v.layer,
          title: (messages.sessions && messages.sessions[id]) || v.title,
          subtitle: contentLocale.subtitle || '',
          keyInsight: contentLocale.keyInsight || '',
          loc: v.loc || 0,
          isRead: progress.isRead(id),
        };
      }).filter(Boolean);

      // stageCheckpoint
      const cp = (meta.stageCheckpoints || []).find(c => c.layer === layer.id);
      const checkpoint = cp ? {
        entryVersion: cp.entryVersion,
        endVersion: cp.endVersion,
        title: (cp.title && (cp.title[locale] || cp.title['en'])) || '',
        body: (cp.body && (cp.body[locale] || cp.body['en'])) || '',
        rebuild: (cp.rebuild && (cp.rebuild[locale] || cp.rebuild['en'])) || '',
      } : null;

      // 辅助文档
      const supportSlugs = LAYER_SUPPORT_DOCS[layer.id] || [];
      const supportDocs = supportSlugs
        .map(slug => {
          const doc = bridgeDocsMeta[slug];
          if (!doc) return null;
          return {
            slug,
            title: (doc.title && (doc.title[locale] || doc.title['en'])) || slug,
            summary: (doc.summary && (doc.summary[locale] || doc.summary['en'])) || '',
          };
        })
        .filter(Boolean);

      const readCount = progress.getReadCount(layer.versions);

      return {
        id: layer.id,
        index: index + 1,
        label: (messages.layer_labels && messages.layer_labels[layer.id]) || layer.label,
        color: LAYER_CSS_COLORS[layer.id] || layer.color,
        desc: (messages.layers && messages.layers[layer.id]) || '',
        outcome: (messages.layers && messages.layers[`${layer.id}_outcome`]) || '',
        versions,
        checkpoint,
        supportDocs,
        readCount,
        totalCount: layer.versions.length,
      };
    });

    this.setData({ locale, t: messages, layerSections });
  },

  _refreshProgress() {
    if (!this.data.layerSections || !this.data.layerSections.length) return;
    const layerSections = this.data.layerSections.map(section => ({
      ...section,
      readCount: progress.getReadCount(section.versions.map(v => v.id)),
      versions: section.versions.map(v => ({
        ...v,
        isRead: progress.isRead(v.id),
      })),
    }));
    this.setData({ layerSections });
  },

  toggleCheckpoint(e) {
    const { id } = e.currentTarget.dataset;
    const key = `expandedCheckpoints.${id}`;
    this.setData({ [key]: !this.data.expandedCheckpoints[id] });
  },

  goToChapter(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/subpkg-chapters/pages/chapter/chapter?id=${id}` });
  },

  goToChapterEntry(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/subpkg-chapters/pages/chapter/chapter?id=${id}` });
  },

  openBridgeDoc(e) {
    const { slug } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/subpkg-chapters/pages/bridge-doc/bridge-doc?slug=${slug}` });
  },

  switchLocale(e) {
    const locale = e.currentTarget.dataset.locale;
    const app = getApp();
    if (app && app.setLocale) app.setLocale(locale);
  },
});
