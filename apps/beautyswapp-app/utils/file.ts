import type { ReactNativeFile } from '@beautyswapp/payload-client/upload-types'

/**
 * Convertit une URI locale (React Native) en objet compatible FormData
 * pour l'upload vers le serveur
 */
export const uriToFile = async (uri: string, filename: string): Promise<ReactNativeFile> => {
  const response = await fetch(uri)
  const blob = await response.blob()

  // Sur React Native, FormData attend un objet avec uri, type, name
  // Pas un objet File() comme sur le web
  return {
    uri,
    type: blob.type,
    name: filename,
  }
}
