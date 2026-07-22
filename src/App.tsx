import { useEffect, useState } from 'react';
import type { Product, Category } from './types/product';
import { fetchProducts, fetchCategories } from './services/products';
import { useBundleStore } from './store/useBundleStore';
import { BuilderSteps } from './components/features/BuilderSteps';
import { ReviewPanel } from './components/features/ReviewPanel';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { seedDefaults, restoreBundle } = useBundleStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        
        fetchedCategories.sort((a, b) => a.stepOrder - b.stepOrder);
        
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
        
        const savedData = localStorage.getItem('bundle');
        if (savedData) {
          restoreBundle();
        } else {
          const initialSelections: any[] = [];
          const initialActiveVariants: Record<string, string> = {};
          
          fetchedProducts.forEach(product => {
            if (product.variants && product.variants.length > 0) {
              initialActiveVariants[product.id] = product.variants[0].id;
              product.variants.forEach(variant => {
                if (variant.defaultQuantity && variant.defaultQuantity > 0) {
                  initialSelections.push({
                    productId: product.id,
                    variantId: variant.id,
                    quantity: variant.defaultQuantity
                  });
                }
              });
            } else if (product.defaultQuantity && product.defaultQuantity > 0) {
              initialSelections.push({
                productId: product.id,
                quantity: product.defaultQuantity
              });
            }
          });
          
          seedDefaults(initialSelections, initialActiveVariants);
        }
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            SecureHome Builder
          </h1>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Build Your Security System</h2>
              <p className="text-gray-500 text-lg">Select the components that best fit your home.</p>
            </div>
            
            <BuilderSteps categories={categories} products={products} />
          </div>
          
          <div className="lg:col-span-4">
            <ReviewPanel products={products} />
          </div>
          
        </div>
      </main>
    </div>
  );
}

export default App;
