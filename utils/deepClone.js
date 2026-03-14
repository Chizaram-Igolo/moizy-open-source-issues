/**
 * Deep clone an object or array.
 * @param {Object|Array} obj - The object or array to clone.
 * @returns {Object|Array} - A deep clone of the input.
 * 
 * It takes in an object or array and returns a new object or 
 * array with the same structure and values but different references in memory.
 */

export function deepClone(value) {
    if (value === null || typeof value !== 'object') {
        return value;
    }

    if (Array.isArray(value)) {
        const arr = [];
        for (let i = 0; i < value.length; i++) {
            // Copy each array item one by one in recursive calls.
            arr[i] = deepClone(value[i]);
        }
        return arr;
    }


    // TODO Handle Object Cloning
}