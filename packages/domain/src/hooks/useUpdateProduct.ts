import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateProductData } from '../repository/product.repository';
import type { Product } from '../types';

interface UpdateProductVariables {
  productId: string;
  data: UpdateProductData;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, UpdateProductVariables>({
    mutationFn: async ({ productId, data }) => {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      return response.json();
    },
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', updatedProduct.id] });
    },
  });
}
