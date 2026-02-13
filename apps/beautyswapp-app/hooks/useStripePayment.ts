import { useState } from 'react'
import { Alert } from 'react-native'

interface UseStripePaymentParams {
  customerEmail?: string
  onSuccess: (paymentIntentID: string) => void
  onError?: (error: Error) => void
  onCancel?: () => void
}

const STRIPE_ENABLED = process.env.EXPO_PUBLIC_STRIPE_ENABLED === 'true'

// Import conditionnel pour éviter de charger le module natif en mode dev
const useStripe = STRIPE_ENABLED
  ? require('@stripe/stripe-react-native').useStripe
  : () => null

const PaymentSheetError = STRIPE_ENABLED
  ? require('@stripe/stripe-react-native').PaymentSheetError
  : { Canceled: 'Canceled' }

export function useStripePayment({ customerEmail, onSuccess, onError, onCancel }: UseStripePaymentParams) {
  const stripe = useStripe()
  const [isLoading, setIsLoading] = useState(false)

  const processPayment = async (clientSecret: string) => {
    // MODE MOCK: Simule un paiement réussi sans Stripe (pour dev Expo Go)
    if (!STRIPE_ENABLED || !stripe) {
      console.log('[MOCK] Stripe désactivé - simulation de paiement réussi')
      setIsLoading(true)

      // Simule un délai réseau
      await new Promise(resolve => setTimeout(resolve, 1500))

      const paymentIntentID = clientSecret.split('_secret_')[0]

      setIsLoading(false)
      onSuccess(paymentIntentID)

      Alert.alert('Mode DEV', 'Paiement simulé (Stripe désactivé)')

      return { cancelled: false, paymentIntentID }
    }

    // MODE RÉEL: Utilise Stripe normalement
    setIsLoading(true)

    try {
      const { initPaymentSheet, presentPaymentSheet } = stripe

      // ÉTAPE 1: Configurer le PaymentSheet
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Beautyswapp',
        returnURL: 'beautyswapp://stripe-redirect',
        defaultBillingDetails: {
          email: customerEmail,
        },
        // Apple Pay et Google Pay désactivés pour l'instant (nécessitent configuration merchant)
        // applePay: {
        //   merchantCountryCode: 'FR',
        //   merchantIdentifier: 'merchant.com.beautyswapp', // À configurer dans Apple Developer
        // },
        // googlePay: {
        //   merchantCountryCode: 'FR',
        //   testEnv: __DEV__,
        // },
      })

      if (initError) {
        throw new Error(initError.message)
      }

      // ÉTAPE 2: Présenter le PaymentSheet
      const { error: presentError } = await presentPaymentSheet()

      if (presentError) {
        setIsLoading(false)

        // Check if user cancelled (closed the payment sheet)
        if (presentError.code === PaymentSheetError.Canceled) {
          console.log('Payment cancelled by user')
          if (onCancel) {
            onCancel()
          }
          return { cancelled: true }
        }

        // Other errors (network, etc.)
        throw new Error(presentError.message)
      }

      // ÉTAPE 3: Paiement réussi - extraire le paymentIntentID
      const paymentIntentID = clientSecret.split('_secret_')[0]

      setIsLoading(false)
      onSuccess(paymentIntentID)

      return { cancelled: false, paymentIntentID }

    } catch (error: any) {
      setIsLoading(false)

      if (onError) {
        onError(error)
      } else {
        Alert.alert('Erreur de paiement', error.message)
      }

      throw error
    }
  }

  return {
    processPayment,
    isLoading,
  }
}
