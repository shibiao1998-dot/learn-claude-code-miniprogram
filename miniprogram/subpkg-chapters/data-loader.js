// subpkg-chapters/data-loader.js
// 静态映射所有章节文档，绕过微信小程序不支持动态 require 的限制
// 路径相对于本文件所在目录（subpkg-chapters/）

const DOCS = {
  's01-zh': require('../data/docs/chapter-s01-zh.json'),
  's01-en': require('../data/docs/chapter-s01-en.json'),
  's01-ja': require('../data/docs/chapter-s01-ja.json'),
  's02-zh': require('../data/docs/chapter-s02-zh.json'),
  's02-en': require('../data/docs/chapter-s02-en.json'),
  's02-ja': require('../data/docs/chapter-s02-ja.json'),
  's03-zh': require('../data/docs/chapter-s03-zh.json'),
  's03-en': require('../data/docs/chapter-s03-en.json'),
  's03-ja': require('../data/docs/chapter-s03-ja.json'),
  's04-zh': require('../data/docs/chapter-s04-zh.json'),
  's04-en': require('../data/docs/chapter-s04-en.json'),
  's04-ja': require('../data/docs/chapter-s04-ja.json'),
  's05-zh': require('../data/docs/chapter-s05-zh.json'),
  's05-en': require('../data/docs/chapter-s05-en.json'),
  's05-ja': require('../data/docs/chapter-s05-ja.json'),
  's06-zh': require('../data/docs/chapter-s06-zh.json'),
  's06-en': require('../data/docs/chapter-s06-en.json'),
  's06-ja': require('../data/docs/chapter-s06-ja.json'),
  's07-zh': require('../data/docs/chapter-s07-zh.json'),
  's07-en': require('../data/docs/chapter-s07-en.json'),
  's07-ja': require('../data/docs/chapter-s07-ja.json'),
  's08-zh': require('../data/docs/chapter-s08-zh.json'),
  's08-en': require('../data/docs/chapter-s08-en.json'),
  's08-ja': require('../data/docs/chapter-s08-ja.json'),
  's09-zh': require('../data/docs/chapter-s09-zh.json'),
  's09-en': require('../data/docs/chapter-s09-en.json'),
  's09-ja': require('../data/docs/chapter-s09-ja.json'),
  's10-zh': require('../data/docs/chapter-s10-zh.json'),
  's10-en': require('../data/docs/chapter-s10-en.json'),
  's10-ja': require('../data/docs/chapter-s10-ja.json'),
  's11-zh': require('../data/docs/chapter-s11-zh.json'),
  's11-en': require('../data/docs/chapter-s11-en.json'),
  's11-ja': require('../data/docs/chapter-s11-ja.json'),
  's12-zh': require('../data/docs/chapter-s12-zh.json'),
  's12-en': require('../data/docs/chapter-s12-en.json'),
  's12-ja': require('../data/docs/chapter-s12-ja.json'),
  's13-zh': require('../data/docs/chapter-s13-zh.json'),
  's13-en': require('../data/docs/chapter-s13-en.json'),
  's13-ja': require('../data/docs/chapter-s13-ja.json'),
  's14-zh': require('../data/docs/chapter-s14-zh.json'),
  's14-en': require('../data/docs/chapter-s14-en.json'),
  's14-ja': require('../data/docs/chapter-s14-ja.json'),
  's15-zh': require('../data/docs/chapter-s15-zh.json'),
  's15-en': require('../data/docs/chapter-s15-en.json'),
  's15-ja': require('../data/docs/chapter-s15-ja.json'),
  's16-zh': require('../data/docs/chapter-s16-zh.json'),
  's16-en': require('../data/docs/chapter-s16-en.json'),
  's16-ja': require('../data/docs/chapter-s16-ja.json'),
  's17-zh': require('../data/docs/chapter-s17-zh.json'),
  's17-en': require('../data/docs/chapter-s17-en.json'),
  's17-ja': require('../data/docs/chapter-s17-ja.json'),
  's18-zh': require('../data/docs/chapter-s18-zh.json'),
  's18-en': require('../data/docs/chapter-s18-en.json'),
  's18-ja': require('../data/docs/chapter-s18-ja.json'),
  's19-zh': require('../data/docs/chapter-s19-zh.json'),
  's19-en': require('../data/docs/chapter-s19-en.json'),
  's19-ja': require('../data/docs/chapter-s19-ja.json'),
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
