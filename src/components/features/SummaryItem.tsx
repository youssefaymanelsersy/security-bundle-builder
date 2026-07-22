import { memo } from 'react';
import { QuantityStepper } from '../ui/QuantityStepper';

interface SummaryItemProps {
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  comparePrice?: number;
}

export const SummaryItem = memo(function SummaryItem({ name, price, quantity, imageUrl, comparePrice, onIncrease, onDecrease }: SummaryItemProps) {
  const linePrice = price * quantity;
  const lineComparePrice = comparePrice ? comparePrice * quantity : undefined;
  
  return (
    <div className="flex items-center py-3 border-b border-gray-100 last:border-0">
      {imageUrl && (
        <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0 mr-3">
          <img src={imageUrl} alt={name} loading="lazy" className="w-full h-full object-cover mix-blend-multiply p-1" />
        </div>
      )}
      <div className="flex-grow min-w-0 pr-4">
        <h4 className="text-sm font-medium text-gray-900 truncate">{name}</h4>
      </div>
      <div className="flex items-center space-x-4">
        <QuantityStepper 
          quantity={quantity} 
          onIncrease={onIncrease} 
          onDecrease={onDecrease} 
          className="scale-90 origin-right"
        />
        <div className="text-right flex flex-col min-w-[60px]">
          {lineComparePrice && lineComparePrice > linePrice && (
            <span className="text-xs text-gray-400 line-through">${lineComparePrice.toFixed(2)}</span>
          )}
          <span className="text-sm font-bold text-indigo-700">${linePrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
});
