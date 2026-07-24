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
    <div className="flex items-center py-[15px] border-b-[1px] border-[#CED6DE] last:border-0">
      {imageUrl && (
        <div className="w-[41px] h-[41px] rounded-[5px] bg-[#FFFFFF] flex items-center justify-center overflow-hidden flex-shrink-0 mr-[12px]">
          <img src={imageUrl} alt={name} loading="lazy" className="w-full h-full object-cover p-1" />
        </div>
      )}
      <div className="flex-grow min-w-0 pr-4">
        <h4 className="text-[12px] leading-[133%] font-['Gilroy-Medium'] text-[#0B0D10] truncate tracking-[0.005em]">{name}</h4>
      </div>
      <div className="flex items-center space-x-[16px]">
        <QuantityStepper 
          quantity={quantity} 
          onIncrease={onIncrease} 
          onDecrease={onDecrease} 
        />
        <div className="text-right flex flex-col justify-center min-w-[50px]">
          {lineComparePrice && lineComparePrice > linePrice && (
            <span className="text-[12px] leading-[133%] font-['Gilroy-Medium'] text-[#6F7882] line-through tracking-[0.005em]">${lineComparePrice.toFixed(2)}</span>
          )}
          <span className="text-[12px] leading-[133%] font-['Gilroy-SemiBold'] text-[#4E2FD2] tracking-[0.005em]">${linePrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
});
