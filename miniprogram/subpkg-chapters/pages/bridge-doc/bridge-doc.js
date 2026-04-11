// subpkg-chapters/pages/bridge-doc/bridge-doc.js

const i18n = require('../../../utils/i18n');
const eventBus = require('../../../utils/event-bus');
const markdownParser = require('../../../utils/markdown-parser');
const bridgeDocsMeta = require('../../../data/bridge-docs-meta.json');

/**
 * 静态映射所有 bridge doc 文件（绕过微信小程序动态 require 限制）
 * 17 slugs × 3 locales = 51 entries
 */
function _loadBridgeDocContent(slug, locale) {
  const map = {
    // data-structures
    'data-structures-zh': () => require('../../../data/docs/bridge-data-structures-zh.json'),
    'data-structures-en': () => require('../../../data/docs/bridge-data-structures-en.json'),
    'data-structures-ja': () => require('../../../data/docs/bridge-data-structures-ja.json'),
    // entity-map
    'entity-map-zh': () => require('../../../data/docs/bridge-entity-map-zh.json'),
    'entity-map-en': () => require('../../../data/docs/bridge-entity-map-en.json'),
    'entity-map-ja': () => require('../../../data/docs/bridge-entity-map-ja.json'),
    // glossary
    'glossary-zh': () => require('../../../data/docs/bridge-glossary-zh.json'),
    'glossary-en': () => require('../../../data/docs/bridge-glossary-en.json'),
    'glossary-ja': () => require('../../../data/docs/bridge-glossary-ja.json'),
    // s00-architecture-overview
    's00-architecture-overview-zh': () => require('../../../data/docs/bridge-s00-architecture-overview-zh.json'),
    's00-architecture-overview-en': () => require('../../../data/docs/bridge-s00-architecture-overview-en.json'),
    's00-architecture-overview-ja': () => require('../../../data/docs/bridge-s00-architecture-overview-ja.json'),
    // s00a-query-control-plane
    's00a-query-control-plane-zh': () => require('../../../data/docs/bridge-s00a-query-control-plane-zh.json'),
    's00a-query-control-plane-en': () => require('../../../data/docs/bridge-s00a-query-control-plane-en.json'),
    's00a-query-control-plane-ja': () => require('../../../data/docs/bridge-s00a-query-control-plane-ja.json'),
    // s00b-one-request-lifecycle
    's00b-one-request-lifecycle-zh': () => require('../../../data/docs/bridge-s00b-one-request-lifecycle-zh.json'),
    's00b-one-request-lifecycle-en': () => require('../../../data/docs/bridge-s00b-one-request-lifecycle-en.json'),
    's00b-one-request-lifecycle-ja': () => require('../../../data/docs/bridge-s00b-one-request-lifecycle-ja.json'),
    // s00c-query-transition-model
    's00c-query-transition-model-zh': () => require('../../../data/docs/bridge-s00c-query-transition-model-zh.json'),
    's00c-query-transition-model-en': () => require('../../../data/docs/bridge-s00c-query-transition-model-en.json'),
    's00c-query-transition-model-ja': () => require('../../../data/docs/bridge-s00c-query-transition-model-ja.json'),
    // s00d-chapter-order-rationale
    's00d-chapter-order-rationale-zh': () => require('../../../data/docs/bridge-s00d-chapter-order-rationale-zh.json'),
    's00d-chapter-order-rationale-en': () => require('../../../data/docs/bridge-s00d-chapter-order-rationale-en.json'),
    's00d-chapter-order-rationale-ja': () => require('../../../data/docs/bridge-s00d-chapter-order-rationale-ja.json'),
    // s00e-reference-module-map
    's00e-reference-module-map-zh': () => require('../../../data/docs/bridge-s00e-reference-module-map-zh.json'),
    's00e-reference-module-map-en': () => require('../../../data/docs/bridge-s00e-reference-module-map-en.json'),
    's00e-reference-module-map-ja': () => require('../../../data/docs/bridge-s00e-reference-module-map-ja.json'),
    // s00f-code-reading-order
    's00f-code-reading-order-zh': () => require('../../../data/docs/bridge-s00f-code-reading-order-zh.json'),
    's00f-code-reading-order-en': () => require('../../../data/docs/bridge-s00f-code-reading-order-en.json'),
    's00f-code-reading-order-ja': () => require('../../../data/docs/bridge-s00f-code-reading-order-ja.json'),
    // s02a-tool-control-plane
    's02a-tool-control-plane-zh': () => require('../../../data/docs/bridge-s02a-tool-control-plane-zh.json'),
    's02a-tool-control-plane-en': () => require('../../../data/docs/bridge-s02a-tool-control-plane-en.json'),
    's02a-tool-control-plane-ja': () => require('../../../data/docs/bridge-s02a-tool-control-plane-ja.json'),
    // s02b-tool-execution-runtime
    's02b-tool-execution-runtime-zh': () => require('../../../data/docs/bridge-s02b-tool-execution-runtime-zh.json'),
    's02b-tool-execution-runtime-en': () => require('../../../data/docs/bridge-s02b-tool-execution-runtime-en.json'),
    's02b-tool-execution-runtime-ja': () => require('../../../data/docs/bridge-s02b-tool-execution-runtime-ja.json'),
    // s10a-message-prompt-pipeline
    's10a-message-prompt-pipeline-zh': () => require('../../../data/docs/bridge-s10a-message-prompt-pipeline-zh.json'),
    's10a-message-prompt-pipeline-en': () => require('../../../data/docs/bridge-s10a-message-prompt-pipeline-en.json'),
    's10a-message-prompt-pipeline-ja': () => require('../../../data/docs/bridge-s10a-message-prompt-pipeline-ja.json'),
    // s13a-runtime-task-model
    's13a-runtime-task-model-zh': () => require('../../../data/docs/bridge-s13a-runtime-task-model-zh.json'),
    's13a-runtime-task-model-en': () => require('../../../data/docs/bridge-s13a-runtime-task-model-en.json'),
    's13a-runtime-task-model-ja': () => require('../../../data/docs/bridge-s13a-runtime-task-model-ja.json'),
    // s19a-mcp-capability-layers
    's19a-mcp-capability-layers-zh': () => require('../../../data/docs/bridge-s19a-mcp-capability-layers-zh.json'),
    's19a-mcp-capability-layers-en': () => require('../../../data/docs/bridge-s19a-mcp-capability-layers-en.json'),
    's19a-mcp-capability-layers-ja': () => require('../../../data/docs/bridge-s19a-mcp-capability-layers-ja.json'),
    // teaching-scope
    'teaching-scope-zh': () => require('../../../data/docs/bridge-teaching-scope-zh.json'),
    'teaching-scope-en': () => require('../../../data/docs/bridge-teaching-scope-en.json'),
    'teaching-scope-ja': () => require('../../../data/docs/bridge-teaching-scope-ja.json'),
    // team-task-lane-model
    'team-task-lane-model-zh': () => require('../../../data/docs/bridge-team-task-lane-model-zh.json'),
    'team-task-lane-model-en': () => require('../../../data/docs/bridge-team-task-lane-model-en.json'),
    'team-task-lane-model-ja': () => require('../../../data/docs/bridge-team-task-lane-model-ja.json'),
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
