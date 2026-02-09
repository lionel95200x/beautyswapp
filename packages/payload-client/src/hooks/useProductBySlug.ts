import { useQuery } from '@tanstack/react-query'
import { payloadClient } from '../client'

/**
 * Hook pour récupérer un produit Payload par son slug
 */
export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['payload', 'products', slug],
    queryFn: () => payloadClient.getProductBySlug(slug),
    enabled: !!slug,
  })
}
