import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getOrCreateCart, addItemToCart, initiatePayment, confirmOrder } from '../payment-client'

/**
 * Hook pour initier un paiement Stripe
 * Flow: getOrCreateCart → addItemToCart → initiatePayment
 */
export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
      customerEmail,
      token,
    }: {
      productId: number
      quantity: number
      customerEmail?: string
      token: string
    }) => {
      // ÉTAPE 1: Récupérer ou créer le cart de l'utilisateur
      const cart = await getOrCreateCart(token)
      console.log('Cart from getOrCreateCart:', cart.id, 'Items:', cart.items)

      // ÉTAPE 2: Vérifier si l'item existe déjà dans le cart
      const cartItems = cart.items || []
      const existingItem = cartItems.find((item) => {
        const itemProductId = typeof item.product === 'object' ? item.product.id : item.product
        return itemProductId === productId
      })

      // ÉTAPE 3: Ajouter l'item au cart seulement s'il n'existe pas déjà
      if (!existingItem) {
        await addItemToCart({
          cartId: cart.id,
          productId,
          quantity,
          token,
        })
        console.log('Item added to cart')
      } else {
        console.log('Item already in cart, skipping add')
      }

      // ÉTAPE 4: Initier le paiement avec le cartId
      const paymentIntentData = await initiatePayment({
        cartId: cart.id,
        customerEmail,
        token,
      })

      // Retourner aussi le cartId pour confirmOrder
      return { ...paymentIntentData, cartId: cart.id }
    },
  })
}

/**
 * Hook pour confirmer une commande après paiement réussi
 */
export const useConfirmOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      cartId,
      paymentIntentID,
      token,
    }: {
      cartId: number
      paymentIntentID: string
      token: string
    }) => {
      const result = await confirmOrder({
        cartId,
        paymentIntentID,
        token,
      })

      return result
    },
    onSuccess: () => {
      // Invalider les queries après succès
      queryClient.invalidateQueries({ queryKey: ['payload', 'products'] })
      queryClient.invalidateQueries({ queryKey: ['payload', 'orders'] })
      queryClient.invalidateQueries({ queryKey: ['payload', 'carts'] })
    },
  })
}
