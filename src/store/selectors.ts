import type { BundleState } from './useBundleStore';
import type { Product } from '../types/product';
import { calculateTotals, type PricingTotals } from '../lib/pricing';
import type { BundleSelection } from '../types/bundle';
import type { ProductVariant } from '../types/product';

export const getPricingTotals = (state: BundleState, products: Product[]): PricingTotals => {
  return calculateTotals(state.selections, products);
};

export interface SelectedProduct extends BundleSelection {
  product: Product;
}

export const getSelectedProducts = (state: BundleState, products: Product[]): SelectedProduct[] => {
  return state.selections.map(selection => {
    const product = products.find(p => p.id === selection.productId);
    return { ...selection, product: product! };
  }).filter(s => s.product !== undefined);
};

export interface ReviewItem extends BundleSelection {
  product: Product;
  variant: ProductVariant | undefined;
  title: string;
}

export const getReviewItems = (state: BundleState, products: Product[]): ReviewItem[] => {
  return state.selections
    .filter(s => s.quantity > 0)
    .map(selection => {
      const product = products.find(p => p.id === selection.productId);
      const variant = product?.variants?.find(v => v.id === selection.variantId);
      
      return {
        ...selection,
        product: product!,
        variant,
        title: variant ? `${product?.title} - ${variant.name}` : product?.title || 'Unknown Item',
      };
    })
    .filter(item => item.product !== undefined);
};

export const getCategoryCounts = (state: BundleState, products: Product[]): Record<string, number> => {
  const selectedProductIdsByCategory: Record<string, Set<string>> = {};
  
  state.selections.forEach(selection => {
    if (selection.quantity > 0) {
      const product = products.find(p => p.id === selection.productId);
      if (product) {
        if (!selectedProductIdsByCategory[product.category]) {
          selectedProductIdsByCategory[product.category] = new Set();
        }
        selectedProductIdsByCategory[product.category].add(product.id);
      }
    }
  });

  const counts: Record<string, number> = {};
  Object.keys(selectedProductIdsByCategory).forEach(category => {
    counts[category] = selectedProductIdsByCategory[category].size;
  });
  
  return counts;
};
