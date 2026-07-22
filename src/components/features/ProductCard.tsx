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
    <div className={`flex flex-col rounded-xl border shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md ${
      quantity > 0 ? 'border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50/10' : 'border-gray-200 bg-white'
    }`}>
      <div className="relative aspect-[4/3] bg-gray-50 flex items-center justify-center overflow-hidden">
        {product.badge && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}
        <img src={product.image} alt={product.title} loading="lazy" className="w-full h-full object-cover mix-blend-multiply p-4" />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 leading-tight mb-2 text-base">{product.title}</h3>
        
        <p className="text-sm text-gray-500 mb-5 flex-grow">
          {product.description}
          {product.learnMoreUrl && (
            <a href={product.learnMoreUrl} className="text-indigo-600 hover:underline ml-1 font-medium">Learn More</a>
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
          
          <div className="flex items-center justify-between pt-4 mt-auto">
             <QuantityStepper 
               quantity={quantity} 
               onIncrease={handleIncrease} 
               onDecrease={handleDecrease} 
             />
            
            <div className="text-right flex items-center space-x-2">
              {product.comparePrice && (
                <span className="text-sm text-red-500 font-medium line-through">${product.comparePrice}</span>
              )}
              <span className="text-base font-bold text-gray-900">${product.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
