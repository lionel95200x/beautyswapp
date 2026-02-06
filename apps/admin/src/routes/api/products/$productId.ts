import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { getProductById, updateProduct } from '@beautyswapp/domain/services/product.service';
import type { UpdateProductData } from '@beautyswapp/domain/repository/product.repository';

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
      PUT: async ({ params, request }) => {
        const data = (await request.json()) as UpdateProductData;
        const product = await updateProduct(params.productId, data);

        if (!product) {
          return new Response('Product not found', { status: 404 });
        }

        return json(product);
      },
    },
  },
});
