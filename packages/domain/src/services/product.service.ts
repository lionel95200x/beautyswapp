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

export async function canBePurchased(productId: string): Promise<{ canBuy: boolean; reason?: string }> {
  const product = await productRepository.findById(productId);

  if (!product) {
    return { canBuy: false, reason: 'Product not found' };
  }

  if (product.status !== 'published') {
    return { canBuy: false, reason: 'Product is not available for purchase' };
  }

  if (!product.price) {
    return { canBuy: false, reason: 'Product has no price' };
  }

  const priceInEuros = Number(product.price);
  if (isNaN(priceInEuros) || priceInEuros <= 0) {
    return { canBuy: false, reason: 'Invalid product price' };
  }

  return { canBuy: true };
}
