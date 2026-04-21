// utils/game-save.js
var SAVE_KEY = 'game_save';

function _defaultSave() {
  return {
    level: 1,
    exp: 0,
    streak: { current: 0, best: 0, lastDate: null, shields: 0 },
    stages: {},
    cards: {},
    achievements: [],
    review: [],
    dailyChallenge: { date: null, completed: false, score: 0 }
  };
}

function load() {
  var save = wx.getStorageSync(SAVE_KEY);
  if (!save) {
    save = _defaultSave();
    wx.setStorageSync(SAVE_KEY, save);
  }
  return save;
}

function save(data) {
  wx.setStorageSync(SAVE_KEY, data);
}

function reset() {
  var fresh = _defaultSave();
  wx.setStorageSync(SAVE_KEY, fresh);
  return fresh;
}

function update(patchFn) {
  var data = load();
  patchFn(data);
  save(data);
  return data;
}

// --- Exp & Level ---
var LEVEL_THRESHOLDS = [
  { level: 1, exp: 0, title: 'guest' },
  { level: 2, exp: 80, title: 'guest' },
  { level: 3, exp: 200, title: 'user' },
  { level: 4, exp: 350, title: 'user' },
  { level: 5, exp: 500, title: 'dev' },
  { level: 6, exp: 700, title: 'dev' },
  { level: 7, exp: 950, title: 'dev' },
  { level: 8, exp: 1200, title: 'admin' },
  { level: 9, exp: 1600, title: 'admin' },
  { level: 10, exp: 2000, title: 'root' }
];

function addExp(amount) {
  return update(function(data) {
    data.exp += amount;
    var newLevel = 1;
    for (var i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (data.exp >= LEVEL_THRESHOLDS[i].exp) {
        newLevel = LEVEL_THRESHOLDS[i].level;
        break;
      }
    }
    data.level = newLevel;
  });
}

function getLevelInfo() {
  var data = load();
  var current = LEVEL_THRESHOLDS[0];
  var next = LEVEL_THRESHOLDS[1];
  for (var i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (data.exp >= LEVEL_THRESHOLDS[i].exp) {
      current = LEVEL_THRESHOLDS[i];
      next = LEVEL_THRESHOLDS[i + 1] || null;
      break;
    }
  }
  return {
    level: current.level,
    title: current.title,
    exp: data.exp,
    nextLevelExp: next ? next.exp : null,
    progress: next ? (data.exp - current.exp) / (next.exp - current.exp) : 1
  };
}

// --- Date helpers ---
function _today() {
  var d = new Date();
  var y = d.getFullYear();
  var m = String(d.getMonth() + 1);
  if (m.length < 2) m = '0' + m;
  var day = String(d.getDate());
  if (day.length < 2) day = '0' + day;
  return y + '-' + m + '-' + day;
}

function _daysBetween(dateStr1, dateStr2) {
  if (!dateStr1 || !dateStr2) return Infinity;
  var d1 = new Date(dateStr1 + 'T00:00:00');
  var d2 = new Date(dateStr2 + 'T00:00:00');
  return Math.round(Math.abs(d2 - d1) / 86400000);
}

module.exports = {
  load: load,
  save: save,
  reset: reset,
  update: update,
  addExp: addExp,
  getLevelInfo: getLevelInfo,
  LEVEL_THRESHOLDS: LEVEL_THRESHOLDS,
  _today: _today,
  _daysBetween: _daysBetween
};
