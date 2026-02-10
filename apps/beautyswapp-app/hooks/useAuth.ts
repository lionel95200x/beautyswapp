/**
 * Hook useAuth - Interface simplifiée pour l'authentification
 *
 * Utilise le AuthContext en arrière-plan
 */

import { useAuthContext } from '@/contexts/AuthContext'

export const useAuth = () => {
  return useAuthContext()
}
