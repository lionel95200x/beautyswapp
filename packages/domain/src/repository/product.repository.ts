import { eq } from 'drizzle-orm';
import { db } from '../db';
import { products } from '../schema';
import type { ProductStatus } from '../types';

/**
 * Repository pour la gestion des produits
 */

interface ProductFilters {
  status?: ProductStatus;
}

/**
 * Récupère tous les produits avec filtres optionnels
 */
export async function findAll(filters?: ProductFilters) {
  let query = db.select().from(products);

  if (filters?.status) {
    query = query.where(eq(products.status, filters.status)) as typeof query;
  }

  return query;
}

/**
 * Récupère tous les produits publiés
 */
export async function findAllPublished() {
  return db
    .select()
    .from(products)
    .where(eq(products.status, 'published'));
}

/**
 * Récupère un produit par son ID
 */
export async function findById(id: string) {
  const results = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  return results[0];
}
