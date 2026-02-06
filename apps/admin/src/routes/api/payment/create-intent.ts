import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { createPaymentIntent } from '@beautyswapp/domain/services/payment.service';

export const Route = createFileRoute('/api/payment/create-intent')({
  server: {
    handlers: {
      POST: async (ctx) => {
        const body = await ctx.request.json();
        const { productId, buyerId } = body;

        if (!productId || !buyerId) {
          return json(
            { error: 'Missing required fields' },
            { status: 400 }
          );
        }

        try {
          const result = await createPaymentIntent({
            productId,
            buyerId,
          });

          return json(result);
        } catch (error) {
          console.error('Create payment intent error:', error);
          return json(
            { error: error instanceof Error ? error.message : 'Failed to create payment intent' },
            { status: 400 }
          );
        }
      },
    },
  },
});
