import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NewProduct, Product } from '../types';

interface CreateProductVariables {
  product: NewProduct;
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, CreateProductVariables>({
    mutationFn: async ({ product }) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
