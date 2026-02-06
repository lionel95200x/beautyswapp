import { eq, and } from 'drizzle-orm';
import { db } from '../db';
import { orders } from '../schema';
import type { OrderStatus } from '../types';

export interface OrderFilters {
  status?: OrderStatus;
  buyerId?: string;
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

export async function create(data: {
  productId: string;
  buyerId: string;
  sellerId: string;
  amount: string;
  stripePaymentId: string;
  status: OrderStatus;
  paidAt: Date;
}) {
  const results = await db.insert(orders).values(data).returning();
  return results[0];
}

export async function findByStripePaymentId(stripePaymentId: string) {
  const results = await db
    .select()
    .from(orders)
    .where(eq(orders.stripePaymentId, stripePaymentId))
    .limit(1);

  return results[0];
}
