import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../client'

/**
 * Hook pour récupérer toutes les catégories Payload
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['payload', 'categories'],
    queryFn: () => getCategories(1),
  })
}
