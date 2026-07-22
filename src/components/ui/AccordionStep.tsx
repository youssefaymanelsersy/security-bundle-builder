import { memo } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface AccordionStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  icon?: ReactNode;
  selectedCount: number;
  isOpen: boolean;
  onToggle: () => void;
  onNext?: () => void;
  nextStepTitle?: string;
  children: ReactNode;
}

export const AccordionStep = memo(function AccordionStep({
  stepNumber,
  totalSteps,
  title,
  icon,
  selectedCount,
  isOpen,
  onToggle,
  onNext,
  nextStepTitle,
  children
}: AccordionStepProps) {
  const contentId = `step-${stepNumber}-content`;
  return (
    <div className="mb-6">
      <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2 ml-1">
        Step {stepNumber} of {totalSteps}
      </div>
      <div className={cn(
        "border rounded-xl bg-white overflow-hidden transition-all duration-300",
        isOpen ? "border-indigo-600 shadow-sm ring-1 ring-indigo-600" : "border-gray-200 shadow-sm"
      )}>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600"
        >
          <div className="flex items-center space-x-3">
            <div className={cn(
              "flex items-center justify-center transition-colors",
              isOpen ? "text-indigo-600" : "text-gray-400"
            )}>
              {icon}
            </div>
            <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            {selectedCount > 0 && (
              <span className="text-sm font-medium text-indigo-600">
                {selectedCount} selected
              </span>
            )}
            <ChevronDown className={cn(
              "w-5 h-5 transition-transform duration-300",
              isOpen ? "transform rotate-180 text-indigo-600" : (selectedCount > 0 ? "text-indigo-600" : "text-gray-400")
            )} />
          </div>
        </button>
        
        {isOpen && (
          <div id={contentId} className="flex flex-col border-t border-gray-100 bg-indigo-50/10">
            <div className="p-6">
              {children}
            </div>
            
            {onNext && nextStepTitle && (
              <div className="p-6 border-t border-gray-100 bg-white flex justify-center">
                <button 
                  onClick={onNext}
                  className="flex items-center space-x-2 bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-2.5 rounded-full font-medium transition-colors"
                >
                  <span>Next: {nextStepTitle}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
