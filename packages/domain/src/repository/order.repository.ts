import { eq, and } from 'drizzle-orm';
import { db } from '../db';
import { orders } from '../schema';
import type { OrderStatus } from '../types';

export interface OrderFilters {
  status?: OrderStatus;
  buyerId?: string;
  sellerId?: string;
}

export async function findAll(filters?: OrderFilters) {
  let query = db.select().from(orders);

  if (filters) {
    const conditions = [];

    if (filters.status) {
      conditions.push(eq(orders.status, filters.status));
    }

    if (filters.buyerId) {
      conditions.push(eq(orders.buyerId, filters.buyerId));
    }

    if (filters.sellerId) {
      conditions.push(eq(orders.sellerId, filters.sellerId));
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
    .from(orders)
    .where(eq(orders.id, id))
    .limit(1);

  return results[0];
}
