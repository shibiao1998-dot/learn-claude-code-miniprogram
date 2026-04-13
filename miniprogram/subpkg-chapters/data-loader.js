// subpkg-chapters/data-loader.js
// 静态映射所有章节文档，绕过微信小程序不支持动态 require 的限制
// 路径相对于本文件所在目录（subpkg-chapters/）

const DOCS = {
  's01-zh': require('../data/docs/chapter-s01-zh.js'),
  's01-en': require('../data/docs/chapter-s01-en.js'),
  's01-ja': require('../data/docs/chapter-s01-ja.js'),
  's02-zh': require('../data/docs/chapter-s02-zh.js'),
  's02-en': require('../data/docs/chapter-s02-en.js'),
  's02-ja': require('../data/docs/chapter-s02-ja.js'),
  's03-zh': require('../data/docs/chapter-s03-zh.js'),
  's03-en': require('../data/docs/chapter-s03-en.js'),
  's03-ja': require('../data/docs/chapter-s03-ja.js'),
  's04-zh': require('../data/docs/chapter-s04-zh.js'),
  's04-en': require('../data/docs/chapter-s04-en.js'),
  's04-ja': require('../data/docs/chapter-s04-ja.js'),
  's05-zh': require('../data/docs/chapter-s05-zh.js'),
  's05-en': require('../data/docs/chapter-s05-en.js'),
  's05-ja': require('../data/docs/chapter-s05-ja.js'),
  's06-zh': require('../data/docs/chapter-s06-zh.js'),
  's06-en': require('../data/docs/chapter-s06-en.js'),
  's06-ja': require('../data/docs/chapter-s06-ja.js'),
  's07-zh': require('../data/docs/chapter-s07-zh.js'),
  's07-en': require('../data/docs/chapter-s07-en.js'),
  's07-ja': require('../data/docs/chapter-s07-ja.js'),
  's08-zh': require('../data/docs/chapter-s08-zh.js'),
  's08-en': require('../data/docs/chapter-s08-en.js'),
  's08-ja': require('../data/docs/chapter-s08-ja.js'),
  's09-zh': require('../data/docs/chapter-s09-zh.js'),
  's09-en': require('../data/docs/chapter-s09-en.js'),
  's09-ja': require('../data/docs/chapter-s09-ja.js'),
  's10-zh': require('../data/docs/chapter-s10-zh.js'),
  's10-en': require('../data/docs/chapter-s10-en.js'),
  's10-ja': require('../data/docs/chapter-s10-ja.js'),
  's11-zh': require('../data/docs/chapter-s11-zh.js'),
  's11-en': require('../data/docs/chapter-s11-en.js'),
  's11-ja': require('../data/docs/chapter-s11-ja.js'),
  's12-zh': require('../data/docs/chapter-s12-zh.js'),
  's12-en': require('../data/docs/chapter-s12-en.js'),
  's12-ja': require('../data/docs/chapter-s12-ja.js'),
  's13-zh': require('../data/docs/chapter-s13-zh.js'),
  's13-en': require('../data/docs/chapter-s13-en.js'),
  's13-ja': require('../data/docs/chapter-s13-ja.js'),
  's14-zh': require('../data/docs/chapter-s14-zh.js'),
  's14-en': require('../data/docs/chapter-s14-en.js'),
  's14-ja': require('../data/docs/chapter-s14-ja.js'),
  's15-zh': require('../data/docs/chapter-s15-zh.js'),
  's15-en': require('../data/docs/chapter-s15-en.js'),
  's15-ja': require('../data/docs/chapter-s15-ja.js'),
  's16-zh': require('../data/docs/chapter-s16-zh.js'),
  's16-en': require('../data/docs/chapter-s16-en.js'),
  's16-ja': require('../data/docs/chapter-s16-ja.js'),
  's17-zh': require('../data/docs/chapter-s17-zh.js'),
  's17-en': require('../data/docs/chapter-s17-en.js'),
  's17-ja': require('../data/docs/chapter-s17-ja.js'),
  's18-zh': require('../data/docs/chapter-s18-zh.js'),
  's18-en': require('../data/docs/chapter-s18-en.js'),
  's18-ja': require('../data/docs/chapter-s18-ja.js'),
  's19-zh': require('../data/docs/chapter-s19-zh.js'),
  's19-en': require('../data/docs/chapter-s19-en.js'),
  's19-ja': require('../data/docs/chapter-s19-ja.js'),

  // ── Best Practice 章节 ──
  'bp01-zh': require('../data/docs/chapter-bp01-zh.js'),
  'bp01-en': require('../data/docs/chapter-bp01-en.js'),
  'bp01-ja': require('../data/docs/chapter-bp01-ja.js'),
  'bp02-zh': require('../data/docs/chapter-bp02-zh.js'),
  'bp02-en': require('../data/docs/chapter-bp02-en.js'),
  'bp02-ja': require('../data/docs/chapter-bp02-ja.js'),
  'bp03-zh': require('../data/docs/chapter-bp03-zh.js'),
  'bp03-en': require('../data/docs/chapter-bp03-en.js'),
  'bp03-ja': require('../data/docs/chapter-bp03-ja.js'),
  'bp04-zh': require('../data/docs/chapter-bp04-zh.js'),
  'bp04-en': require('../data/docs/chapter-bp04-en.js'),
  'bp04-ja': require('../data/docs/chapter-bp04-ja.js'),
  'bp05-zh': require('../data/docs/chapter-bp05-zh.js'),
  'bp05-en': require('../data/docs/chapter-bp05-en.js'),
  'bp05-ja': require('../data/docs/chapter-bp05-ja.js'),
  'bp06-zh': require('../data/docs/chapter-bp06-zh.js'),
  'bp06-en': require('../data/docs/chapter-bp06-en.js'),
  'bp06-ja': require('../data/docs/chapter-bp06-ja.js'),
  'bp07-zh': require('../data/docs/chapter-bp07-zh.js'),
  'bp07-en': require('../data/docs/chapter-bp07-en.js'),
  'bp07-ja': require('../data/docs/chapter-bp07-ja.js'),
};

/**
 * 加载章节文档，自动 fallback 到 zh
 * @param {string} id   - 章节 ID，如 's01'
 * @param {string} locale - 'zh' | 'en' | 'ja'
 * @returns {object|null}
 */
function loadChapterDoc(id, locale) {
  return DOCS[id + '-' + locale] || DOCS[id + '-zh'] || null;
}

module.exports = { loadChapterDoc };
