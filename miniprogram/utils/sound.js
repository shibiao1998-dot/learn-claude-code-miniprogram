// utils/sound.js
var SOUND_KEY = 'sound_enabled';

var _contexts = {};
var _enabled = null;

var SOUNDS = {
  correct: '/assets/sounds/correct.ogg',
  wrong: '/assets/sounds/wrong.ogg',
  star: '/assets/sounds/star.ogg',
  levelup: '/assets/sounds/levelup.ogg',
  card: '/assets/sounds/card.ogg'
};

function isEnabled() {
  if (_enabled === null) {
    _enabled = wx.getStorageSync(SOUND_KEY);
    if (_enabled === '' || _enabled === undefined) {
      _enabled = true;
      wx.setStorageSync(SOUND_KEY, true);
    }
  }
  return _enabled;
}

function setEnabled(on) {
  _enabled = !!on;
  wx.setStorageSync(SOUND_KEY, _enabled);
}

function play(name) {
  if (!isEnabled()) return;
  var src = SOUNDS[name];
  if (!src) return;

  if (!_contexts[name]) {
    _contexts[name] = wx.createInnerAudioContext();
    _contexts[name].src = src;
  }

  var ctx = _contexts[name];
  ctx.stop();
  ctx.seek(0);
  ctx.play();
}

module.exports = {
  play: play,
  isEnabled: isEnabled,
  setEnabled: setEnabled
};
