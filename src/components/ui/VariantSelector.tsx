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
              "flex items-center space-x-2 px-[12px] py-[6px] rounded-full border-[1px] text-[14px] font-['Gilroy-Medium'] transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#4E2FD2]",
              isSelected 
                ? "border-[#4E2FD2] bg-[#EDF4FF] text-[#4E2FD2]" 
                : "border-[#CED6DE] bg-[#FFFFFF] text-[#0B0D10] hover:border-[#6F7882] hover:bg-[#F0F4F7]"
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
