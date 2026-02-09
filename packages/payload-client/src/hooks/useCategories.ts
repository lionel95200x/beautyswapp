import { useQuery } from '@tanstack/react-query'
import { payloadClient } from '../client'

/**
 * Hook pour récupérer toutes les catégories Payload
 */
export const useCategories = () => {
  return useQuery({
    queryKey: ['payload', 'categories'],
    queryFn: () => payloadClient.getCategories(),
  })
}
