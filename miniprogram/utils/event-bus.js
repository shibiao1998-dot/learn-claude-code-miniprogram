// utils/event-bus.js
const _listeners = {};

function on(event, callback) {
  if (!_listeners[event]) _listeners[event] = [];
  _listeners[event].push(callback);
}

function off(event, callback) {
  if (!_listeners[event]) return;
  _listeners[event] = _listeners[event].filter(cb => cb !== callback);
}

function emit(event, data) {
  (_listeners[event] || []).forEach(cb => {
    try { cb(data); } catch (e) { console.error('[EventBus]', e); }
  });
}

module.exports = { on, off, emit };
