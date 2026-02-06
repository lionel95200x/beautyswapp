import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { listProducts, createProduct } from '@beautyswapp/domain/services/product.service';
import type { ProductStatus, NewProduct } from '@beautyswapp/domain/types';

type ProductsSearch = {
  status?: ProductStatus;
  sellerId?: string;
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
    const sellerId = search.sellerId as string;

    if (status && !validStatuses.includes(status as ProductStatus)) {
      throw new Error(`Invalid status: ${status}`);
    }

    return {
      status: status as ProductStatus,
      sellerId,
    };
  },
  server: {
    handlers: {
      GET: async (ctx) => {
        const url = new URL(ctx.request.url);
        const status = url.searchParams.get('status') as ProductStatus | null;
        const sellerId = url.searchParams.get('sellerId');

        const filters: { status?: ProductStatus; sellerId?: string } = {};

        if (status) {
          filters.status = status;
        }

        if (sellerId) {
          filters.sellerId = sellerId;
        }

        const products = await listProducts(
          Object.keys(filters).length > 0 ? filters : undefined
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
