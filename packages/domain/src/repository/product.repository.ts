import { eq, and } from 'drizzle-orm';
import { db } from '../db';
import { products } from '../schema';
import type { ProductStatus, NewProduct } from '../types';

export interface ProductFilters {
  status?: ProductStatus;
  sellerId?: string;
}

export async function findAll(filters?: ProductFilters) {
  let query = db.select().from(products);

  if (filters) {
    const conditions = [];

    if (filters.status) {
      conditions.push(eq(products.status, filters.status));
    }

    if (filters.sellerId) {
      conditions.push(eq(products.sellerId, filters.sellerId));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as typeof query;
    }
  }

  return query;
}

export async function findById(id: string) {
  const results = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  return results[0];
}

export async function create(data: NewProduct) {
  const results = await db
    .insert(products)
    .values(data)
    .returning();

  return results[0];
}
