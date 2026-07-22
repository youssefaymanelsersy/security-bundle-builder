import { memo } from 'react';
import type { ProductVariant } from '../../types/product';
import { cn } from '../../lib/utils';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variantId: string) => void;
  className?: string;
}

export const VariantSelector = memo(function VariantSelector({ variants, selectedVariantId, onSelect, className }: VariantSelectorProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {variants.map((variant) => {
        const isSelected = selectedVariantId === variant.id;
        return (
          <button
            key={variant.id}
            onClick={() => onSelect(variant.id)}
            className={cn(
              "flex items-center space-x-2 px-3 py-1.5 rounded-full border text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-indigo-600",
              isSelected 
                ? "border-indigo-600 bg-indigo-50 text-indigo-700" 
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            )}
            title={variant.name}
            aria-label={`Select ${variant.name}`}
            aria-pressed={isSelected}
          >
            {variant.image ? (
              <img src={variant.image} alt={variant.name} className="w-5 h-5 rounded-sm object-cover" />
            ) : variant.color ? (
              <span className="w-4 h-4 rounded-full shadow-sm border border-black/10" style={{ backgroundColor: variant.color }} />
            ) : null}
            <span>{variant.name}</span>
          </button>
        );
      })}
    </div>
  );
});
