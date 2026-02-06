import { useQuery } from '@tanstack/react-query';
import type { Order } from '../types';

export function useOrder(orderId: string) {
  return useQuery<Order>({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await fetch(`/api/orders/${orderId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch order');
      }

      return response.json();
    },
    enabled: !!orderId,
  });
}
