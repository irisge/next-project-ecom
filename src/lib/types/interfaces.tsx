import { ProductFormat } from '@prisma/client';

export interface Category {
  id: string;
  name: string;
  description: string;
  images: CategoryImage[];
  products: ProductsOnCategories[];
  isActive: boolean;
  metaTitle: string;
  keywords: string;
  metaDescription: string;
  orderIndex: number;
}

export interface CategoryImage {
  id: string;
  url: string;
  imageDescription: string;
  categoryId: string;
}

export interface ProductImage {
  id: string;
  url: string;
  imageDescription: string;
  productId: string;
}

export interface CategoriesOnProducts {
  categoryId: string;
  category: { name: string };
  productId: string;
  product: string;
}

export interface ProductsOnCategories {
  categoryId: string;
  category: string;
  productId: string;
  product: { name: string };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  status: string;
  metaTitle: string;
  keywords: string;
  metaDescription: string;
  tag: string[];
  categories: CategoriesOnProducts[];
  images: ProductImage[];
  format: ProductFormat[];
}
