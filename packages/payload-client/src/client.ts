import { PAYLOAD_API_URL } from './config'
import type { PayloadCategoriesResponse, PayloadProductsResponse, Product } from './types'

/**
 * Erreur Payload typée
 */
export class PayloadError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message || `Payload API Error: ${status} ${statusText}`)
    this.name = 'PayloadError'
  }
}

/**
 * Client API Payload
 */
export class PayloadClient {
  private baseURL: string

  constructor(baseURL: string = PAYLOAD_API_URL) {
    this.baseURL = baseURL
  }

  /**
   * Requête HTTP générique
   */
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new PayloadError(response.status, response.statusText)
    }

    return response.json()
  }

  /**
   * Récupère tous les produits
   */
  async getProducts(depth = 2): Promise<PayloadProductsResponse> {
    return this.request<PayloadProductsResponse>(`/api/products?depth=${depth}`)
  }

  /**
   * Récupère un produit par son slug
   */
  async getProductBySlug(slug: string, depth = 1): Promise<Product> {
    const data = await this.request<PayloadProductsResponse>(
      `/api/products?where[slug][equals]=${slug}&depth=${depth}`
    )

    if (data.docs.length === 0) {
      throw new PayloadError(404, 'Not Found', `Product not found: ${slug}`)
    }

    return data.docs[0]
  }

  /**
   * Récupère toutes les catégories
   */
  async getCategories(depth = 1): Promise<PayloadCategoriesResponse> {
    return this.request<PayloadCategoriesResponse>(`/api/categories?depth=${depth}`)
  }
}

/**
 * Instance singleton du client Payload
 */
export const payloadClient = new PayloadClient()
