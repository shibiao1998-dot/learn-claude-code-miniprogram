// subpkg-compare/pages/compare/compare.js
const i18n = require('../../../utils/i18n');
const eventBus = require('../../../utils/event-bus');
const meta = require('../../../data/meta.js');

// 根据阶段(layer)给出对应颜色
const LAYER_COLORS = {
  core: '#059669',
  hardening: '#2563EB',
  runtime: '#7C3AED',
  platform: '#DB2777',
};

Page({
  data: {
    locale: 'zh',
    t: {},
    versionOptions: [], // [{label:'s01 - Agent 循环', value:'s01'}]
    selectedAIndex: -1,
    selectedBIndex: -1,
    selectedA: '',      // picker 上显示的文字
    selectedB: '',
    aId: '',
    bId: '',
    compareResult: null,
  },

  onLoad(options) {
    this._buildPageData();

    // 支持 URL 参数 ?a=s01&b=s02
    if (options.a) this._setVersion('A', options.a);
    if (options.b) this._setVersion('B', options.b);
    if (options.a && options.b) {
      const locale = i18n.getLocale();
      const messages = this.data.t;
      this._calcCompare(options.a, options.b, locale, messages);
    }

    this._localeListener = () => this._buildPageData();
    eventBus.on('locale:change', this._localeListener);
  },

  onUnload() {
    if (this._localeListener) {
      eventBus.off('locale:change', this._localeListener);
    }
  },

  _buildPageData() {
    const locale = i18n.getLocale();
    let messages = {};
    try {
      switch (locale) {
        case 'en': messages = require('../../../i18n/en.js'); break;
        case 'ja': messages = require('../../../i18n/ja.js'); break;
        default:   messages = require('../../../i18n/zh.js'); break;
      }
    } catch (e) {
      messages = require('../../../i18n/zh.js');
    }

    const versionOptions = meta.versionOrder.map(id => ({
      label: `${id} - ${messages.sessions?.[id] || meta.versions[id].title}`,
      value: id,
    }));

    this.setData({ locale, t: messages, versionOptions });

    // 如果已经选了 A/B，切换语言时重新计算（刷新文案）
    const { aId, bId } = this.data;
    if (aId && bId) {
      // 更新 picker 显示文字
      const aIdx = meta.versionOrder.indexOf(aId);
      const bIdx = meta.versionOrder.indexOf(bId);
      this.setData({
        selectedA: versionOptions[aIdx]?.label || aId,
        selectedB: versionOptions[bIdx]?.label || bId,
      });
      this._calcCompare(aId, bId, locale, messages);
    }
  },

  onSelectA(e) {
    const idx = parseInt(e.detail.value);
    const id = meta.versionOrder[idx];
    const label = this.data.versionOptions[idx].label;
    this.setData({ selectedAIndex: idx, aId: id, selectedA: label });
    if (this.data.bId) {
      this._calcCompare(id, this.data.bId, this.data.locale, this.data.t);
    }
  },

  onSelectB(e) {
    const idx = parseInt(e.detail.value);
    const id = meta.versionOrder[idx];
    const label = this.data.versionOptions[idx].label;
    this.setData({ selectedBIndex: idx, bId: id, selectedB: label });
    if (this.data.aId) {
      this._calcCompare(this.data.aId, id, this.data.locale, this.data.t);
    }
  },

  _setVersion(which, id) {
    const idx = meta.versionOrder.indexOf(id);
    if (idx < 0) return;
    const label = this.data.versionOptions[idx]?.label || id;
    if (which === 'A') {
      this.setData({ selectedAIndex: idx, aId: id, selectedA: label });
    } else {
      this.setData({ selectedBIndex: idx, bId: id, selectedB: label });
    }
  },

  _calcCompare(aId, bId, locale, messages) {
    const vA = meta.versions[aId];
    const vB = meta.versions[bId];
    if (!vA || !vB) return;

    const aIdx = meta.versionOrder.indexOf(aId);
    const bIdx = meta.versionOrder.indexOf(bId);
    const distance = bIdx - aIdx;

    // ── 跃迁类型 ──────────────────────────────
    let progressionKey;
    if (aId === bId) {
      progressionKey = 'progression_same_chapter';
    } else if (distance < 0) {
      progressionKey = 'progression_reverse';
    } else if (Math.abs(distance) === 1) {
      progressionKey = 'progression_direct';
    } else if (vA.layer === vB.layer) {
      progressionKey = 'progression_same_layer';
    } else {
      progressionKey = 'progression_cross_layer';
    }

    const progressionLabel = messages.compare?.[progressionKey] || progressionKey;

    // ── 工具集合对比 ──────────────────────────
    const aTools = new Set(vA.tools || []);
    const bTools = new Set(vB.tools || []);
    const onlyInA = (vA.tools || []).filter(function(t) { return !bTools.has(t); });
    const onlyInB = (vB.tools || []).filter(function(t) { return !aTools.has(t); });
    const shared = (vA.tools || []).filter(function(t) { return bTools.has(t); });

    // ── 累积 diff（从 A 到 B 之间所有章节的增量）──
    let newClasses = [], newFunctions = [], newTools = [];
    if (distance > 0) {
      const startIdx = aIdx + 1;
      const endIdx = bIdx;
      for (let i = startIdx; i <= endIdx; i++) {
        const vid = meta.versionOrder[i];
        const diff = meta.diffs.find(d => d.to === vid);
        if (diff) {
          newClasses = newClasses.concat(diff.newClasses || []);
          newFunctions = newFunctions.concat(diff.newFunctions || []);
          newTools = newTools.concat(diff.newTools || []);
        }
      }
    }

    // ── LOC 变化 ──────────────────────────────
    const locDelta = vB.loc - vA.loc;

    // ── 内容文案 ──────────────────────────────
    const contentA = vA.content?.[locale] || vA.content?.en || {};
    const contentB = vB.content?.[locale] || vB.content?.en || {};

    // ── 阶段标签 ──────────────────────────────
    const aLayerLabel = messages.layer_labels?.[vA.layer] || vA.layer;
    const bLayerLabel = messages.layer_labels?.[vB.layer] || vB.layer;

    this.setData({
      compareResult: {
        aId, bId,
        aTitle: messages.sessions?.[aId] || vA.title,
        bTitle: messages.sessions?.[bId] || vB.title,
        aLayer: vA.layer,
        bLayer: vB.layer,
        aLayerLabel,
        bLayerLabel,
        aLayerColor: LAYER_COLORS[vA.layer] || '#94A3B8',
        bLayerColor: LAYER_COLORS[vB.layer] || '#94A3B8',
        distance: Math.abs(distance),
        progressionKey,
        progressionLabel,
        sharedToolsCount: shared.length,
        locDelta,
        locDeltaSign: locDelta >= 0 ? '+' : '',
        aLoc: vA.loc,
        bLoc: vB.loc,
        onlyInA,
        onlyInB,
        shared,
        newClasses: Array.from(new Set(newClasses)),
        newFunctions: Array.from(new Set(newFunctions)),
        newTools: Array.from(new Set(newTools)),
        hasNewContent: newClasses.length > 0 || newFunctions.length > 0 || newTools.length > 0,
        aKeyInsight: contentA.keyInsight || '',
        bKeyInsight: contentB.keyInsight || '',
        aCoreAddition: contentA.coreAddition || '',
        bCoreAddition: contentB.coreAddition || '',
        aSubtitle: contentA.subtitle || '',
        bSubtitle: contentB.subtitle || '',
        isReverse: distance < 0,
        isSameChapter: aId === bId,
      },
    });
  },

  goToChapter(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/subpkg-chapters/pages/chapter/chapter?id=${id}`,
    });
  },

  switchLocale(e) {
    const locale = e.currentTarget.dataset.locale;
    getApp().setLocale(locale);
  },

  swapAB() {
    const { aId, bId, selectedAIndex, selectedBIndex, selectedA, selectedB } = this.data;
    if (!aId || !bId) return;
    this.setData({
      aId: bId,
      bId: aId,
      selectedAIndex: selectedBIndex,
      selectedBIndex: selectedAIndex,
      selectedA: selectedB,
      selectedB: selectedA,
    });
    this._calcCompare(bId, aId, this.data.locale, this.data.t);
  },
});
