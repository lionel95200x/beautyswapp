import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@beautyswapp/domain/api/payload'

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}
