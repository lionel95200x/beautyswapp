import { useQuery } from '@tanstack/react-query'
import { payloadClient } from '../client'

/**
 * Hook pour récupérer tous les produits Payload
 */
export const useProducts = () => {
  return useQuery({
    queryKey: ['payload', 'products'],
    queryFn: () => payloadClient.getProducts(),
  })
}
