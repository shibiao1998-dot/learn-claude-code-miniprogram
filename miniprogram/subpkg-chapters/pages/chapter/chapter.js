// subpkg-chapters/pages/chapter/chapter.js

const i18n = require('../../../utils/i18n');
const progress = require('../../../utils/progress');
const eventBus = require('../../../utils/event-bus');
const highlight = require('../../utils/highlight');
const markdownParser = require('../../utils/markdown-parser');
const dataLoader = require('../../data-loader');
const meta = require('../../../data/meta.js');

// ─── Deep Dive：章节 → 关联 Bridge Docs 映射 ───────────────────────────────
const CHAPTER_BRIDGE_DOCS = {
  s01: ['s00-architecture-overview', 's00b-one-request-lifecycle', 'data-structures'],
  s02: ['s02a-tool-control-plane', 's02b-tool-execution-runtime', 's00-architecture-overview'],
  s03: ['data-structures', 'entity-map', 's00-architecture-overview'],
  s04: ['data-structures', 's00-architecture-overview', 's00b-one-request-lifecycle'],
  s05: ['data-structures', 's00-architecture-overview'],
  s06: ['s00-architecture-overview', 's00b-one-request-lifecycle', 's00c-query-transition-model'],
  s07: ['s02a-tool-control-plane', 's00a-query-control-plane', 'entity-map'],
  s08: ['s02a-tool-control-plane', 's00a-query-control-plane', 'entity-map'],
  s09: ['data-structures', 's00-architecture-overview', 'entity-map'],
  s10: ['s10a-message-prompt-pipeline', 's00a-query-control-plane', 's00b-one-request-lifecycle'],
  s11: ['s00c-query-transition-model', 's00b-one-request-lifecycle', 'data-structures'],
  s12: ['data-structures', 's00-architecture-overview', 's00b-one-request-lifecycle'],
  s13: ['s13a-runtime-task-model', 'data-structures', 'entity-map'],
  s14: ['s13a-runtime-task-model', 's00-architecture-overview'],
  s15: ['team-task-lane-model', 'entity-map', 's00-architecture-overview'],
  s16: ['team-task-lane-model', 'data-structures'],
  s17: ['team-task-lane-model', 's00-architecture-overview'],
  s18: ['team-task-lane-model', 'data-structures'],
  s19: ['s19a-mcp-capability-layers', 's02a-tool-control-plane', 's00-architecture-overview'],
};

// slice 名称 i18n
const SLICE_LABELS = {
  mainline: { zh: '主线流程', en: 'Mainline', ja: 'メインライン' },
  control:  { zh: '控制层',   en: 'Control',  ja: 'コントロール' },
  state:    { zh: '状态管理', en: 'State',     ja: '状態管理' },
  lanes:    { zh: '执行车道', en: 'Lanes',     ja: 'レーン' },
};

// 模拟器步骤类型 → 人类可读标签
const SIM_TYPE_LABELS = {
  user_message: 'User',
  assistant_text: 'Assistant',
  tool_call: 'Tool Call',
  tool_result: 'Tool Result',
};

function _getSliceLabel(sliceId, locale) {
  const entry = SLICE_LABELS[sliceId];
  if (!entry) return sliceId;
  return entry[locale] || entry.en || sliceId;
}

// 将 flow nodes/edges 构建成顺序展示列表
// 策略：拓扑排序 → 按 y 坐标排序后顺序展示，并附加出边 label
function _buildFlowList(nodes, edges) {
  if (!nodes || !nodes.length) return [];

  // 以 y 坐标升序排列节点（流程图从上到下）
  const sorted = nodes.slice().sort((a, b) => (a.y || 0) - (b.y || 0));

  // 建立从 id → 出边 label 的映射
  const outLabels = {};
  (edges || []).forEach(e => {
    if (e.label) {
      if (!outLabels[e.from]) outLabels[e.from] = [];
      outLabels[e.from].push({ to: e.to, label: e.label });
    }
  });

  return sorted.map((node, idx) => {
    const edgeLabels = outLabels[node.id] || [];
    const edgeSummary = edgeLabels.map(e => e.label).join(' / ');
    return {
      id: node.id,
      label: node.label.replace(/\n/g, ' '),
      type: node.type,
      edgeSummary,
      isLast: idx === sorted.length - 1,
    };
  });
}

