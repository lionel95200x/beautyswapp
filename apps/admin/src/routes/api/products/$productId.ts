import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { getProductById } from '@beautyswapp/domain/services/product.service';

export const Route = createFileRoute('/api/products/$productId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const product = await getProductById(params.productId);

        if (!product) {
          return new Response('Product not found', { status: 404 });
        }

        return json(product);
      },
    },
  },
});
