export class EventEmitter {
  constructor() {
    this.callbacks = {};
  }

  on(name, callback) {
    // Errors
    if (typeof name !== "string" || name === "") {
      console.warn("wrong event name");

      return false;
    }

    if (typeof callback !== "function") {
      console.warn("wrong event callback");

      return false;
    }

    this.callbacks[name] = callback;
  }

  off(name) {
    // Errors
    if (typeof name !== "string" || name === "") {
      console.warn("wrong event name");

      return false;
    }

    delete this.callbacks[name];
  }

  trigger(name, args) {
    // Errors
    if (typeof name !== "string" || name === "") {
      console.warn("wrong event name");

      return false;
    }

    const checkedArgs = !(args instanceof Array) ? [] : args;

    const callback = this.callbacks[name];
    return callback.apply(this, checkedArgs);
  }
}
