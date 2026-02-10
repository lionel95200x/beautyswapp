import { PAYLOAD_API_URL } from './config'
import type { PayloadCategoriesResponse, PayloadProductsResponse, PayloadOrdersResponse, Product } from './types'
import type {
  UploadFile,
  MediaUploadResponse,
  CreateProductPayload,
  ProductCreateResponse,
} from './upload-types'

/**
 * Erreur Payload typée
 */
export function createPayloadError(status: number, statusText: string, message?: string): Error {
  const error = new Error(message || `Payload API Error: ${status} ${statusText}`)
  error.name = 'PayloadError'
  return error
}

/**
 * Requête HTTP générique
 */
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${PAYLOAD_API_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw createPayloadError(response.status, response.statusText)
  }

  return response.json()
}

/**
 * Récupère tous les produits
 */
export async function getProducts(depth: number): Promise<PayloadProductsResponse> {
  return request<PayloadProductsResponse>(`/api/products?depth=${depth}`)
}

/**
 * Récupère les produits d'un vendeur spécifique
 */
export async function getProductsBySeller(sellerId: number, depth: number): Promise<PayloadProductsResponse> {
  return request<PayloadProductsResponse>(`/api/products?where[seller][equals]=${sellerId}&depth=${depth}`)
}

/**
 * Récupère un produit par son ID
 */
export async function getProductById(id: string, depth: number): Promise<Product> {
  return request<Product>(`/api/products/${id}?depth=${depth}`)
}

/**
 * Récupère un produit par son slug
 */
export async function getProductBySlug(slug: string, depth: number): Promise<Product> {
  const data = await request<PayloadProductsResponse>(
    `/api/products?where[slug][equals]=${slug}&depth=${depth}`
  )

  if (data.docs.length === 0) {
    throw createPayloadError(404, 'Not Found', `Product not found: ${slug}`)
  }

  return data.docs[0]
}

/**
 * Récupère toutes les catégories
 */
export async function getCategories(depth: number): Promise<PayloadCategoriesResponse> {
  return request<PayloadCategoriesResponse>(`/api/categories?depth=${depth}`)
}

/**
 * Upload un média (photo) vers Payload
 * Accepte un objet File (web) ou un objet { uri, type, name } (React Native)
 */
export async function uploadMedia(file: UploadFile, alt: string): Promise<MediaUploadResponse> {
  const formData = new FormData()
  formData.append('file', file as Blob)
  formData.append('_payload', JSON.stringify({ alt }))

  const url = `${PAYLOAD_API_URL}/api/media`
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    // Ne pas définir Content-Type pour FormData (navigateur le fait automatiquement)
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Upload error:', response.status, errorText)
    throw createPayloadError(response.status, response.statusText, errorText)
  }

  return response.json()
}

/**
 * Crée un nouveau produit
 */
export async function createProduct(data: CreateProductPayload): Promise<ProductCreateResponse> {
  return request<ProductCreateResponse>('/api/products', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Récupère les commandes d'un client spécifique
 */
export async function getOrdersByCustomer(customerId: number, depth: number): Promise<PayloadOrdersResponse> {
  return request<PayloadOrdersResponse>(`/api/orders?where[customer][equals]=${customerId}&depth=${depth}`)
}
