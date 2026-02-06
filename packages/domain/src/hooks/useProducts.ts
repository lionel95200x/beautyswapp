import { useQuery } from '@tanstack/react-query';
import type { Product, ProductStatus } from '../types';

export interface UseProductsOptions {
  filters?: {
    status?: ProductStatus;
    sellerId?: string;
  };
}

export function useProducts(options?: UseProductsOptions) {
  const params = new URLSearchParams();

  if (options?.filters?.status) {
    params.append('status', options.filters.status);
  }

  if (options?.filters?.sellerId) {
    params.append('sellerId', options.filters.sellerId);
  }

  const queryString = params.toString();

  return useQuery<Product[]>({
    queryKey: ['products', options?.filters],
    queryFn: async () => {
      const url = `/api/products${queryString ? `?${queryString}` : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      return response.json();
    },
  });
}
