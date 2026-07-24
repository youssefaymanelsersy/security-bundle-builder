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
      <div className="text-[10px] font-['Gilroy-Medium'] tracking-[1.6px] text-[#484848] uppercase mb-2 ml-1">
        Step {stepNumber} of {totalSteps}
      </div>
      <div className={cn(
        "border rounded-[5px] bg-[#FFFFFF] overflow-hidden transition-all duration-300",
        isOpen ? "border-[#4E2FD2] shadow-[0px_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-[#4E2FD2]" : "border-[#CED6DE] shadow-sm"
      )}>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
          className="w-full flex items-center justify-between px-[15px] py-[20px] bg-[#FFFFFF] hover:bg-[#F0F4F7] transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4E2FD2]"
        >
          <div className="flex items-center space-x-[8px]">
            <div className={cn(
              "flex items-center justify-center transition-colors w-[20px] h-[20px]",
              isOpen ? "text-[#4E2FD2]" : "text-[#6F7882]"
            )}>
              {icon}
            </div>
            <h2 className="text-[18px] leading-[100%] font-['Gilroy-SemiBold'] text-[#0B0D10]">{title}</h2>
          </div>
          
          <div className="flex items-center space-x-[4px]">
            {selectedCount > 0 && (
              <span className="text-[14px] leading-[16px] font-['Gilroy-Medium'] text-[#4E2FD2]">
                {selectedCount} selected
              </span>
            )}
            <ChevronDown className={cn(
              "w-[12px] h-[12px] transition-transform duration-300",
              isOpen ? "transform rotate-180 text-[#4E2FD2]" : (selectedCount > 0 ? "text-[#4E2FD2]" : "text-[#6F7882]")
            )} />
          </div>
        </button>
        
        {isOpen && (
          <div id={contentId} className="flex flex-col border-t border-[#CED6DE] bg-transparent">
            <div className="p-[20px]">
              {children}
            </div>
            
            {onNext && nextStepTitle && (
              <div className="p-[20px] border-t border-[#CED6DE] bg-[#FFFFFF] flex justify-center">
                <button 
                  onClick={onNext}
                  className="flex items-center space-x-[8px] bg-transparent border-[2px] border-[#4E2FD2] text-[#4E2FD2] hover:bg-[#F0F4F7] px-[32px] py-[10px] rounded-full font-['Gilroy-Medium'] text-[14px] transition-colors"
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
