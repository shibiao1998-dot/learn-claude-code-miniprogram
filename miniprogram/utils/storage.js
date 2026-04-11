// utils/storage.js
const KEYS = {
  LOCALE: 'app_locale',
  PROGRESS: 'chapter_progress',
  SCROLL_POS: 'scroll_positions',
};

function getLocale() {
  return wx.getStorageSync(KEYS.LOCALE) || null;
}

function setLocale(locale) {
  wx.setStorageSync(KEYS.LOCALE, locale);
}

function getProgress() {
  return wx.getStorageSync(KEYS.PROGRESS) || {};
}

function setChapterRead(chapterId) {
  const progress = getProgress();
  progress[chapterId] = { readAt: Date.now() };
  wx.setStorageSync(KEYS.PROGRESS, progress);
}

function isChapterRead(chapterId) {
  const progress = getProgress();
  return !!progress[chapterId];
}

function getScrollPos(pageKey) {
  const all = wx.getStorageSync(KEYS.SCROLL_POS) || {};
  return all[pageKey] || 0;
}

function setScrollPos(pageKey, pos) {
  const all = wx.getStorageSync(KEYS.SCROLL_POS) || {};
  all[pageKey] = pos;
  wx.setStorageSync(KEYS.SCROLL_POS, all);
}

module.exports = { getLocale, setLocale, getProgress, setChapterRead, isChapterRead, getScrollPos, setScrollPos };
