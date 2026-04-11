// pages/timeline/timeline.js
const i18n = require('../../utils/i18n');
const eventBus = require('../../utils/event-bus');
const progress = require('../../utils/progress');
const meta = require('../../data/meta.json');

// 阶段颜色（对应 CSS 变量中的 layer 颜色）
const LAYER_COLORS = {
  core: '#34D399',
  hardening: '#60A5FA',
  runtime: '#A78BFA',
  platform: '#F472B6',
};

// 常用桥接文档快速入口
const BRIDGE_LINKS = [
  { slug: 's00a-query-control-plane', labelZh: '查询控制平面', labelEn: 'Query Control Plane', labelJa: 'クエリ制御プレーン' },
  { slug: 's02b-tool-execution-runtime', labelZh: '工具执行运行时', labelEn: 'Tool Execution Runtime', labelJa: 'ツール実行ランタイム' },
  { slug: 's13a-runtime-task-model', labelZh: '运行时任务模型', labelEn: 'Runtime Task Model', labelJa: 'ランタイムタスクモデル' },
  { slug: 'team-task-lane-model', labelZh: '队友-任务-车道模型', labelEn: 'Team-Task-Lane Model', labelJa: 'チーム-タスク-レーンモデル' },
  { slug: 's19a-mcp-capability-layers', labelZh: 'MCP 能力层地图', labelEn: 'MCP Capability Layers', labelJa: 'MCP 能力層マップ' },
];

// 使用指南内容（三语言硬编码）
const USAGE_GUIDES = {
  zh: [
    {
      icon: '📖',
      title: '第一次完整读',
      desc: '从上往下顺序读，不要急着横跳。前六章是主闭环，后面都建立在它上面。',
    },
    {
      icon: '🔀',
      title: '中途开始混',
      desc: '不要死盯源码。先看这章落在哪个阶段，再回桥接资料校正边界。',
    },
    {
      icon: '✍️',
      title: '准备自己实现',
      desc: '每走完一个阶段，就停下来自己手写一版最小实现。',
    },
  ],
  en: [
    {
      icon: '📖',
      title: 'First full read',
      desc: 'Read top to bottom in order. Don\'t skip ahead. The first six chapters form the core loop — everything else builds on it.',
    },
    {
      icon: '🔀',
      title: 'Getting lost midway',
      desc: 'Don\'t fixate on source code. First locate which stage this chapter belongs to, then use bridge docs to re-establish boundaries.',
    },
    {
      icon: '✍️',
      title: 'Ready to implement',
      desc: 'After completing each stage, stop and hand-write a minimal implementation of it.',
    },
  ],
  ja: [
    {
      icon: '📖',
      title: '初めて通して読む',
      desc: '上から順番に読む。飛ばし読みはしない。最初の 6 章が主閉ループで、後はすべてその上に積まれる。',
    },
    {
      icon: '🔀',
      title: '途中で混乱したとき',
      desc: 'ソースコードを凝視するのをやめる。まずこの章がどのステージに属するかを確認し、橋接資料で境界を修正する。',
    },
    {
      icon: '✍️',
      title: '自分で実装するとき',
      desc: '各ステージを終えたら立ち止まり、最小実装を自分の手で書く。',
    },
  ],
};

function _getLayerColor(layer) {
  return LAYER_COLORS[layer] || '#94A3B8';
}

// 构建 layerStart 映射：哪个 version 是 layer 的第一个
function _buildLayerStartMap() {
  const map = {};
  meta.layers.forEach(layer => {
    if (layer.versions && layer.versions.length > 0) {
      map[layer.versions[0]] = layer.id;
    }
  });
  return map;
}

// 构建 layerEnd 映射：哪个 version 是 layer 的最后一个
function _buildLayerEndMap() {
  const map = {};
  meta.layers.forEach(layer => {
    if (layer.versions && layer.versions.length > 0) {
      map[layer.versions[layer.versions.length - 1]] = layer.id;
    }
  });
  return map;
}

