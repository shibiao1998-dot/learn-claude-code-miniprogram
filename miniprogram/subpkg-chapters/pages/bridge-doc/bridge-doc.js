// subpkg-chapters/pages/bridge-doc/bridge-doc.js

const i18n = require('../../../utils/i18n');
const eventBus = require('../../../utils/event-bus');
const markdownParser = require('../../../utils/markdown-parser');
const bridgeDocsMeta = require('../../../data/bridge-docs-meta.js');

/**
 * 静态映射所有 bridge doc 文件（绕过微信小程序动态 require 限制）
 * 17 slugs × 3 locales = 51 entries
 */
function _loadBridgeDocContent(slug, locale) {
  const map = {
    // data-structures
    'data-structures-zh': () => require('../../../data/docs/bridge-data-structures-zh.js'),
    'data-structures-en': () => require('../../../data/docs/bridge-data-structures-en.js'),
    'data-structures-ja': () => require('../../../data/docs/bridge-data-structures-ja.js'),
    // entity-map
    'entity-map-zh': () => require('../../../data/docs/bridge-entity-map-zh.js'),
    'entity-map-en': () => require('../../../data/docs/bridge-entity-map-en.js'),
    'entity-map-ja': () => require('../../../data/docs/bridge-entity-map-ja.js'),
    // glossary
    'glossary-zh': () => require('../../../data/docs/bridge-glossary-zh.js'),
    'glossary-en': () => require('../../../data/docs/bridge-glossary-en.js'),
    'glossary-ja': () => require('../../../data/docs/bridge-glossary-ja.js'),
    // s00-architecture-overview
    's00-architecture-overview-zh': () => require('../../../data/docs/bridge-s00-architecture-overview-zh.js'),
    's00-architecture-overview-en': () => require('../../../data/docs/bridge-s00-architecture-overview-en.js'),
    's00-architecture-overview-ja': () => require('../../../data/docs/bridge-s00-architecture-overview-ja.js'),
    // s00a-query-control-plane
    's00a-query-control-plane-zh': () => require('../../../data/docs/bridge-s00a-query-control-plane-zh.js'),
    's00a-query-control-plane-en': () => require('../../../data/docs/bridge-s00a-query-control-plane-en.js'),
    's00a-query-control-plane-ja': () => require('../../../data/docs/bridge-s00a-query-control-plane-ja.js'),
    // s00b-one-request-lifecycle
    's00b-one-request-lifecycle-zh': () => require('../../../data/docs/bridge-s00b-one-request-lifecycle-zh.js'),
    's00b-one-request-lifecycle-en': () => require('../../../data/docs/bridge-s00b-one-request-lifecycle-en.js'),
    's00b-one-request-lifecycle-ja': () => require('../../../data/docs/bridge-s00b-one-request-lifecycle-ja.js'),
    // s00c-query-transition-model
    's00c-query-transition-model-zh': () => require('../../../data/docs/bridge-s00c-query-transition-model-zh.js'),
    's00c-query-transition-model-en': () => require('../../../data/docs/bridge-s00c-query-transition-model-en.js'),
    's00c-query-transition-model-ja': () => require('../../../data/docs/bridge-s00c-query-transition-model-ja.js'),
    // s00d-chapter-order-rationale
    's00d-chapter-order-rationale-zh': () => require('../../../data/docs/bridge-s00d-chapter-order-rationale-zh.js'),
    's00d-chapter-order-rationale-en': () => require('../../../data/docs/bridge-s00d-chapter-order-rationale-en.js'),
    's00d-chapter-order-rationale-ja': () => require('../../../data/docs/bridge-s00d-chapter-order-rationale-ja.js'),
    // s00e-reference-module-map
    's00e-reference-module-map-zh': () => require('../../../data/docs/bridge-s00e-reference-module-map-zh.js'),
    's00e-reference-module-map-en': () => require('../../../data/docs/bridge-s00e-reference-module-map-en.js'),
    's00e-reference-module-map-ja': () => require('../../../data/docs/bridge-s00e-reference-module-map-ja.js'),
    // s00f-code-reading-order
    's00f-code-reading-order-zh': () => require('../../../data/docs/bridge-s00f-code-reading-order-zh.js'),
    's00f-code-reading-order-en': () => require('../../../data/docs/bridge-s00f-code-reading-order-en.js'),
    's00f-code-reading-order-ja': () => require('../../../data/docs/bridge-s00f-code-reading-order-ja.js'),
    // s02a-tool-control-plane
    's02a-tool-control-plane-zh': () => require('../../../data/docs/bridge-s02a-tool-control-plane-zh.js'),
    's02a-tool-control-plane-en': () => require('../../../data/docs/bridge-s02a-tool-control-plane-en.js'),
    's02a-tool-control-plane-ja': () => require('../../../data/docs/bridge-s02a-tool-control-plane-ja.js'),
    // s02b-tool-execution-runtime
    's02b-tool-execution-runtime-zh': () => require('../../../data/docs/bridge-s02b-tool-execution-runtime-zh.js'),
    's02b-tool-execution-runtime-en': () => require('../../../data/docs/bridge-s02b-tool-execution-runtime-en.js'),
    's02b-tool-execution-runtime-ja': () => require('../../../data/docs/bridge-s02b-tool-execution-runtime-ja.js'),
    // s10a-message-prompt-pipeline
    's10a-message-prompt-pipeline-zh': () => require('../../../data/docs/bridge-s10a-message-prompt-pipeline-zh.js'),
    's10a-message-prompt-pipeline-en': () => require('../../../data/docs/bridge-s10a-message-prompt-pipeline-en.js'),
    's10a-message-prompt-pipeline-ja': () => require('../../../data/docs/bridge-s10a-message-prompt-pipeline-ja.js'),
    // s13a-runtime-task-model
    's13a-runtime-task-model-zh': () => require('../../../data/docs/bridge-s13a-runtime-task-model-zh.js'),
    's13a-runtime-task-model-en': () => require('../../../data/docs/bridge-s13a-runtime-task-model-en.js'),
    's13a-runtime-task-model-ja': () => require('../../../data/docs/bridge-s13a-runtime-task-model-ja.js'),
    // s19a-mcp-capability-layers
    's19a-mcp-capability-layers-zh': () => require('../../../data/docs/bridge-s19a-mcp-capability-layers-zh.js'),
    's19a-mcp-capability-layers-en': () => require('../../../data/docs/bridge-s19a-mcp-capability-layers-en.js'),
    's19a-mcp-capability-layers-ja': () => require('../../../data/docs/bridge-s19a-mcp-capability-layers-ja.js'),
    // teaching-scope
    'teaching-scope-zh': () => require('../../../data/docs/bridge-teaching-scope-zh.js'),
    'teaching-scope-en': () => require('../../../data/docs/bridge-teaching-scope-en.js'),
    'teaching-scope-ja': () => require('../../../data/docs/bridge-teaching-scope-ja.js'),
    // team-task-lane-model
    'team-task-lane-model-zh': () => require('../../../data/docs/bridge-team-task-lane-model-zh.js'),
    'team-task-lane-model-en': () => require('../../../data/docs/bridge-team-task-lane-model-en.js'),
    'team-task-lane-model-ja': () => require('../../../data/docs/bridge-team-task-lane-model-ja.js'),
  };

  const key = `${slug}-${locale}`;
  const loader = map[key] || map[`${slug}-zh`] || map[`${slug}-en`] || null;
  if (!loader) return null;
  try {
    return loader();
  } catch (e) {
    console.error('[bridge-doc] load failed:', key, e);
    return null;
  }
}

