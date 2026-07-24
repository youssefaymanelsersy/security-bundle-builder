import { create } from 'zustand';
import type { BundleSelection } from '../types/bundle';
import { saveToStorage, loadFromStorage, clearStorage } from '../lib/storage';

export interface BundleState {
  selections: BundleSelection[];
  activeVariants: Record<string, string>;
  currentStep: number;
  
  increaseQuantity: (productId: string, variantId?: string) => void;
  decreaseQuantity: (productId: string, variantId?: string) => void;
  selectVariant: (productId: string, variantId: string) => void;
  
  setActiveStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  saveBundle: () => void;
  restoreBundle: () => void;
  clearBundle: () => void;
  seedDefaults: (selections: BundleSelection[], activeVariants: Record<string, string>) => void;
}

export const useBundleStore = create<BundleState>((set, get) => ({
  selections: [],
  activeVariants: {},
  currentStep: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 1,

  increaseQuantity: (productId, variantId) => {
    set((state) => {
      const existing = state.selections.find(
        (s) => s.productId === productId && s.variantId === variantId
      );
      if (existing) {
        return {
          selections: state.selections.map((s) =>
            s.productId === productId && s.variantId === variantId
              ? { ...s, quantity: s.quantity + 1 }
              : s
          ),
        };
      }
      return {
        selections: [...state.selections, { productId, variantId, quantity: 1 }],
      };
    });
  },

  decreaseQuantity: (productId, variantId) => {
    set((state) => {
      const existing = state.selections.find(
        (s) => s.productId === productId && s.variantId === variantId
      );
      if (!existing || existing.quantity === 0) return state;
      
      if (existing.quantity === 1) {
        return {
          selections: state.selections.filter(
            (s) => !(s.productId === productId && s.variantId === variantId)
          ),
        };
      }
      return {
        selections: state.selections.map((s) =>
          s.productId === productId && s.variantId === variantId
            ? { ...s, quantity: s.quantity - 1 }
            : s
        ),
      };
    });
  },

  selectVariant: (productId, variantId) => {
    set((state) => ({
      activeVariants: {
        ...state.activeVariants,
        [productId]: variantId,
      },
    }));
  },

  setActiveStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),

  saveBundle: () => {
    const { selections, activeVariants, currentStep } = get();
    saveToStorage('bundle', { selections, activeVariants, currentStep });
    alert("Bundle saved for later!");
  },

  restoreBundle: () => {
    const data = loadFromStorage<{ selections: BundleSelection[]; activeVariants: Record<string, string>; currentStep: number }>('bundle');
    if (data) {
      set({ 
        selections: data.selections, 
        activeVariants: data.activeVariants,
        currentStep: data.currentStep ?? (typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 1)
      });
    }
  },

  clearBundle: () => {
    clearStorage('bundle');
    set({ selections: [], activeVariants: {}, currentStep: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 1 });
  },
  
  seedDefaults: (selections, activeVariants) => {
    set({ selections, activeVariants });
  }
}));