Page({
  data: {
    locale: 'zh',
    // 页头
    pageTitle: '',
    pageSubtitle: '',
    // 使用指南
    usageGuides: [],
    // 桥接文档链接（label 已按 locale 处理）
    bridgeLinks: [],
    // 阶段检查点
    checkpoints: [],
    expandedCheckpoints: {},
    // 主时间线
    timelineItems: [],
    // 阶段标签（用于检查点 section 标题翻译）
    t_checkpointSectionTitle: '',
    t_checkpointSectionDesc: '',
    t_bridgeSectionTitle: '',
    t_bridgeSectionDesc: '',
    t_guideSectionTitle: '',
    // 统计
    totalChapters: 0,
    readCount: 0,
  },

  _localeHandler: null,

  onLoad() {
    this._buildPageData();
    // 监听 locale 切换
    this._localeHandler = (locale) => {
      this._buildPageData();
    };
    eventBus.on('locale:change', this._localeHandler);
  },

  onShow() {
    // 每次进入页面刷新已读状态
    this._refreshReadState();
  },

  onUnload() {
    if (this._localeHandler) {
      eventBus.off('locale:change', this._localeHandler);
    }
  },

  _buildPageData() {
    const locale = i18n.getLocale();
    let messages;
    try {
      messages = require(`../../i18n/${locale}.json`);
    } catch (e) {
      messages = require('../../i18n/zh.json');
    }

    const layerStartMap = _buildLayerStartMap();
    const layerEndMap = _buildLayerEndMap();

    // 构建 timelineItems
    const timelineItems = meta.versionOrder.map((id) => {
      const v = meta.versions[id];
      if (!v) return null;

      const content = v.content[locale] || v.content.en || {};
      const isLayerStart = layerStartMap[id] !== undefined;
      const isLayerEnd = layerEndMap[id] !== undefined;

      // layer 标题
      let layerLabel = '';
      if (isLayerStart) {
        const lid = layerStartMap[id];
        layerLabel = (messages.layer_labels && messages.layer_labels[lid]) || lid;
      }

      // layer 对应的 stageCheckpoint
      let checkpointData = null;
      if (isLayerEnd) {
        const layerId = layerEndMap[id];
        const cp = meta.stageCheckpoints.find(c => c.layer === layerId);
        if (cp) {
          checkpointData = {
            layer: cp.layer,
            entryVersion: cp.entryVersion,
            endVersion: cp.endVersion,
            titleText: cp.title[locale] || cp.title.en,
            rebuildText: cp.rebuild[locale] || cp.rebuild.en,
            bodyText: cp.body[locale] || cp.body.en,
          };
        }
      }

      return {
        id,
        title: (messages.sessions && messages.sessions[id]) || v.title,
        subtitle: content.subtitle || '',
        keyInsight: content.keyInsight || '',
        layer: v.layer,
        loc: v.loc,
        isRead: progress.isRead(id),
        isLayerStart,
        isLayerEnd,
        layerLabel,
        layerColor: _getLayerColor(v.layer),
        checkpointData,
      };
    }).filter(Boolean);

    // 构建 checkpoints（用于阶段检查点卡片 section）
    const checkpoints = meta.stageCheckpoints.map(cp => ({
      layer: cp.layer,
      entryVersion: cp.entryVersion,
      endVersion: cp.endVersion,
      titleText: cp.title[locale] || cp.title.en,
      bodyText: cp.body[locale] || cp.body.en,
      rebuildText: cp.rebuild[locale] || cp.rebuild.en,
      layerLabel: (messages.layer_labels && messages.layer_labels[cp.layer]) || cp.layer,
      layerColor: _getLayerColor(cp.layer),
    }));

    // 桥接文档链接（按 locale 取 label）
    const bridgeLinks = BRIDGE_LINKS.map(b => ({
      slug: b.slug,
      label: locale === 'zh' ? b.labelZh : locale === 'ja' ? b.labelJa : b.labelEn,
    }));

    // 使用指南
    const usageGuides = USAGE_GUIDES[locale] || USAGE_GUIDES.zh;

    // 统计
    const readCount = progress.getReadCount(meta.versionOrder);

    // 页面文字
    const t = messages.timeline || {};
    const tLayers = messages.layers || {};

    this.setData({
      locale,
      pageTitle: t.title || '学习时间线',
      pageSubtitle: t.subtitle || '',
      usageGuides,
      bridgeLinks,
      checkpoints,
      expandedCheckpoints: this.data.expandedCheckpoints,
      timelineItems,
      totalChapters: meta.versionOrder.length,
      readCount,
      t_checkpointSectionTitle: locale === 'zh'
        ? '每走完一个阶段，先自己重建一版，再进入下一阶段'
        : locale === 'ja'
          ? '各ステージを終えたら、自分で再構築してから次へ進む'
          : 'Rebuild each stage before moving to the next',
      t_checkpointSectionDesc: locale === 'zh'
        ? '这是整套学习路径里最重要的一个习惯。'
        : locale === 'ja'
          ? 'これがこの学習パス全体で最も大切な習慣です。'
          : 'This is the single most important habit in the whole learning path.',
      t_bridgeSectionTitle: locale === 'zh'
        ? '常用桥接文档'
        : locale === 'ja'
          ? 'よく使う橋接ドキュメント'
          : 'Frequently Used Bridge Docs',
      t_bridgeSectionDesc: locale === 'zh'
        ? '卡住时最常跳回来看的五篇参考文档'
        : locale === 'ja'
          ? '詰まったときによく参照する 5 つのドキュメント'
          : 'The five reference docs you\'ll most often return to when stuck',
      t_guideSectionTitle: locale === 'zh'
        ? '使用指南'
        : locale === 'ja'
          ? '使い方ガイド'
          : 'How to Use This Page',
      t_timelineSectionTitle: locale === 'zh'
        ? '章节时间线'
        : locale === 'ja'
          ? '章節タイムライン'
          : 'Chapter Timeline',
      t_readLabel: locale === 'zh' ? '已读' : locale === 'ja' ? '読了' : 'Read',
      t_locUnit: locale === 'zh' ? '行' : 'LOC',
      t_chaptersUnit: locale === 'zh' ? '章' : locale === 'ja' ? '章' : 'chapters',
      t_readCountLabel: locale === 'zh' ? '已读' : locale === 'ja' ? '読了' : 'read',
      t_checkpointToggleShow: locale === 'zh' ? '查看重建目标' : locale === 'ja' ? '再構築目標を見る' : 'View rebuild target',
      t_checkpointToggleHide: locale === 'zh' ? '收起' : locale === 'ja' ? '閉じる' : 'Hide',
      t_checkpointRebuildLabel: locale === 'zh' ? '重建目标：' : locale === 'ja' ? '再構築目標：' : 'Rebuild target:',
    });
  },

  _refreshReadState() {
    const updated = this.data.timelineItems.map(item => ({
      ...item,
      isRead: progress.isRead(item.id),
    }));
    const readCount = progress.getReadCount(meta.versionOrder);
    this.setData({ timelineItems: updated, readCount });
  },

  switchLocale(e) {
    const locale = e.currentTarget.dataset.locale;
    if (locale === this.data.locale) return;
    i18n.setLocale(locale);
  },

  toggleCheckpoint(e) {
    const layer = e.currentTarget.dataset.layer;
    const expanded = Object.assign({}, this.data.expandedCheckpoints);
    expanded[layer] = !expanded[layer];
    this.setData({ expandedCheckpoints: expanded });
  },

  goToChapter(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/subpkg-chapters/pages/chapter/chapter?id=${id}`,
      fail() {
        console.warn('[timeline] navigateTo chapter failed, id:', id);
      },
    });
  },

  openBridgeDoc(e) {
    const slug = e.currentTarget.dataset.slug;
    wx.navigateTo({
      url: `/subpkg-chapters/pages/bridge-doc/bridge-doc?slug=${slug}`,
      fail() {
        console.warn('[timeline] navigateTo bridge-doc failed, slug:', slug);
      },
    });
  },
});