Page({
  data: {
    slug: '',
    locale: 'zh',
    kind: 'map',
    title: '',
    summary: '',
    docNodes: [],
    loaded: false,
    notFound: false,
  },

  onLoad(options) {
    const slug = options.slug || '';
    this._loadDoc(slug);

    this._localeListener = () => {
      this._loadDoc(this.data.slug);
    };
    eventBus.on('locale:change', this._localeListener);
  },

  onUnload() {
    if (this._localeListener) {
      eventBus.off('locale:change', this._localeListener);
    }
  },

  _loadDoc(slug) {
    if (!slug) {
      this.setData({ notFound: true, loaded: true });
      return;
    }

    const locale = i18n.getLocale();
    const meta = bridgeDocsMeta[slug];

    if (!meta) {
      this.setData({ slug, notFound: true, loaded: true });
      wx.setNavigationBarTitle({ title: '文档未找到' });
      return;
    }

    const pick = (obj) => (obj && (obj[locale] || obj.en || obj.zh)) || '';
    const title = pick(meta.title);
    const summary = pick(meta.summary);
    const kind = meta.kind || 'map';

    wx.setNavigationBarTitle({ title: title || slug });

    // 加载文档内容
    let docNodes = [];
    const docData = _loadBridgeDocContent(slug, locale);
    if (docData && docData.content) {
      try {
        docNodes = markdownParser.parse(docData.content);
      } catch (e) {
        console.error('[bridge-doc] parse error:', e);
        docNodes = [{ type: 'paragraph', content: '文档解析失败。' }];
      }
    } else {
      docNodes = [{ type: 'paragraph', content: '文档内容暂未加载。' }];
    }

    this.setData({
      slug,
      locale,
      kind,
      title,
      summary,
      docNodes,
      loaded: true,
      notFound: false,
    });
  },

  goBack() {
    wx.navigateBack({ delta: 1 });
  },
});
