import * as productRepository from '../repository/product.repository';
import type { NewProduct } from '../types';

export type { ProductFilters } from '../repository/product.repository';

export async function listProducts(filters?: productRepository.ProductFilters) {
  return productRepository.findAll(filters);
}

export async function getProductById(id: string) {
  return productRepository.findById(id);
}

export async function createProduct(data: NewProduct) {
  return productRepository.create(data);
}

export async function updateProduct(id: string, data: productRepository.UpdateProductData) {
  return productRepository.update(id, data);
}
