import { useQuery } from '@tanstack/react-query'

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = []
      return response
    }
  })
}
