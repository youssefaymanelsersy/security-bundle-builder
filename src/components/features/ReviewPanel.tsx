import { useMemo } from 'react';
import { useBundleStore } from '../../store/useBundleStore';
import { getReviewItems, getPricingTotals } from '../../store/selectors';
import { SummaryItem } from './SummaryItem';
import type { Product } from '../../types/product';
import { Truck } from 'lucide-react';

interface ReviewPanelProps {
  products: Product[];
}

export function ReviewPanel({ products }: ReviewPanelProps) {
  const state = useBundleStore();
  const items = getReviewItems(state, products);
  const groupedItems = useMemo(() => ({
    cameras: items.filter(i => i.product.category === 'cameras'),
    sensors: items.filter(i => i.product.category === 'sensors'),
    accessories: items.filter(i => i.product.category === 'accessories'),
    plan: items.filter(i => i.product.category === 'plan')
  }), [items]);

  const { subtotal, compareAtTotal, savings, shipping, financingAmount, finalTotal } = getPricingTotals(state, products);

  const handleCheckout = () => {
    alert("Checkout initiated!");
  };

  if (items.length === 0) {
    return (
      <aside aria-labelledby="review-panel-title" className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-6">
        <h2 id="review-panel-title" className="text-xl font-bold mb-4">Your Security System</h2>
        <p className="text-gray-500 text-center py-8">Your bundle is empty. Add some products to get started!</p>
      </aside>
    );
  }

  const groupLabels: Record<string, string> = {
    cameras: 'Cameras',
    sensors: 'Sensors',
    accessories: 'Accessories',
    plan: 'Plan'
  };

  return (
    <aside aria-labelledby="review-panel-title" className="bg-[#EDF4FF] rounded-xl border border-transparent p-[20px] pb-[31px] flex flex-col lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)]">
      <div className="mb-[15px]">
        <h2 id="review-panel-title" className="text-[22px] leading-[100%] font-headline font-semibold text-[#1F1F1F] tracking-[0.6px] mb-[5px]">Your security system</h2>
        <p className="text-[12px] leading-[130%] font-['Gilroy-Medium'] text-[rgba(31,31,31,0.75)] tracking-[0.6px]">Review your personalized protection system designed to keep what matters most safe.</p>
      </div>

      <div className="flex-grow overflow-y-auto pr-2 -mr-2 mb-6 border-t-[1px] border-[#CED6DE] pt-[15px]">
        {Object.entries(groupedItems).map(([key, groupItems]) => {
          if (groupItems.length === 0) return null;
          return (
            <div key={key} className="mb-[8px]">
              <h3 className="text-[12px] leading-[133%] font-['Gilroy-Regular'] text-[#A8B2BD] uppercase tracking-[0.03em] mb-[12px]">
                {groupLabels[key]}
              </h3>
              <div className="space-y-1">
                {groupItems.map((item, idx) => (
                  <SummaryItem
                    key={`${item.productId}-${item.variantId || idx}`}
                    name={item.title}
                    price={item.product.price}
                    comparePrice={item.product.comparePrice}
                    quantity={item.quantity}
                    imageUrl={item.variant?.image || item.product.image}
                    onIncrease={() => state.increaseQuantity(item.productId, item.variantId)}
                    onDecrease={() => state.decreaseQuantity(item.productId, item.variantId)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t-[1px] border-[#CED6DE] pt-[15px] mb-[15px]">
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center space-x-[8px] text-[#0AA288] font-medium">
            <Truck className="w-4 h-4" />
            <span className="text-[12px] leading-[133%] font-['Gilroy-Medium'] text-[#0B0D10] tracking-[0.005em]">Fast Shipping</span>
          </div>
          <div className="text-right">
            {shipping === 0 ? (
              <>
                <span className="text-[12px] leading-[133%] font-['Gilroy-Medium'] text-[#6F7882] line-through tracking-[0.005em] mr-[6px]">$5.99</span>
                <span className="text-[12px] leading-[133%] font-['Gilroy-SemiBold'] text-[#4E2FD2] tracking-[0.005em] uppercase">Free</span>
              </>
            ) : (
              <span className="text-[12px] leading-[133%] font-['Gilroy-SemiBold'] text-[#4E2FD2] tracking-[0.005em]">${shipping.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-[24px] pt-[15px] border-t-[1px] border-[#CED6DE]">
        <div className="flex-shrink-0 w-16 h-16 bg-[#4E2FD2] text-[#FFFFFF] rounded-full flex flex-col items-center justify-center text-center shadow-[0_2px_10px_rgba(78,47,210,0.3)] border-4 border-[#EDF4FF]">
          <span className="text-xs font-bold leading-tight">100%</span>
          <span className="text-[8px] font-medium leading-tight">Satisfaction<br/>Guarantee</span>
        </div>
        <div>
          <h4 className="text-[14px] font-['Gilroy-SemiBold'] text-[#0B0D10] mb-1">30-day hassle-free returns</h4>
          <p className="text-[12px] font-['Gilroy-Medium'] text-[#6F7882]">If you're not totally in love with the product, we will refund you 100%.</p>
        </div>
      </div>

      <div className="space-y-[10px] flex-shrink-0">
        <div className="flex items-center justify-between py-[15px] border-y-[1px] border-[#CED6DE] mb-[15px]">
          {financingAmount > 0 ? (
            <span className="bg-[#4E2FD2] text-[#FFFFFF] text-[12px] font-['Gilroy-Medium'] px-[10px] py-[4px] rounded-[5px]">
              as low as ${financingAmount.toFixed(2)}/mo
            </span>
          ) : (
            <span></span>
          )}
          <div className="flex items-center space-x-2">
            {compareAtTotal > subtotal && (
              <span className="text-[12px] font-['Gilroy-Medium'] text-[#6F7882] line-through tracking-[0.005em]">${compareAtTotal.toFixed(2)}</span>
            )}
            <span className="text-[20px] font-['Gilroy-Bold'] text-[#4E2FD2]">${finalTotal.toFixed(2)}</span>
          </div>
        </div>
        
        {savings > 0 && (
          <div className="text-center text-[12px] font-['Gilroy-SemiBold'] text-[#0AA288] mb-2 tracking-[0.005em]">
            Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
          </div>
        )}

        <button 
          onClick={handleCheckout}
          className="w-full bg-[#4E2FD2] hover:bg-[#3d25ab] text-[#FFFFFF] font-['Gilroy-Bold'] py-[15px] px-[16px] rounded-[10px] transition-colors flex items-center justify-center space-x-2"
        >
          <span>Checkout</span>
        </button>
        
        <button 
          onClick={state.saveBundle}
          className="w-full text-[#484848] hover:text-[#0B0D10] text-[14px] font-['Gilroy-RegularItalic'] italic underline py-2 flex items-center justify-center space-x-2 transition-colors tracking-[-0.016px]"
        >
          <span>Save my system for later</span>
        </button>
      </div>
    </aside>
  );
}
