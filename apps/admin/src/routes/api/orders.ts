import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { listOrders } from '@beautyswapp/domain/services/order.service';
import type { OrderStatus } from '@beautyswapp/domain/types';

type OrdersSearch = {
  status?: OrderStatus;
  buyerId?: string;
  sellerId?: string;
};

export const Route = createFileRoute('/api/orders')({
  validateSearch: (search: Record<string, unknown>): OrdersSearch => {
    const validStatuses: OrderStatus[] = [
      'paid',
      'shipped',
      'delivered',
      'canceled',
      'refunded',
    ];

    const status = search.status as string;
    const buyerId = search.buyerId as string;
    const sellerId = search.sellerId as string;

    if (status && !validStatuses.includes(status as OrderStatus)) {
      throw new Error(`Invalid status: ${status}`);
    }

    return {
      status: status as OrderStatus,
      buyerId,
      sellerId,
    };
  },
  server: {
    handlers: {
      GET: async (ctx) => {
        const url = new URL(ctx.request.url);
        const status = url.searchParams.get('status') as OrderStatus | null;
        const buyerId = url.searchParams.get('buyerId');
        const sellerId = url.searchParams.get('sellerId');

        const filters: { status?: OrderStatus; buyerId?: string; sellerId?: string } = {};

        if (status) {
          filters.status = status;
        }

        if (buyerId) {
          filters.buyerId = buyerId;
        }

        if (sellerId) {
          filters.sellerId = sellerId;
        }

        const orders = await listOrders(
          Object.keys(filters).length > 0 ? filters : undefined
        );

        return json(orders);
      },
    },
  },
});
