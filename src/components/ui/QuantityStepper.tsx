import { memo } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export const QuantityStepper = memo(function QuantityStepper({ quantity, onIncrease, onDecrease, className }: QuantityStepperProps) {
  return (
    <div className={cn("flex items-center space-x-[10px]", className)}>
      <button
        onClick={onDecrease}
        disabled={quantity === 0}
        className="w-[20px] h-[20px] flex items-center justify-center rounded-[4px] bg-[#F1F1F2] border-[1px] border-[#CED6DE] hover:bg-[#E2E8F0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-[10px] h-[10px] text-[#575757]" strokeWidth={3} />
      </button>
      <span className="w-[12px] text-center text-[14px] leading-[16px] font-['Gilroy-SemiBold'] text-[#0B0D10]" aria-live="polite">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-[20px] h-[20px] flex items-center justify-center rounded-[4px] bg-[#FFFFFF] border-[1px] border-[#CED6DE] hover:bg-[#F0F4F7] transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-[10px] h-[10px] text-[#575757]" strokeWidth={3} />
      </button>
    </div>
  );
});
