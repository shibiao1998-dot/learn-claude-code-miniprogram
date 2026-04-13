// utils/i18n.js
const eventBus = require('./event-bus');

let _locale = 'zh';
let _messages = {};

function init(locale) {
  _locale = locale || 'zh';
  _loadMessages(_locale);
}

function _loadMessages(locale) {
  try {
    // 微信小程序不支持动态 require，使用 switch-case 静态加载
    switch (locale) {
      case 'zh': _messages = require('../i18n/zh.js'); break;
      case 'en': _messages = require('../i18n/en.js'); break;
      case 'ja': _messages = require('../i18n/ja.js'); break;
      default:   _messages = require('../i18n/zh.js'); break;
    }
  } catch (e) {
    console.warn('[i18n] Failed to load messages for locale:', locale);
    _messages = {};
  }
}

function setLocale(locale) {
  if (_locale === locale) return;
  _locale = locale;
  _loadMessages(locale);
  eventBus.emit('locale:change', locale);
}

function getLocale() {
  return _locale;
}

// t('home.hero_title') => 对应 messages.home.hero_title
function t(key, params) {
  const keys = key.split('.');
  let val = _messages;
  for (const k of keys) {
    if (val && typeof val === 'object') {
      val = val[k];
    } else {
      val = undefined;
      break;
    }
  }
  if (val === undefined) {
    return key; // fallback: 返回 key 本身
  }
  if (params && typeof val === 'string') {
    return val.replace(/\{(\w+)\}/g, (_, k) => (params[k] !== undefined ? params[k] : `{${k}}`));
  }
  return val;
}

module.exports = { init, setLocale, getLocale, t };
