/**
 * Configuration Payload API
 */

const PAYLOAD_API_URL =
  process.env.EXPO_PUBLIC_PAYLOAD_API_URL || process.env.NEXT_PUBLIC_PAYLOAD_API_URL

if (!PAYLOAD_API_URL) {
  throw new Error(
    'PAYLOAD_API_URL required (EXPO_PUBLIC_PAYLOAD_API_URL or NEXT_PUBLIC_PAYLOAD_API_URL)'
  )
}

export { PAYLOAD_API_URL }
