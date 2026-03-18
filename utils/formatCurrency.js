/**
 * Formats currencies
 *
 * TODO: Add documentation
 */

export function formatCurrency(amount, config = {}) {
  const { currency, decimals } = config;

  // TODO: Complete implementation and make function robust.

  return new Intl.NumberFormat("en-US", {
    currency,
  }).format(amount);
}
