import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, getProductById, getProductsBySeller, uploadMedia, createProduct } from '../client'
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
 * Hook pour récupérer les produits d'un vendeur spécifique
 */
export const useProductsBySeller = (sellerId: number | undefined) => {
  return useQuery({
    queryKey: ['payload', 'products', 'seller', sellerId],
    queryFn: () => getProductsBySeller(sellerId!, 2),
    enabled: !!sellerId,
  })
}

/**
 * Hook pour récupérer un produit par son ID
 */
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['payload', 'product', id],
    queryFn: () => getProductById(id, 2),
    enabled: !!id,
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
