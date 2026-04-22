// utils/game-review.js
var gameSave = require('./game-save');

var INTERVALS = [1, 2, 4];
var DAY_MS = 86400000;

function addToReview(questionId, stageId) {
  gameSave.update(function(data) {
    if (!Array.isArray(data.review)) data.review = [];
    for (var i = 0; i < data.review.length; i++) {
      if (data.review[i].questionId === questionId) return;
    }
    var now = Date.now();
    data.review.push({
      questionId: questionId,
      stageId: stageId,
      addedAt: now,
      nextReviewAt: now + DAY_MS,
      reviewCount: 0,
      lastCorrect: false
    });
  });
}

function getReviewQueue() {
  var data = gameSave.load();
  if (!Array.isArray(data.review)) return [];
  var now = Date.now();
  return data.review.filter(function(item) {
    return typeof item === 'object' && item.nextReviewAt <= now;
  });
}

function completeReview(questionId, correct) {
  gameSave.update(function(data) {
    if (!Array.isArray(data.review)) return;
    for (var i = 0; i < data.review.length; i++) {
      var item = data.review[i];
      if (item.questionId === questionId) {
        if (correct) {
          item.reviewCount++;
          item.lastCorrect = true;
          if (item.reviewCount >= INTERVALS.length) {
            data.review.splice(i, 1);
          } else {
            item.nextReviewAt = Date.now() + INTERVALS[item.reviewCount] * DAY_MS;
          }
        } else {
          item.reviewCount = 0;
          item.lastCorrect = false;
          item.nextReviewAt = Date.now() + INTERVALS[0] * DAY_MS;
        }
        return;
      }
    }
  });
}

function getReviewStats() {
  var data = gameSave.load();
  if (!Array.isArray(data.review)) return { total: 0, pending: 0 };
  var now = Date.now();
  var pending = 0;
  var items = data.review;
  for (var i = 0; i < items.length; i++) {
    if (typeof items[i] === 'object' && items[i].nextReviewAt <= now) {
      pending++;
    }
  }
  return { total: items.length, pending: pending };
}

function removeFromReview(questionId) {
  gameSave.update(function(data) {
    if (!Array.isArray(data.review)) return;
    for (var i = 0; i < data.review.length; i++) {
      if (data.review[i].questionId === questionId) {
        data.review.splice(i, 1);
        return;
      }
    }
  });
}

module.exports = {
  addToReview: addToReview,
  getReviewQueue: getReviewQueue,
  completeReview: completeReview,
  getReviewStats: getReviewStats,
  removeFromReview: removeFromReview
};
