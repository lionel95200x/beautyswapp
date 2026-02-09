import { useQuery } from '@tanstack/react-query'
import { sdk } from '../client'

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await sdk.store.category.list()
      return response
    }
  })
}
