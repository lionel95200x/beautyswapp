import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, getProductById, getProductsBySeller, uploadMedia, createProduct, updateProduct } from '../client'
import type { UploadFile, CreateProductPayload } from '../upload-types'


export const useProducts = () => {
  return useQuery({
    queryKey: ['payload', 'products'],
    queryFn: () => getProducts(2),
  })
}

export const useProductsBySeller = (sellerId: number | undefined) => {
  return useQuery({
    queryKey: ['payload', 'products', 'seller', sellerId],
    queryFn: () => getProductsBySeller(sellerId!, 2),
    enabled: !!sellerId,
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['payload', 'product', id],
    queryFn: () => getProductById(id, 2),
    enabled: !!id,
  })
}

export const useUploadMedia = () => {
  return useMutation({
    mutationFn: ({ file, alt }: { file: UploadFile; alt: string }) =>
      uploadMedia(file, alt),
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductPayload) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payload', 'products'] })
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateProductPayload> }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payload', 'products'] })
    },
  })
}
