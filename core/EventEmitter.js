/**
 * Lightweight EventEmitter (Publish / Subscribe Pattern)
 * Allows decoupled communication between modules.
 */

class EventEmitter {
  constructor() {
    /**
     * Stores events and their listeners
     * {
     *   eventName: [listener1, listener2]
     * }
     */
    this.events = {};

    /**
     * Stores global middleware functions applied to every event
     * [fn1, fn2, ...]
     */
    this.middlewares = [];
  }

  /**
   * Register an event listener
   * @param {string} event
   * @param {Function} listener
   */
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  /**
   * Remove a specific listener
   * Safely handles non-existing listeners
   */
  off(event, listener) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(
      (l) => l !== listener
    );

    // cleanup empty events (prevents memory leaks)
    if (this.events[event].length === 0) {
      delete this.events[event];
    }
  }

  /**
   * Emit an event with arguments.
   * Runs any registered middleware chain first, then dispatches to listeners.
   */
  emit(event, ...args) {
    const listeners = this.events[event];

    if (!this.middlewares.length && !listeners) return;

    let currentArgs = args;

    for (const middleware of this.middlewares) {
      let called = false;
      middleware(event, currentArgs, (newArgs) => {
        called = true;
        currentArgs = newArgs ?? currentArgs;
      });
      if (!called) return;
    }

    if (listeners) {
      listeners.forEach((listener) => listener(...currentArgs));
    }
  }

  /**
   * Register listener that runs only once
   */
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };

    this.on(event, wrapper);
  }

  /**
   * Register a global middleware function applied to every emitted event.
   * Middleware runs before listeners when the event is emitted.
   *
   * @param {Function} fn - Called as fn(eventName, args, next)
   *   - eventName {string}   the name of the emitted event
   *   - args      {Array}    current argument list
   *   - next      {Function} call next(newArgs?) to continue; omit to stop propagation
   * @returns {Function} unsubscribe — call it to remove this middleware and avoid memory leaks
   */
  use(fn) {
    this.middlewares.push(fn);
    return () => {
      this.middlewares = this.middlewares.filter((m) => m !== fn);
    };
  }
}

module.exports = EventEmitter;