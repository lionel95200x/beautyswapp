import { useForm } from 'react-hook-form';
import type { Product } from '@beautyswapp/domain/types';
import type { UpdateProductData } from '@beautyswapp/domain/repository/product.repository';

export type ProductFormData = UpdateProductData & {
  sellerId: string;
};

interface UseProductFormOptions {
  defaultValues?: Partial<ProductFormData>;
}

export function useProductForm(options?: UseProductFormOptions) {
  const form = useForm<ProductFormData>({
    defaultValues: options?.defaultValues,
  });

  return form;
}

export function productToFormData(product: Product): ProductFormData {
  return {
    sellerId: product.sellerId,
    brand: product.brand !== null ? product.brand : '',
    category: product.category !== null ? product.category : '',
    condition: product.condition !== null ? product.condition : 'sealed_new',
    batchCode: product.batchCode !== null ? product.batchCode : '',
    paoOrExpiry: product.paoOrExpiry !== null ? product.paoOrExpiry : '',
    title: product.title !== null ? product.title : '',
    description: product.description !== null ? product.description : '',
    price: product.price !== null ? product.price : '',
    status: product.status,
  };
}
