import { useQuery } from '@tanstack/react-query';
import type { Product } from '../types';

export function useProduct(productId: string) {
  return useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await fetch(`/api/products/${productId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      return response.json();
    },
    enabled: !!productId,
  });
}
