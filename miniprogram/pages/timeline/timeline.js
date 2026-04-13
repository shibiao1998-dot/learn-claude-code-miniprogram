// pages/timeline/timeline.js
const i18n = require('../../utils/i18n');
const eventBus = require('../../utils/event-bus');
const progress = require('../../utils/progress');
const meta = require('../../data/meta.js');

// 阶段颜色（对应 CSS 变量中的 layer 颜色）
const LAYER_COLORS = {
  core: '#059669',
  hardening: '#2563EB',
  runtime: '#7C3AED',
  platform: '#DB2777',
};

// 常用桥接文档快速入口
const BRIDGE_LINKS = [
  { slug: 's00a-query-control-plane', labelZh: '查询控制平面', labelEn: 'Query Control Plane', labelJa: 'クエリ制御プレーン' },
  { slug: 's02b-tool-execution-runtime', labelZh: '工具执行运行时', labelEn: 'Tool Execution Runtime', labelJa: 'ツール実行ランタイム' },
  { slug: 's13a-runtime-task-model', labelZh: '运行时任务模型', labelEn: 'Runtime Task Model', labelJa: 'ランタイムタスクモデル' },
  { slug: 'team-task-lane-model', labelZh: '队友-任务-车道模型', labelEn: 'Team-Task-Lane Model', labelJa: 'チーム-タスク-レーンモデル' },
  { slug: 's19a-mcp-capability-layers', labelZh: 'MCP 能力层地图', labelEn: 'MCP Capability Layers', labelJa: 'MCP 能力層マップ' },
];

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

// 构建 layerStart 的版本范围文本映射
function _buildLayerRangeMap() {
  var map = {};
  meta.layers.forEach(function(layer) {
    if (layer.versions && layer.versions.length > 0) {
      var first = layer.versions[0];
      var last = layer.versions[layer.versions.length - 1];
      map[first] = first + ' → ' + last;
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
    // 桥接文档链接（label 已按 locale 处理）
    bridgeLinks: [],
    // 阶段检查点
    checkpoints: [],
    expandedCheckpoints: {},
    // 主时间线
    timelineItems: [],
    // 阶段标签（用于检查点 section 标题翻译）
    t_checkpointSectionTitle: '',
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
    let messages = {};
    try {
      switch (locale) {
        case 'en': messages = require('../../i18n/en.js'); break;
        case 'ja': messages = require('../../i18n/ja.js'); break;
        default:   messages = require('../../i18n/zh.js'); break;
      }
    } catch (e) {
      messages = require('../../i18n/zh.js');
    }

    const layerStartMap = _buildLayerStartMap();

    const layerRangeMap = _buildLayerRangeMap();

    // 构建 timelineItems（地铁图模式：仅保留 id/title/layer/isRead/layerStart 信息）
    var prevLayerColor = '';
    var foundCurrent = false;
    var timelineItems = meta.versionOrder.map(function(id) {
      var v = meta.versions[id];
      if (!v) return null;

      var isLayerStart = layerStartMap[id] !== undefined;

      // layer 标题
      var layerLabel = '';
      if (isLayerStart) {
        var lid = layerStartMap[id];
        layerLabel = (messages.layer_labels && messages.layer_labels[lid]) || lid;
      }

      var isRead = progress.isRead(id);
      var isCurrent = false;
      if (!isRead && !foundCurrent) {
        isCurrent = true;
        foundCurrent = true;
      }

      var itemPrevLayerColor = prevLayerColor;
      var currentLayerColor = _getLayerColor(v.layer);
      if (isLayerStart) {
        prevLayerColor = currentLayerColor;
      }

      return {
        id: id,
        title: (messages.sessions && messages.sessions[id]) || v.title,
        layer: v.layer,
        isRead: isRead,
        isCurrent: isCurrent,
        isLast: false,
        isLayerStart: isLayerStart,
        layerLabel: layerLabel,
        layerColor: currentLayerColor,
        prevLayerColor: isLayerStart ? itemPrevLayerColor : '',
        rangeText: isLayerStart ? (layerRangeMap[id] || '') : '',
      };
    }).filter(Boolean);

    // Mark the last item
    if (timelineItems.length > 0) {
      timelineItems[timelineItems.length - 1].isLast = true;
    }

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

    // 统计
    const readCount = progress.getReadCount(meta.versionOrder);

    // 页面文字
    const t = messages.timeline || {};
    const tLayers = messages.layers || {};

    this.setData({
      locale: locale,
      pageTitle: t.title || '学习时间线',
      pageSubtitle: t.subtitle || '',
      bridgeLinks: bridgeLinks,
      checkpoints: checkpoints,
      expandedCheckpoints: this.data.expandedCheckpoints,
      timelineItems: timelineItems,
      totalChapters: meta.versionOrder.length,
      readCount: readCount,
      t_currentLabel: locale === 'zh' ? '当前' : locale === 'ja' ? '現在' : 'Current',
      t_checkpointSectionTitle: locale === 'zh'
        ? '每走完一个阶段，先自己重建一版，再进入下一阶段'
        : locale === 'ja'
          ? '各ステージを終えたら、自分で再構築してから次へ進む'
          : 'Rebuild each stage before moving to the next',
      t_chaptersUnit: locale === 'zh' ? '章' : locale === 'ja' ? '章' : 'chapters',
      t_readCountLabel: locale === 'zh' ? '已读' : locale === 'ja' ? '読了' : 'read',
      t_checkpointToggleShow: locale === 'zh' ? '查看重建目标' : locale === 'ja' ? '再構築目標を見る' : 'View rebuild target',
      t_checkpointRebuildLabel: locale === 'zh' ? '重建目标：' : locale === 'ja' ? '再構築目標：' : 'Rebuild target:',
    });
  },

  _refreshReadState() {
    var foundCurrent = false;
    var updated = this.data.timelineItems.map(function(item, idx, arr) {
      var isRead = progress.isRead(item.id);
      var isCurrent = false;
      if (!isRead && !foundCurrent) {
        isCurrent = true;
        foundCurrent = true;
      }
      return Object.assign({}, item, {
        isRead: isRead,
        isCurrent: isCurrent,
        isLast: idx === arr.length - 1,
      });
    });
    var readCount = progress.getReadCount(meta.versionOrder);
    this.setData({ timelineItems: updated, readCount: readCount });
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
