import { useQuery } from '@tanstack/react-query'
import { sdk } from '../client'

// 🎭 MOCK DATA - Supprimer cette section en production
const MOCK_USER = {
  first_name: 'Demo',
  last_name: 'User',
  email: 'demo@beautyswapp.com',
  metadata: {
    avatar_url: null, // Pas d'avatar par défaut
    username: 'demouser', // 🎭 MOCK - Pseudo sans @
  },
}

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await sdk.store.customer.retrieve()

      // 🎭 MOCK: Enrichir avec des données de démo si pas connecté
      if (!response.customer) {
        return MOCK_USER // 🎭 MOCK - À supprimer en production
      }

      // 🎭 MOCK: Enrichir les données manquantes
      const userWithMock = {
        ...response.customer,
        first_name: response.customer.first_name || MOCK_USER.first_name, // 🎭 MOCK
        last_name: response.customer.last_name || MOCK_USER.last_name, // 🎭 MOCK
        email: response.customer.email || MOCK_USER.email, // 🎭 MOCK
        metadata: {
          ...response.customer.metadata,
          avatar_url: response.customer.metadata?.avatar_url || MOCK_USER.metadata.avatar_url, // 🎭 MOCK
          username: response.customer.metadata?.username || MOCK_USER.metadata.username, // 🎭 MOCK
        },
      }

      return userWithMock
    },
    retry: false,
  })
}
