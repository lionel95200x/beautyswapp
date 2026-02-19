import { useQuery } from '@tanstack/react-query'
import { getPageBySlug } from '../client'

/**
 * Hook pour récupérer une page Payload par son slug
 */
export const usePageBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['payload', 'pages', slug],
    queryFn: () => getPageBySlug(slug, 1),
    enabled: !!slug,
  })
}
