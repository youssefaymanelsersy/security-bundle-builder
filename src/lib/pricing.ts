import type { BundleSelection } from '../types/bundle';
import type { Product } from '../types/product';

export interface PricingTotals {
  subtotal: number;
  compareAtTotal: number;
  savings: number;
  shipping: number;
  financingAmount: number;
  finalTotal: number;
}

export const calculateSubtotal = (selections: BundleSelection[], products: Product[]): number => {
  return selections.reduce((total, selection) => {
    const product = products.find((p) => p.id === selection.productId);
    if (!product) return total;
    return total + (product.price * selection.quantity);
  }, 0);
};

export const calculateCompareAtTotal = (selections: BundleSelection[], products: Product[]): number => {
  return selections.reduce((total, selection) => {
    const product = products.find((p) => p.id === selection.productId);
    if (!product) return total;
    // Fall back to regular price if no comparePrice is set, to keep math accurate
    const comparePrice = (product.comparePrice && product.comparePrice > product.price)
      ? product.comparePrice 
      : product.price;
    return total + (comparePrice * selection.quantity);
  }, 0);
};

export const calculateSavings = (selections: BundleSelection[], products: Product[]): number => {
  const compareAtTotal = calculateCompareAtTotal(selections, products);
  const subtotal = calculateSubtotal(selections, products);
  return Math.max(0, compareAtTotal - subtotal);
};

export const calculateShipping = (subtotal: number): number => {
  // Simple logic: free shipping over $100, otherwise $15 flat rate
  if (subtotal === 0) return 0;
  return subtotal >= 100 ? 0 : 15;
};

export const calculateFinancingAmount = (finalTotal: number, termMonths: number = 24): number => {
  if (finalTotal === 0) return 0;
  // Simple 0% APR calculation
  return finalTotal / termMonths;
};

export const calculateTotals = (selections: BundleSelection[], products: Product[]): PricingTotals => {
  const subtotal = calculateSubtotal(selections, products);
  const compareAtTotal = calculateCompareAtTotal(selections, products);
  const savings = Math.max(0, compareAtTotal - subtotal);
  const shipping = calculateShipping(subtotal);
  const finalTotal = subtotal + shipping;
  const financingAmount = calculateFinancingAmount(finalTotal, 24);

  return {
    subtotal,
    compareAtTotal,
    savings,
    shipping,
    financingAmount,
    finalTotal
  };
};
