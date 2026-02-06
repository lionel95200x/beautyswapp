import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { getOrderById } from '@beautyswapp/domain/services/order.service';

export const Route = createFileRoute('/api/orders/$orderId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const order = await getOrderById(params.orderId);

        if (!order) {
          return new Response('Order not found', { status: 404 });
        }

        return json(order);
      },
    },
  },
});
