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
let StripeProviderWrapper: React.ComponentType<StripeProviderProps>

if (STRIPE_ENABLED) {
  try {
    StripeProviderWrapper = require('@stripe/stripe-react-native').StripeProvider
  } catch (error) {
    console.warn('Stripe package not available, using mock provider')
    StripeProviderWrapper = MockStripeProvider
  }
} else {
  StripeProviderWrapper = MockStripeProvider
}

export { StripeProviderWrapper }