// 图层颜色映射（覆盖 meta.json 中的颜色，使用设计系统色值）
const LAYER_COLORS = {
  core: '#059669',
  hardening: '#2563EB',
  runtime: '#7C3AED',
  platform: '#DB2777',
  'best-practice': '#EA580C',
};

// 语法高亮 token 颜色映射（VS Code Dark+ 风格）
const TOKEN_COLORS = {
  comment: '#6A9955',
  string: '#CE9178',
  keyword: '#569CD6',
  builtin: '#4EC9B0',
  decorator: '#DCDCAA',
  number: '#B5CEA8',
  plain: '#D4D4D4',
};

// YAML token 颜色映射
var YAML_TOKEN_COLORS = {
  comment: '#6A9955',
  string: '#CE9178',
  keyword: '#9CDCFE',
  builtin: '#4EC9B0',
  decorator: '#DCDCAA',
  number: '#B5CEA8',
  plain: '#D4D4D4',
};

// 最大渲染行数（避免 WXML 节点过多）
const MAX_CODE_LINES = 300;

Page({
  data: {
    // 章节基本信息
    id: '',
    locale: 'zh',
    t: {},
    isBestPractice: false,
    chapterId: '',
    chapterTitle: '',
    chapterSubtitle: '',
    chapterKeyInsight: '',
    chapterCoreAddition: '',
    chapterLayer: '',
    chapterLayerColor: '',
    chapterLayerLabel: '',
    chapterLoc: 0,
    chapterTools: [],
    chapterNewTools: [],
    prevId: null,
    nextId: null,
    guide: null,
    isGuideExpanded: false,
    isRead: false,

    // Tab 状态
    activeTab: 'learn',
    tabs: [],

    // Learn Tab
    docNodes: [],

    // Code Tab
    codeLines: [],        // [[{color, value}], ...]
    codeLoaded: false,
    filename: '',
    totalLoc: 0,
    displayLoc: 0,        // 实际显示行数
    isTruncated: false,   // 是否被截断
    functions: [],        // [{name, signature, startLine}]
    classes: [],          // [{name, startLine}]

    // diff 信息
    diff: null,

    // Deep Dive Tab
    deepDiveLoaded: false,
    flowItems: [],          // [{id, label, type, edgeSummary, isLast}]
    blueprintData: null,    // {summary, slices, records, handoff}
    simulatorSteps: [],     // [{type, content, toolName, annotation, index, isActive}]
    simCurrentStep: 0,
    simCurrentStepData: null,  // 当前步骤完整数据（含 typeLabel）
    simPrevStep: null,         // 上一步摘要
    simNextStep: null,         // 下一步摘要
    simProgressPercent: 0,     // 进度百分比
    bridgeDocLinks: [],     // [{slug, title, summary, kind}]

    // Best Practice 专用
    relatedTipsList: [],       // [{slug, title, count}]
    relatedChapterLinks: [],   // [{id, title, layer, layerColor}]
  },

  onLoad(options) {
    const id = options.id || 's01';
    this._buildPageData(id);

    // 监听语言切换事件
    this._localeListener = () => {
      this._buildPageData(this.data.id);
    };
    eventBus.on('locale:change', this._localeListener);
  },

  onUnload() {
    if (this._localeListener) {
      eventBus.off('locale:change', this._localeListener);
    }
  },

  onShow() {
    // 每次显示时刷新已读状态（可能在其他页面被修改）
    const id = this.data.id;
    if (id) {
      this.setData({ isRead: progress.isRead(id) });
    }
  },

  /**
   * 根据 locale 静态加载 i18n 消息包（绕过动态 require 限制）
   */
  _getMessages(locale) {
    // 微信小程序不支持动态 require，用 switch 静态映射
    switch (locale) {
      case 'en': return require('../../../i18n/en.js');
      case 'ja': return require('../../../i18n/ja.js');
      default:   return require('../../../i18n/zh.js');
    }
  },

  /**
   * 构建页面所有数据
   */
  _buildPageData(id) {
    const locale = i18n.getLocale();
    let messages = {};
    try {
      messages = this._getMessages(locale);
    } catch (e) {
      try { messages = require('../../../i18n/zh.js'); } catch (e2) { messages = {}; }
    }

    const v = meta.versions[id];
    if (!v) {
      console.error('[chapter] version not found:', id);
      return;
    }

    const content = v.content[locale] || v.content.zh || v.content.en || {};
    const guide = v.guide[locale] || v.guide.zh || v.guide.en || {};
    const diff = meta.diffs ? meta.diffs.find(d => d.to === id) || null : null;

    // 章节标题（优先 i18n sessions）
    const chapterTitle = (messages.sessions && messages.sessions[id]) || v.title;
    const layerLabels = messages.layer_labels || {};

    // 加载 Markdown 文档并解析
    let docNodes = [];
    try {
      const doc = dataLoader.loadChapterDoc(id, locale);
      if (doc && doc.content) {
        docNodes = markdownParser.parse(doc.content);
      } else {
        docNodes = [{ type: 'paragraph', content: '文档内容暂未加载。' }];
      }
    } catch (e) {
      console.error('[chapter] doc load error:', e);
      docNodes = [{ type: 'paragraph', content: '文档加载失败，请重试。' }];
    }

    // 对 paragraph / list_item / blockquote 添加行内格式 HTML
    docNodes.forEach(function(node) {
      if (node.type === 'paragraph' || node.type === 'list_item' || node.type === 'blockquote') {
        node.htmlContent = markdownParser.inlineToHtml(node.content);
      }
    });

    // 构建文件名
    const safeTitle = v.title.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    const filename = isBP ? safeTitle + '.yaml' : (id + '_' + safeTitle + '.py');

    // Tab 配置
    const vt = messages.version || {};
    const isBP = !!(v.isBestPractice);
    const tabs = isBP
      ? [
          { id: 'learn', label: vt.tab_learn || '学习' },
          { id: 'code', label: vt.tab_config || '配置示例' },
          { id: 'deep-dive', label: vt.tab_deep_dive || '深入探索' },
        ]
      : [
          { id: 'learn', label: vt.tab_learn || '学习' },
          { id: 'code', label: vt.tab_code || '源码' },
          { id: 'deep-dive', label: vt.tab_deep_dive || '深入探索' },
        ];

    this.setData({
      id,
      locale,
      t: messages,
      isBestPractice: isBP,
      chapterId: id,
      chapterTitle,
      chapterSubtitle: content.subtitle || '',
      chapterKeyInsight: content.keyInsight || '',
      chapterCoreAddition: content.coreAddition || '',
      chapterLayer: v.layer || 'core',
      chapterLayerColor: LAYER_COLORS[v.layer] || '#94A3B8',
      chapterLayerLabel: layerLabels[v.layer] || v.layer,
      chapterLoc: v.loc || 0,
      chapterTools: v.tools || [],
      chapterNewTools: v.newTools || [],
      prevId: v.prevVersion || null,
      nextId: v.nextVersion || null,
      guide,
      isGuideExpanded: false,
      isRead: progress.isRead(id),
      activeTab: 'learn',
      tabs,
      docNodes,
      diff,
      filename,
      totalLoc: v.loc || 0,
      displayLoc: 0,
      functions: v.functions || [],
      classes: v.classes || [],
      codeLines: [],
      codeLoaded: false,
      // 重置 Deep Dive 状态
      deepDiveLoaded: false,
      flowItems: [],
      blueprintData: null,
      simulatorSteps: [],
      simCurrentStep: 0,
      simCurrentStepData: null,
      simPrevStep: null,
      simNextStep: null,
      simProgressPercent: 0,
      bridgeDocLinks: [],
    });

    // 标记已读
    progress.markRead(id);
  },

  /**
   * 懒加载 Code Tab 的语法高亮数据
   */
  _loadCodeTab() {
    if (this.data.codeLoaded) return;
    const id = this.data.id;
    const isBP = this.data.isBestPractice;

    try {
      var source = '';
      var colorMap = TOKEN_COLORS;
      var tokenizeFn = highlight.tokenize;

      if (isBP) {
        // Best Practice 章节：加载 YAML 配置示例
        var configExamples = require('../../data/bp-config-examples.js');
        source = configExamples[id] || '# No config example available';
        colorMap = YAML_TOKEN_COLORS;
        tokenizeFn = highlight.tokenizeYaml;
      } else {
        // 普通章节：加载 Python 源码
        var sources = require('../../data/versions-source.js');
        source = sources[id] || '';
      }

      const allLines = source.split('\n');
      const totalLoc = allLines.length;
      const isTruncated = totalLoc > MAX_CODE_LINES;
      const lines = allLines.slice(0, MAX_CODE_LINES);

      var codeLines;
      if (isBP) {
        // YAML: 整体 tokenize 后按行拆分
        var allTokens = tokenizeFn(source);
        codeLines = [[]];
        for (var ti = 0; ti < allTokens.length; ti++) {
          var tk = allTokens[ti];
          if (tk.value === '\n') {
            if (codeLines.length < MAX_CODE_LINES) {
              codeLines.push([]);
            }
          } else {
            codeLines[codeLines.length - 1].push({
              color: colorMap[tk.type] || colorMap.plain,
              value: tk.value
            });
          }
        }
        // 确保空行有内容
        for (var ci = 0; ci < codeLines.length; ci++) {
          if (codeLines[ci].length === 0) {
            codeLines[ci].push({ color: colorMap.plain, value: ' ' });
          }
        }
      } else {
        // Python: 逐行 tokenize
        codeLines = lines.map(function(line) {
          var tokens = tokenizeFn(line.length > 0 ? line : ' ');
          return tokens.map(function(tk) {
            return {
              color: colorMap[tk.type] || colorMap.plain,
              value: tk.value,
            };
          });
        });
      }

      this.setData({
        codeLines: codeLines,
        totalLoc: totalLoc,
        displayLoc: isBP ? codeLines.length : lines.length,
        isTruncated: isTruncated,
        codeLoaded: true,
      });
    } catch (e) {
      console.error('[chapter] source load error:', e);
      this.setData({
        codeLines: [[{ color: TOKEN_COLORS.comment, value: isBP ? '# 配置示例加载失败' : '# 源码加载失败' }]],
        codeLoaded: true,
      });
    }
  },

  // ─── Tab 切换 ───────────────────────────────────────────
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    if (tab === this.data.activeTab) return;
    this.setData({ activeTab: tab });
    if (tab === 'code' && !this.data.codeLoaded) {
      this._loadCodeTab();
    }
    if (tab === 'deep-dive' && !this.data.deepDiveLoaded) {
      this._loadDeepDiveTab();
    }
  },

  // ─── 导读折叠/展开 ──────────────────────────────────────
  toggleGuide() {
    this.setData({ isGuideExpanded: !this.data.isGuideExpanded });
  },

  // ─── 前后章节导航 ────────────────────────────────────────
  goToPrev() {
    const { prevId } = this.data;
    if (!prevId) return;
    wx.redirectTo({
      url: `/subpkg-chapters/pages/chapter/chapter?id=${prevId}`,
    });
  },

  goToNext() {
    const { nextId } = this.data;
    if (!nextId) return;
    wx.redirectTo({
      url: `/subpkg-chapters/pages/chapter/chapter?id=${nextId}`,
    });
  },

  goBack() {
    wx.navigateBack({ delta: 1 });
  },

  // ─── 复制源码 ────────────────────────────────────────────
  copySource() {
    var isBP = this.data.isBestPractice;
    try {
      var source = '';
      if (isBP) {
        var configExamples = require('../../data/bp-config-examples.js');
        source = configExamples[this.data.id] || '';
      } else {
        var sources = require('../../data/versions-source.js');
        source = sources[this.data.id] || '';
      }
      wx.setClipboardData({
        data: source,
        success: function() {
          wx.showToast({ title: isBP ? '已复制配置' : '已复制源码', icon: 'success', duration: 1500 });
        },
        fail: function() {
          wx.showToast({ title: '复制失败', icon: 'none' });
        },
      });
    } catch (e) {
      wx.showToast({ title: '获取内容失败', icon: 'none' });
    }
  },

  // ─── BP: 跳转到 Tips 分类 ──────────────────────────────
  openTipsCategory: function(e) {
    var slug = e.currentTarget.dataset.slug;
    if (slug) {
      wx.navigateTo({
        url: '/subpkg-bridge/pages/bridge-doc/bridge-doc?slug=' + slug,
      });
    }
  },

  // ─── BP: 跳转到关联架构章节 ────────────────────────────
  goToRelatedChapter: function(e) {
    var chapterId = e.currentTarget.dataset.id;
    if (chapterId) {
      wx.redirectTo({
        url: '/subpkg-chapters/pages/chapter/chapter?id=' + chapterId,
      });
    }
  },

  // ─── 跳转到指定函数行（scroll-into-view） ────────────────
  scrollToFunc(e) {
    const lineIndex = e.currentTarget.dataset.line;
    if (lineIndex === undefined) return;
    // scroll-into-view 用 id="line-{index}"
    this.setData({ scrollToLineId: `line-${lineIndex - 1}` });
  },

  // ─── Deep Dive Tab ──────────────────────────────────────
  _loadDeepDiveTab() {
    const id = this.data.id;
    const locale = this.data.locale;
    const isBP = this.data.isBestPractice;
    const pick = (obj) => (obj && (obj[locale] || obj.en || obj.zh)) || '';

    if (isBP) {
      // Best Practice 章节：显示关联 Tips 和关联架构章节
      var relatedTipsList = [];
      var relatedChapterLinks = [];

      // 加载关联的 Tips 分类
      try {
        var tipsIndex = require('../../../data/tips-index.js');
        var bpTipsMap = {
          bp01: 'claude-md',
          bp02: 'commands',
          bp03: 'skills',
          bp04: 'hooks',
          bp05: 'agents',
          bp06: 'utilities',
          bp07: 'workflows',
        };
        var catId = bpTipsMap[id];
        if (catId) {
          for (var ti = 0; ti < tipsIndex.length; ti++) {
            if (tipsIndex[ti].id === catId) {
              relatedTipsList.push({
                slug: 'tips-' + catId,
                title: pick(tipsIndex[ti].label),
                count: tipsIndex[ti].count,
              });
              break;
            }
          }
        }
        // 也添加通用分类
        for (var tti = 0; tti < tipsIndex.length; tti++) {
          var cat = tipsIndex[tti];
          if (cat.id !== catId && (cat.id === 'prompting' || cat.id === 'planning' || cat.id === 'workflows' || cat.id === 'daily')) {
            relatedTipsList.push({
              slug: 'tips-' + cat.id,
              title: pick(cat.label),
              count: cat.count,
            });
          }
        }
      } catch (e) {
        console.error('[deep-dive] tips-index load error:', e);
      }

      // 加载关联架构章节
      var v = meta.versions[id];
      var relatedIds = (v && v.relatedChapters) || [];
      for (var ri = 0; ri < relatedIds.length; ri++) {
        var rv = meta.versions[relatedIds[ri]];
        if (rv) {
          var messages = {};
          try { messages = this._getMessages(locale); } catch (e) { /* noop */ }
          relatedChapterLinks.push({
            id: rv.id,
            title: (messages.sessions && messages.sessions[rv.id]) || rv.title,
            layer: rv.layer,
            layerColor: LAYER_COLORS[rv.layer] || '#94A3B8',
          });
        }
      }

      this.setData({
        flowItems: [],
        blueprintData: null,
        simulatorSteps: [],
        simCurrentStep: 0,
        bridgeDocLinks: [],
        relatedTipsList: relatedTipsList,
        relatedChapterLinks: relatedChapterLinks,
        deepDiveLoaded: true,
      });
      return;
    }

    // 普通章节：原有逻辑
    // 流程图数据
    let flowItems = [];
    try {
      const flows = require('../../data/flows.js');
      const flow = flows[id] || null;
      if (flow) {
        flowItems = _buildFlowList(flow.nodes, flow.edges);
      }
    } catch (e) {
      console.error('[deep-dive] flows load error:', e);
    }

    // 架构蓝图
    let blueprintData = null;
    try {
      const blueprints = require('../../data/blueprints.js');
      const blueprint = blueprints[id] || null;
      if (blueprint) {
        blueprintData = {
          summary: pick(blueprint.summary),
          slices: Object.entries(blueprint.slices || {}).map(([sliceId, items]) => ({
            id: sliceId,
            label: _getSliceLabel(sliceId, locale),
            items: (Array.isArray(items) ? items : []).map(item => ({
              name: pick(item.name),
              detail: pick(item.detail),
              fresh: !!item.fresh,
            })),
          })),
          records: (blueprint.records || []).map(r => ({
            name: typeof r.name === 'object' ? pick(r.name) : (r.name || ''),
            detail: typeof r.detail === 'object' ? pick(r.detail) : (r.detail || ''),
            fresh: !!r.fresh,
          })),
          handoff: (blueprint.handoff || []).map(h => typeof h === 'object' ? pick(h) : h),
        };
      }
    } catch (e) {
      console.error('[deep-dive] blueprints load error:', e);
    }

    // 模拟器数据
    let simulatorSteps = [];
    try {
      const scenarios = require('../../data/scenarios-all.js');
      const scenario = scenarios[id] || null;
      if (scenario && scenario.steps) {
        simulatorSteps = scenario.steps.map((s, i) => ({
          type: s.type,
          content: s.content || '',
          toolName: s.toolName || '',
          annotation: s.annotation || '',
          index: i,
          isActive: i === 0,
        }));
      }
    } catch (e) {
      console.error('[deep-dive] scenarios load error:', e);
    }

    // Bridge Doc 链接
    let bridgeDocLinks = [];
    try {
      const bridgeDocsMeta = require('../../../data/bridge-docs-meta.js');
      const slugs = CHAPTER_BRIDGE_DOCS[id] || ['data-structures', 'entity-map', 's00-architecture-overview'];
      bridgeDocLinks = slugs
        .filter(slug => bridgeDocsMeta[slug])
        .map(slug => {
          const m = bridgeDocsMeta[slug];
          return {
            slug,
            title: pick(m.title),
            summary: pick(m.summary),
            kind: m.kind || 'map',
          };
        });
    } catch (e) {
      console.error('[deep-dive] bridge-docs-meta load error:', e);
    }

    this.setData({
      flowItems,
      blueprintData,
      simulatorSteps,
      simCurrentStep: 0,
      bridgeDocLinks,
      deepDiveLoaded: true,
    });

    // 初始化模拟器焦点数据
    if (simulatorSteps.length > 0) {
      this._computeSimData();
    }
  },

  /**
   * 计算模拟器聚焦模式的数据：当前步骤 + 前后预览
   */
  _computeSimData() {
    var steps = this.data.simulatorSteps;
    var idx = this.data.simCurrentStep;
    if (!steps || steps.length === 0) return;

    var current = steps[idx];
    var prev = idx > 0 ? steps[idx - 1] : null;
    var next = idx < steps.length - 1 ? steps[idx + 1] : null;

    this.setData({
      simCurrentStepData: Object.assign({}, current, {
        typeLabel: SIM_TYPE_LABELS[current.type] || current.type
      }),
      simPrevStep: prev ? {
        typeLabel: SIM_TYPE_LABELS[prev.type] || prev.type,
        contentPreview: (prev.content || '').slice(0, 40) + (prev.content && prev.content.length > 40 ? '...' : '')
      } : null,
      simNextStep: next ? {
        typeLabel: SIM_TYPE_LABELS[next.type] || next.type,
        contentPreview: (next.content || '').slice(0, 40) + (next.content && next.content.length > 40 ? '...' : '')
      } : null,
      simProgressPercent: Math.round((idx + 1) / steps.length * 100)
    });
  },

  simNext() {
    var simCurrentStep = this.data.simCurrentStep;
    var simulatorSteps = this.data.simulatorSteps;
    if (simCurrentStep >= simulatorSteps.length - 1) return;
    var next = simCurrentStep + 1;
    var steps = simulatorSteps.map(function(s, i) { return Object.assign({}, s, { isActive: i === next }); });
    this.setData({ simCurrentStep: next, simulatorSteps: steps });
    this._computeSimData();
  },

  simPrev() {
    var simCurrentStep = this.data.simCurrentStep;
    var simulatorSteps = this.data.simulatorSteps;
    if (simCurrentStep <= 0) return;
    var prev = simCurrentStep - 1;
    var steps = simulatorSteps.map(function(s, i) { return Object.assign({}, s, { isActive: i === prev }); });
    this.setData({ simCurrentStep: prev, simulatorSteps: steps });
    this._computeSimData();
  },

  simReset() {
    var steps = this.data.simulatorSteps.map(function(s, i) { return Object.assign({}, s, { isActive: i === 0 }); });
    this.setData({ simCurrentStep: 0, simulatorSteps: steps });
    this._computeSimData();
  },

  // 跳转到 Bridge Doc 页面
  openBridgeDoc(e) {
    const slug = e.currentTarget.dataset.slug;
    if (!slug) return;
    wx.navigateTo({
      url: `/subpkg-bridge/pages/bridge-doc/bridge-doc?slug=${slug}`,
    });
  },

  // ─── 跳转到指定函数行（scroll-into-view） ────────────────
  scrollToFunc(e) {
    const lineIndex = e.currentTarget.dataset.line;
    if (lineIndex === undefined) return;
    // scroll-into-view 用 id="line-{index}"
    this.setData({ scrollToLineId: `line-${lineIndex - 1}` });
  },
});
