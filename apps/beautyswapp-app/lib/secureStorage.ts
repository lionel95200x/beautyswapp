/**
 * Secure Storage pour l'authentification
 * Utilise expo-secure-store pour stocker le token JWT de manière chiffrée
 *
 * Sur iOS : Keychain
 * Sur Android : Keystore
 */

import * as SecureStore from 'expo-secure-store'

const AUTH_TOKEN_KEY = 'auth_token'

export const authStorage = {
  /**
   * Stocke le token JWT de manière sécurisée
   */
  async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token)
  },

  /**
   * Récupère le token JWT stocké
   */
  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY)
  },

  /**
   * Supprime le token JWT (logout)
   */
  async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY)
  },
}
