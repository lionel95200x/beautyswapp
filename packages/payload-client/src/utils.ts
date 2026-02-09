import { PAYLOAD_API_URL } from './config'

/**
 * Construit l'URL complète d'un media Payload
 */
export const getMediaUrl = (url?: string | null): string | null => {
  if (!url) return null
  return `${PAYLOAD_API_URL}${url}`
}
