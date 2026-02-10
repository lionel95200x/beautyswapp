import { useQuery } from '@tanstack/react-query'
import { getOrdersByCustomer } from '../client'

/**
 * Hook pour récupérer les commandes d'un client spécifique
 */
export const useOrdersByCustomer = (customerId: number | undefined) => {
  return useQuery({
    queryKey: ['payload', 'orders', 'customer', customerId],
    queryFn: () => getOrdersByCustomer(customerId!, 2),
    enabled: !!customerId,
  })
}
