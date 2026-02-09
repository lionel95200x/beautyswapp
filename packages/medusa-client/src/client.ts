import Medusa from "@medusajs/js-sdk"

// Support both Next.js (NEXT_PUBLIC_*) and Expo (EXPO_PUBLIC_*) env vars
const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
  process.env.EXPO_PUBLIC_MEDUSA_BACKEND_URL

const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
  process.env.EXPO_PUBLIC_MEDUSA_PUBLISHABLE_KEY

// Validate: fail-fast if NO env var is set (not a fallback to arbitrary value)
if (!MEDUSA_BACKEND_URL) {
  throw new Error(
    'Medusa backend URL required. Set NEXT_PUBLIC_MEDUSA_BACKEND_URL (Next.js) or EXPO_PUBLIC_MEDUSA_BACKEND_URL (Expo)'
  )
}

if (!MEDUSA_PUBLISHABLE_KEY) {
  throw new Error(
    'Medusa publishable key required. Set NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY (Next.js) or EXPO_PUBLIC_MEDUSA_PUBLISHABLE_KEY (Expo)'
  )
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: MEDUSA_PUBLISHABLE_KEY,
})
