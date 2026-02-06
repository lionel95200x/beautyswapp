import { useQuery } from '@tanstack/react-query';
import type { Order, OrderStatus } from '../types';

export interface UseOrdersOptions {
  filters?: {
    status?: OrderStatus;
    buyerId?: string;
    sellerId?: string;
  };
}

export function useOrders(options?: UseOrdersOptions) {
  const params = new URLSearchParams();

  if (options?.filters?.status) {
    params.append('status', options.filters.status);
  }

  if (options?.filters?.buyerId) {
    params.append('buyerId', options.filters.buyerId);
  }

  if (options?.filters?.sellerId) {
    params.append('sellerId', options.filters.sellerId);
  }

  const queryString = params.toString();

  return useQuery<Order[]>({
    queryKey: ['orders', options?.filters],
    queryFn: async () => {
      const url = `/api/orders${queryString ? `?${queryString}` : ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      return response.json();
    },
  });
}
