import * as productRepository from '../repository/product.repository';
import type { ProductStatus } from '../types';

/**
 * Service pour la gestion des produits
 * Contient la logique métier
 */

export interface ProductFilters {
  status?: ProductStatus;
}

/**
 * Liste tous les produits avec filtres optionnels
 */
export async function listAllProducts(filters?: ProductFilters) {
  return productRepository.findAll(filters);
}

/**
 * Liste tous les produits publiés
 */
export async function listPublishedProducts() {
  return productRepository.findAllPublished();
}

/**
 * Récupère un produit par son ID
 */
export async function getProductById(id: string) {
  return productRepository.findById(id);
}
