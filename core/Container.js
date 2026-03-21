/**
 * Lightweight Dependency Injection (DI) Container
 * Allows dependencies to be shared between components.
 */

class Container {
  constructor() {
    /**
     * Stores registration metadata keyed by service name.
     * Shape: Map<string, { implementation: Function, options: object }>
     */
    this._registrations = new Map();

    /**
     * Caches singleton instances keyed by service name.
     * Shape: Map<string, object>
     */
    this._instances = new Map();
  }
}
