import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, uploadMedia, createProduct } from '../client'
import type { UploadFile, CreateProductPayload } from '../upload-types'

/**
 * Hook pour récupérer tous les produits Payload
 */
export const useProducts = () => {
  return useQuery({
    queryKey: ['payload', 'products'],
    queryFn: () => getProducts(2),
  })
}

/**
 * Hook pour uploader un média
 * Accepte un objet File (web) ou un objet { uri, type, name } (React Native)
 */
export const useUploadMedia = () => {
  return useMutation({
    mutationFn: ({ file, alt }: { file: UploadFile; alt: string }) =>
      uploadMedia(file, alt),
  })
}

/**
 * Hook pour créer un nouveau produit
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductPayload) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payload', 'products'] })
    },
  })
}
