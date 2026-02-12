import { useState } from 'react'
import { Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { YStack, ScrollView, Text, Heading } from 'tamagui'
import { useProduct } from '@beautyswapp/payload-client/hooks/useProducts'
import { useInitiatePayment, useConfirmOrder } from '@beautyswapp/payload-client/hooks/usePayment'
import { useAuthContext } from '@/contexts/AuthContext'
import { authStorage } from '@/lib/secureStorage'
import { PrimaryButton } from '@/components/ui/button'
import { useStripePayment } from '@/hooks/useStripePayment'
import { deleteCart } from '@beautyswapp/payload-client/payment-client'

export default function CheckoutScreen() {
  const { productId } = useLocalSearchParams<{ productId: string }>()
  const { data: product, isLoading: isLoadingProduct } = useProduct(productId)
  const { user } = useAuthContext()
  const router = useRouter()

  const initiatePaymentMutation = useInitiatePayment()
  const confirmOrderMutation = useConfirmOrder()

  const [cartId, setCartId] = useState<number | null>(null)

  const { processPayment, isLoading: isProcessingPayment } = useStripePayment({
    customerEmail: user?.email,
    onSuccess: async (paymentIntentID) => {
      try {
        const token = await authStorage.getToken()
        if (!token || !cartId) return

        const confirmResult = await confirmOrderMutation.mutateAsync({
          cartId,
          paymentIntentID,
          token,
        })

        if (confirmResult && confirmResult.orderID) {
          // Delete the cart after successful payment to force a new cart next time
          await deleteCart({ cartId, token })

          Alert.alert('Succès', `Commande ${confirmResult.orderID} confirmée !`)
          router.replace('/(tabs)')
        }
      } catch (error: any) {
        Alert.alert('Erreur', error.message)
      }
    },
    onCancel: () => {
      // No need to delete cart - a new one will be created on next attempt
      console.log('Payment cancelled - cart will remain in database')
    },
  })

  const handlePayment = async () => {
    if (!product) return

    try {
      const token = await authStorage.getToken()
      if (!token) {
        Alert.alert('Erreur', 'Vous devez être connecté pour effectuer un achat')
        return
      }

      // ÉTAPE 1 & 2: Ajouter au cart + Initier le paiement
      console.log('Product to add:', { id: product.id, title: product.title })
      const paymentIntentData = await initiatePaymentMutation.mutateAsync({
        productId: product.id,
        quantity: 1,
        customerEmail: user?.email,
        token,
      })

      const { clientSecret, cartId: returnedCartId } = paymentIntentData
      setCartId(returnedCartId)

      // ÉTAPE 3 & 4: Payer avec Stripe (hook encapsulé)
      await processPayment(clientSecret)
    } catch (error: any) {
      Alert.alert('Erreur', error.message)
    }
  }

  if (isLoadingProduct) {
    return (
      <YStack f={1} jc="center" ai="center">
        <Text>Chargement...</Text>
      </YStack>
    )
  }

  if (!product) {
    return (
      <YStack jc="center" ai="center">
        <Text>Produit non trouvé</Text>
      </YStack>
    )
  }

  const isButtonDisabled = isProcessingPayment
  const price = product.priceInUSD ? (product.priceInUSD / 100).toFixed(2) : '0.00'

  return (
    <ScrollView>
      <YStack p="$4" gap="$6">
        {/* Résumé produit */}
        <YStack gap="$2">
          <Heading size="$6">Récapitulatif</Heading>
          <Text fontSize="$5" fontWeight="600">
            {product.title}
          </Text>
          <Text fontSize="$8" fontWeight="bold" color="$accent">
            {price} €
          </Text>
          <Text fontSize="$3" color="$gray10">
            Quantité : 1
          </Text>
        </YStack>

        {/* Bouton de paiement */}
        <PrimaryButton
          onPress={handlePayment}
          disabled={isButtonDisabled}
          opacity={isButtonDisabled ? 0.5 : 1}
        >
          {isProcessingPayment ? 'Traitement...' : 'Payer maintenant'}
        </PrimaryButton>

        <Text fontSize="$3" color="$gray10" textAlign="center">
          Test Stripe - Utilisez la carte 4242 4242 4242 4242
        </Text>
      </YStack>
    </ScrollView>
  )
}
