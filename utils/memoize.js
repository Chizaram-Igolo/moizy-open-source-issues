'use strict';

/**
 * Creates a memoized version of a function
 * @param {Function} func - The function to memoize
 * @returns {Function} - New function that caches results based on arguments
 */

export function memoize(func) {
  // Ensure a valid function is provided
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  // Cache store using Map for reliable key-value storage
  const cache = new Map();

  // Return a wrapper function
  return function (...args) {
    /**
     * Generate a unique key from arguments
     * JSON.stringify works well for primitive and serializable values
     */
    const key = JSON.stringify(args);

    // If result already exists in cache, return it
    if (cache.has(key)) {
      return cache.get(key);
    }

    /**
     * Execute original function
     * apply() preserves the original `this` context
     */
    const result = func.apply(this, args);

    // Store result in cache
    cache.set(key, result);

    return result;
  };
}
