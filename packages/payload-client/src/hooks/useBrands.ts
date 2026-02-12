import { useQuery } from '@tanstack/react-query'
import { getBrands } from '../client'

export const useBrands = () => {
  return useQuery({
    queryKey: ['payload', 'brands'],
    queryFn: () => getBrands(1),
  })
}
