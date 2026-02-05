import { eq } from 'drizzle-orm';
import { db } from '../db';
import { products } from '../schema';
import type { ProductStatus, NewProduct } from '../types';

interface ProductFilters {
  status?: ProductStatus;
}

export async function findAll(filters?: ProductFilters) {
  let query = db.select().from(products);

  if (filters?.status) {
    query = query.where(eq(products.status, filters.status)) as typeof query;
  }

  return query;
}

export async function findAllPublished() {
  return db
    .select()
    .from(products)
    .where(eq(products.status, 'published'));
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
