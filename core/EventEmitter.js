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
   * Emit an event with arguments
   */
  emit(event, ...args) {
    if (!this.events[event]) return;

    // preserve execution order
    this.events[event].forEach((listener) => {
      listener(...args);
    });
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
}

module.exports = EventEmitter;