import { useQuery } from '@tanstack/react-query'

// 🎭 MOCK DATA - Supprimer cette section en production
const MOCK_VENDOR = '@demovendeur'
const MOCK_COLLECTION_TITLE = 'MARQUE'
const MOCK_PRICE_LABEL = 'Prix non disponible'

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = { products: [{ collection: '', title: 'Produit Mock', description: '' },] }

      // 🎭 MOCK: Enrichir les produits avec les données mock
      const productsWithMock = {
        ...response,
        products: response.products?.map(product => ({
          ...product,
          vendor: MOCK_VENDOR, // 🎭 MOCK - À supprimer en production
          collection: product.collection || { title: MOCK_COLLECTION_TITLE }, // 🎭 MOCK
          _mockPriceLabel: MOCK_PRICE_LABEL, // 🎭 MOCK - Pour l'affichage si pas de prix
        }))
      }

      return productsWithMock
    }
  })
}
