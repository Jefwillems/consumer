export default new class Events {
  constructor() {
    this._queue = Object.create(null);
  }

  on(type, handler) {
    if (!this._queue[type]) {
      this._queue[type] = { once: [], always: [], };
    }
    this._queue[type].always.push(handler);
  }

  once(type, handler) {
    if (!this._queue[type]) {
      this._queue[type] = { once: [], always: [], };
    }
    this._queue[type].once.push(handler);
  }

  emit(type, data) {
    if (this._queue[type] && this._queue[type].once) {
      this._queue[type].once.forEach(cb => cb(data));
      this._queue[type].once = [];
    }
    if (this._queue[type] && this._queue[type].always) {
      this._queue[type].always.forEach(cb => cb(data));
    }
  }
}();
export * from './types';
