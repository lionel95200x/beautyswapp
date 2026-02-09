import { useQuery } from '@tanstack/react-query'
import { sdk } from '../client'

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await sdk.store.product.list()
      return response
    }
  })
}
