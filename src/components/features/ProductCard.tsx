import { memo, useCallback } from 'react';
import type { Product } from '../../types/product';
import { QuantityStepper } from '../ui/QuantityStepper';
import { VariantSelector } from '../ui/VariantSelector';
import { useBundleStore } from '../../store/useBundleStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const activeVariantId = useBundleStore(state => state.activeVariants[product.id] || product.variants?.[0]?.id);
  
  const quantity = useBundleStore(state => {
    const currentSelection = state.selections.find(
      (s) => s.productId === product.id && s.variantId === activeVariantId
    );
    return currentSelection?.quantity || 0;
  });

  const increaseQuantity = useBundleStore(state => state.increaseQuantity);
  const decreaseQuantity = useBundleStore(state => state.decreaseQuantity);
  const selectVariant = useBundleStore(state => state.selectVariant);

  const handleIncrease = useCallback(() => increaseQuantity(product.id, activeVariantId), [increaseQuantity, product.id, activeVariantId]);
  const handleDecrease = useCallback(() => decreaseQuantity(product.id, activeVariantId), [decreaseQuantity, product.id, activeVariantId]);
  const handleSelectVariant = useCallback((variantId: string) => selectVariant(product.id, variantId), [selectVariant, product.id]);

  return (
    <div className={`flex flex-col rounded-[5px] border-[1.5px] overflow-hidden transition-all duration-200 ${
      quantity > 0 ? 'border-[#4E2FD2] bg-[#E7EFFD]' : 'border-[#CED6DE] bg-[#FFFFFF]'
    }`}>
      <div className="relative aspect-[4/3] bg-[#FFFFFF] flex items-center justify-center overflow-hidden">
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#4E2FD2] text-[#FFFFFF] text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-[4px]">
            {product.badge}
          </span>
        )}
        <img src={product.image} alt={product.title} loading="lazy" className="w-full h-full object-cover p-4" />
      </div>
      
      <div className="p-[20px] flex flex-col flex-grow bg-transparent">
        <h3 className="font-['Gilroy-SemiBold'] text-[#0B0D10] leading-[100%] mb-[8px] text-[18px]">{product.title}</h3>
        
        <p className="text-[14px] leading-[16px] text-[#6F7882] font-['Gilroy-Medium'] mb-[20px] flex-grow">
          {product.description}
          {product.learnMoreUrl && (
            <a href={product.learnMoreUrl} className="text-[#484848] font-['Gilroy-RegularItalic'] italic underline ml-1 hover:text-[#0B0D10]">Learn More</a>
          )}
        </p>
        
        <div className="mt-auto space-y-4">
          {product.variants && product.variants.length > 0 && activeVariantId && (
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-600 font-medium">Color</span>
              <VariantSelector 
                variants={product.variants} 
                selectedVariantId={activeVariantId} 
                onSelect={handleSelectVariant} 
              />
            </div>
          )}
          
          <div className="flex items-center justify-between pt-[16px] mt-auto">
             <QuantityStepper 
               quantity={quantity} 
               onIncrease={handleIncrease} 
               onDecrease={handleDecrease} 
             />
            
            <div className="flex flex-col items-end justify-center h-[32px]">
              {product.comparePrice && (
                <span className="text-[12px] text-[#6F7882] font-['Gilroy-Medium'] line-through">${product.comparePrice}</span>
              )}
              <span className="text-[12px] font-['Gilroy-SemiBold'] text-[#4E2FD2]">${product.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
