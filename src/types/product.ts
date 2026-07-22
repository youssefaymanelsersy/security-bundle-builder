export interface ProductVariant {
  id: string;
  name: string;
  color: string;
  image?: string;
  defaultQuantity?: number;
}

export interface Product {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  comparePrice?: number;
  price: number;
  variants?: ProductVariant[];
  defaultQuantity?: number;
  learnMoreUrl?: string;
  allowMultiple?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  stepOrder: number;
}
