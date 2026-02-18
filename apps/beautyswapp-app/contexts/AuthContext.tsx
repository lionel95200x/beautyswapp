/**
 * AuthContext - Gestion de l'authentification avec Payload CMS
 *
 * Gère le cycle complet d'authentification :
 * - Login/Logout
 * - Vérification de session au démarrage
 * - Stockage sécurisé du token JWT
 */

import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useRouter, useSegments } from 'expo-router'
import { authStorage } from '@/lib/secureStorage'
import type { User } from '@beautyswapp/payload-client/types'

const PAYLOAD_API_URL = process.env.EXPO_PUBLIC_PAYLOAD_API_URL
if (!PAYLOAD_API_URL) {
  throw new Error('EXPO_PUBLIC_PAYLOAD_API_URL is required')
}

/**
 * Type du contexte d'authentification
 */
interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const segments = useSegments()
  const router = useRouter()

  /**
   * Vérifie la session au démarrage de l'app
   */
  const checkAuth = useCallback(async () => {
    try {
      const token = await authStorage.getToken()

      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      const response = await fetch(`${PAYLOAD_API_URL}/api/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        await authStorage.removeToken()
        setUser(null)
      }
    } catch (error) {
      console.error('Auth check error:', error)
      await authStorage.removeToken()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Connexion avec email/password
   */
  const signIn = useCallback(async (email: string, password: string) => {
    const response = await fetch(`${PAYLOAD_API_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.errors?.[0]?.message || 'Échec de la connexion')
    }

    const data = await response.json()

    if (!data.token) {
      throw new Error('Token non reçu du serveur')
    }

    await authStorage.setToken(data.token)
    setUser(data.user)
  }, [])

  /**
   * Inscription avec email/password
   */
  const signUp = useCallback(
    async (email: string, password: string, firstName?: string, _lastName?: string) => {
      const response = await fetch(`${PAYLOAD_API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          ...(firstName && { name: firstName }),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.errors?.[0]?.message || "Échec de l'inscription")
      }

      const data = await response.json()

      if (data.token) {
        await authStorage.setToken(data.token)
        setUser(data.doc)
      }
    },
    []
  )

  /**
   * Déconnexion
   */
  const signOut = useCallback(async () => {
    try {
      const token = await authStorage.getToken()

      if (token) {
        await fetch(`${PAYLOAD_API_URL}/api/users/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      await authStorage.removeToken()
      setUser(null)
    }
  }, [])

  /**
   * Protection des routes : redirige vers login si non connecté
   */
  useEffect(() => {
    if (loading) return

    const loggedRoutes = ['(tabs)', 'products', 'vanity', 'checkout', 'categories']
    const inAuthGroup = segments[0] === '(tabs)'
    const inLoggedRoute = loggedRoutes.includes(segments[0])

    if (!user && inAuthGroup) {
      router.replace('/login')
    } else if (user && !inLoggedRoute) {
      router.replace('/(tabs)')
    }
  }, [user, loading, segments])

  /**
   * Vérification de l'auth au montage
   */
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook pour utiliser l'authentification
 */
export function useAuthContext() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }

  return context
}
