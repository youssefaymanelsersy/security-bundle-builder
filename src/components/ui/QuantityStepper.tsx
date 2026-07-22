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
    <div className={cn("flex items-center space-x-3", className)}>
      <button
        onClick={onDecrease}
        disabled={quantity === 0}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4 text-gray-700" />
      </button>
      <span className="w-4 text-center font-medium text-gray-900" aria-live="polite">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4 text-gray-700" />
      </button>
    </div>
  );
});
