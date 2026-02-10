/**
 * Types Payload auto-générés
 *
 * Pour mettre à jour ces types:
 * 1. cd apps/beautyswapp-admin (ou le nom de votre app admin Payload)
 * 2. pnpm generate:types
 * 3. Copier les types depuis payload-types.ts vers ici
 */

// ====================================================================
// RichText Types & Utils
// ====================================================================
export type { RichTextNode, RichTextRoot, RichTextField } from './types/richtext';
export { extractTextFromRichText } from './types/richtext';

// ====================================================================
// Media
// ====================================================================
export interface Media {
  id: number
  alt: string
  caption?: {
    root: {
      type: string
      children: {
        type: any
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  updatedAt: string
  createdAt: string
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}

// ====================================================================
// Category
// ====================================================================
export interface Category {
  id: number
  title: string
  image?: (number | null) | Media
  generateSlug?: boolean | null
  slug: string
  updatedAt: string
  createdAt: string
}

// ====================================================================
// Brand
// ====================================================================
export interface Brand {
  id: number
  title: string
  image?: (number | null) | Media
  generateSlug?: boolean | null
  slug: string
  updatedAt: string
  createdAt: string
}

// ====================================================================
// User
// ====================================================================
export interface User {
  id: number
  name?: string | null
  roles?: ('admin' | 'customer')[] | null
  updatedAt: string
  createdAt: string
  email: string
}

// ====================================================================
// Product
// ====================================================================
export interface Product {
  id: number
  title: string
  description?: {
    root: {
      type: string
      children: {
        type: any
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  gallery?: {
    image: number | Media
    id?: string | null
  }[] | null
  inventory?: number | null
  priceInUSD?: number | null
  seller: User
  categories?: (number | Category)[] | null
  brands?: (number | Brand)[] | null
  slug: string
  updatedAt: string
  createdAt: string
  deletedAt?: string | null
  _status?: ('draft' | 'published') | null
}

// ====================================================================
// API Response Types
// ====================================================================
export interface PayloadCategoriesResponse {
  docs: Category[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface PayloadProductsResponse {
  docs: Product[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
