/**
 * A simple testing utility for running test cases and asserting conditions.
 *
 * Provides functions to define tests, make assertions, and print a summary of results.
 *
 * Usage:
 * import { test, assertEquals, printSummary } from "./test-utils.js";
 *
 * test("example test", () => {
 *     assertEquals(1 + 1, 2);
 * });
 *
 * printSummary();
 */

let passed = 0;
let failed = 0;

export const test = (name, fn) => {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✘  ${name}`);
    console.error(`       ${err.message}`);
    failed++;
  }
};

export const assert = (condition, message) => {
  if (!condition) throw new Error(message || "Assertion failed");
};

export const assertEquals = (actual, expected, label = "") => {
  if (actual !== expected) {
    throw new Error(
      `${label ? label + ": " : ""}expected ${JSON.stringify(expected)}, ` +
        `got ${JSON.stringify(actual)}`,
    );
  }
};

export const assertErrorExists = (errors, field, partialMessage) => {
  const match = errors.find(
    (err) =>
      err.field === field && err.message.includes(partialMessage.toLowerCase()),
  );
  if (!match) {
    throw new Error(
      `Expected an error for field "${field}" containing "${partialMessage}". ` +
        `Got: ${JSON.stringify(errors)}`,
    );
  }
};

export const assertThrows = (fn, partialMessage = "") => {
  try {
    fn();
    throw new Error("Expected function to throw, but it did not");
  } catch (err) {
    if (err.message === "Expected function to throw, but it did not") throw err;
    if (partialMessage && !err.message.includes(partialMessage)) {
      throw new Error(
        `Expected error message to include "${partialMessage}", got "${err.message}"`,
      );
    }
  }
};

export const printSummary = () => {
  console.log("\n" + "─".repeat(50));
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log("─".repeat(50));
  if (failed > 0) process.exit(1);
};
