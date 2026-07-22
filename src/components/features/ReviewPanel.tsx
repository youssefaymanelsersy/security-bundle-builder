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
    <aside aria-labelledby="review-panel-title" className="bg-gray-50/50 rounded-xl border border-gray-100 p-6 flex flex-col lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)]">
      <div className="mb-6">
        <h2 id="review-panel-title" className="text-xl font-bold text-gray-900 mb-1">Your security system</h2>
        <p className="text-sm text-gray-500">Review your personalized protection system designed to keep what matters most safe.</p>
      </div>

      <div className="flex-grow overflow-y-auto pr-2 -mr-2 mb-6">
        {Object.entries(groupedItems).map(([key, groupItems]) => {
          if (groupItems.length === 0) return null;
          return (
            <div key={key} className="mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
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

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex items-center justify-between text-sm py-2">
          <div className="flex items-center space-x-2 text-green-700 font-medium">
            <Truck className="w-4 h-4" />
            <span>Fast Shipping</span>
          </div>
          <div className="text-right">
            {shipping === 0 ? (
              <>
                <span className="text-gray-400 line-through mr-2">$5.99</span>
                <span className="text-indigo-600 font-bold uppercase">Free</span>
              </>
            ) : (
              <span className="text-gray-900 font-bold">${shipping.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6 pt-4 border-t border-gray-200">
        <div className="flex-shrink-0 w-16 h-16 bg-indigo-600 text-white rounded-full flex flex-col items-center justify-center text-center shadow-md border-4 border-indigo-100">
          <span className="text-xs font-bold leading-tight">100%</span>
          <span className="text-[8px] font-medium leading-tight">Satisfaction<br/>Guarantee</span>
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-1">30-day hassle-free returns</h4>
          <p className="text-xs text-gray-500">If you're not totally in love with the product, we will refund you 100%.</p>
        </div>
      </div>

      <div className="space-y-3 flex-shrink-0">
        <div className="flex items-center justify-between py-2 border-b border-gray-200 mb-2">
          {financingAmount > 0 ? (
            <span className="bg-indigo-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
              as low as ${financingAmount.toFixed(2)}/mo
            </span>
          ) : (
            <span></span>
          )}
          <div className="flex items-center space-x-2">
            {compareAtTotal > subtotal && (
              <span className="text-sm text-gray-400 line-through">${compareAtTotal.toFixed(2)}</span>
            )}
            <span className="text-xl font-bold text-indigo-700">${finalTotal.toFixed(2)}</span>
          </div>
        </div>
        
        {savings > 0 && (
          <div className="text-center text-sm font-medium text-indigo-600 mb-2">
            Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
          </div>
        )}

        <button 
          onClick={handleCheckout}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
        >
          <span>Checkout</span>
        </button>
        
        <button 
          onClick={state.saveBundle}
          className="w-full text-gray-500 hover:text-indigo-600 text-xs font-medium py-2 flex items-center justify-center space-x-2 transition-colors underline"
        >
          <span>Save my system for later</span>
        </button>
      </div>
    </aside>
  );
}
