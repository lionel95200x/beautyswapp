/**
 * Hook useCurrentUser - Récupère l'utilisateur connecté
 *
 * Version simplifiée qui utilise AuthContext au lieu de TanStack Query
 * car l'état user est déjà géré par le contexte
 */

import { useAuth } from './useAuth'

export const useCurrentUser = () => {
  const { user, loading } = useAuth()

  return {
    data: user,
    isLoading: loading,
  }
}
