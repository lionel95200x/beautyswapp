import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '@beautyswapp/domain/api/payload'

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })
}
