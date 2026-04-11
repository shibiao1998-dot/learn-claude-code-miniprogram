// utils/progress.js
const storage = require('./storage');

function markRead(chapterId) {
  storage.setChapterRead(chapterId);
}

function isRead(chapterId) {
  return storage.isChapterRead(chapterId);
}

function getReadCount(chapterIds) {
  return chapterIds.filter(id => isRead(id)).length;
}

module.exports = { markRead, isRead, getReadCount };
