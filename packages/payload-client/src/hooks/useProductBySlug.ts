import { useQuery } from '@tanstack/react-query'
import { getProductBySlug } from '../client'

/**
 * Hook pour récupérer un produit Payload par son slug
 */
export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['payload', 'products', slug],
    queryFn: () => getProductBySlug(slug, 1),
    enabled: !!slug,
  })
}
