import { ReactNode } from 'react'

const STRIPE_ENABLED = process.env.EXPO_PUBLIC_STRIPE_ENABLED === 'true'

interface StripeProviderProps {
  publishableKey: string
  children: ReactNode
}

// Mock provider pour Expo Go (quand Stripe désactivé)
function MockStripeProvider({ children }: StripeProviderProps) {
  return <>{children}</>
}

// Export conditionnel : vrai StripeProvider ou mock
export const StripeProviderWrapper = STRIPE_ENABLED
  ? require('@stripe/stripe-react-native').StripeProvider
  : MockStripeProvider
