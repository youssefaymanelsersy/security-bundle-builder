import type { Product, Category } from '../types/product';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData as Product[]);
    }, 500);
  });
};

export const fetchCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(categoriesData as Category[]);
    }, 500);
  });
};
