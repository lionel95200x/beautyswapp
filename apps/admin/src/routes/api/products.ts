import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { listAllProducts, createProduct } from '@beautyswapp/domain/services/product.service';
import type { ProductStatus, NewProduct } from '@beautyswapp/domain/types';

type ProductsSearch = {
  status?: ProductStatus;
};

export const Route = createFileRoute('/api/products')({
  validateSearch: (search: Record<string, unknown>): ProductsSearch => {
    const validStatuses: ProductStatus[] = [
      'submitted',
      'need_info',
      'draft_prepared',
      'awaiting_seller_approval',
      'published',
      'blocked',
    ];

    const status = search.status as string;

    if (status && !validStatuses.includes(status as ProductStatus)) {
      throw new Error(`Invalid status: ${status}`);
    }

    return {
      status: status as ProductStatus,
    };
  },
  server: {
    handlers: {
      GET: async (ctx) => {
        const url = new URL(ctx.request.url);
        const status = url.searchParams.get('status') as ProductStatus | null;

        const products = await listAllProducts(
          status ? { status } : undefined
        );

        return json(products);
      },
      POST: async (ctx) => {
        const body = await ctx.request.json();
        const product = await createProduct(body as NewProduct);
        return json(product, { status: 201 });
      },
    },
  },
});
