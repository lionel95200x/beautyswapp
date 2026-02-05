import * as productRepository from '../repository/product.repository';
import type { ProductStatus, NewProduct } from '../types';

export interface ProductFilters {
  status?: ProductStatus;
}

export async function listAllProducts(filters?: ProductFilters) {
  return productRepository.findAll(filters);
}

export async function listPublishedProducts() {
  return productRepository.findAllPublished();
}

export async function getProductById(id: string) {
  return productRepository.findById(id);
}

export async function createProduct(data: NewProduct) {
  return productRepository.create(data);
}
