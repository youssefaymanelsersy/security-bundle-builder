import { useMemo } from 'react';
import { Camera, Shield, Radio, PackagePlus } from 'lucide-react';
import type { Product, Category } from '../../types/product';
import { useBundleStore } from '../../store/useBundleStore';
import { getCategoryCounts } from '../../store/selectors';
import { AccordionStep } from '../ui/AccordionStep';
import { ProductCard } from './ProductCard';

interface BuilderStepsProps {
  categories: Category[];
  products: Product[];
}

const ICONS: Record<string, React.ReactNode> = {
  cameras: <Camera className="w-5 h-5" />,
  plan: <Shield className="w-5 h-5" />,
  sensors: <Radio className="w-5 h-5" />,
  accessories: <PackagePlus className="w-5 h-5" />,
};

export function BuilderSteps({ categories, products }: BuilderStepsProps) {
  const currentStep = useBundleStore(state => state.currentStep);
  const setActiveStep = useBundleStore(state => state.setActiveStep);
  
  // This depends on the whole state because getCategoryCounts scans selections
  const state = useBundleStore();
  const categoryCounts = getCategoryCounts(state, products);
  const totalSteps = categories.length;

  const categoryProductsMap = useMemo(() => {
    const map: Record<string, Product[]> = {};
    categories.forEach(c => {
      map[c.id] = products.filter(p => p.category === c.id);
    });
    return map;
  }, [categories, products]);

  return (
    <div className="space-y-4">
      {categories.map((category, index) => {
        const categoryProducts = categoryProductsMap[category.id] || [];
        const selectedCount = categoryCounts[category.id] || 0;
        const isOpen = currentStep === category.stepOrder;
        
        const nextCategory = categories[index + 1];
        
        return (
          <AccordionStep
            key={category.id}
            stepNumber={category.stepOrder}
            totalSteps={totalSteps}
            title={category.name}
            icon={ICONS[category.id]}
            selectedCount={selectedCount}
            isOpen={isOpen}
            onToggle={() => setActiveStep(isOpen ? 0 : category.stepOrder)}
            onNext={nextCategory ? () => setActiveStep(nextCategory.stepOrder) : undefined}
            nextStepTitle={nextCategory?.name}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </AccordionStep>
        );
      })}
    </div>
  );
}
