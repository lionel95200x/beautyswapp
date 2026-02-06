import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { verifyWebhookSignature } from '@beautyswapp/domain/repository/payment.repository';
import { handleWebhookEvent } from '@beautyswapp/domain/services/payment.service';

export const Route = createFileRoute('/api/webhooks/stripe')({
  server: {
    handlers: {
      POST: async (ctx) => {
        const body = await ctx.request.text();
        const signature = ctx.request.headers.get('stripe-signature');

        if (!signature) {
          return json({ error: 'No signature' }, { status: 400 });
        }

        try {
          const event = verifyWebhookSignature(body, signature);
          await handleWebhookEvent(event);
          return json({ received: true });
        } catch (error) {
          console.error('Webhook error:', error);
          return json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 400 }
          );
        }
      },
    },
  },
});
