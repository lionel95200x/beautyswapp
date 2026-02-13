import { PAYLOAD_API_URL } from './config'

interface Address {
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state?: string
  postalCode: string
  country: string
  phone: string
}

interface Cart {
  id: number
  items: Array<{
    id: string
    product: number | { id: number }
    quantity: number
  }>
  customer?: number | { id: number }
}

/**
 * Récupère ou crée le cart de l'utilisateur connecté
 * Pour un utilisateur authentifié, le cart est automatiquement lié via JWT
 */
export async function getOrCreateCart(token: string): Promise<Cart> {
  // Récupérer le cart de l'utilisateur (filtré côté serveur via JWT)
  const getResponse = await fetch(`${PAYLOAD_API_URL}/api/carts?limit=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (getResponse.ok) {
    const data = await getResponse.json()
    if (data.docs && data.docs.length > 0) {
      const cart = data.docs[0]
      console.log('Cart from API:', cart)
      console.log('Cart ID type:', typeof cart.id, 'Value:', cart.id)
      return cart
    }
  }

  // Créer un nouveau cart si aucun n'existe
  const createResponse = await fetch(`${PAYLOAD_API_URL}/api/carts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items: [],
    }),
  })

  if (!createResponse.ok) {
    const error = await createResponse.json()
    throw new Error(error.message ?? 'Failed to create cart')
  }

  const newCart = await createResponse.json()
  // Ensure items is always an array
  if (!newCart.items) {
    newCart.items = []
  }
  return newCart
}

/**
 * Vide le cart
 * Endpoint: POST /api/carts/:cartID/clear-cart
 */
export async function clearCart(data: { cartId: number; token: string }): Promise<{ success: boolean }> {
  const response = await fetch(`${PAYLOAD_API_URL}/api/carts/${data.cartId}/clear-cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({}),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message ?? 'Failed to clear cart')
  }

  return response.json()
}

/**
 * Supprime un cart
 * Endpoint: DELETE /api/carts/:cartID
 */
export async function deleteCart(data: { cartId: number; token: string }): Promise<void> {
  const response = await fetch(`${PAYLOAD_API_URL}/api/carts/${data.cartId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message ?? 'Failed to delete cart')
  }
}

/**
 * Ajoute un produit au cart
 * Endpoint: POST /api/carts/:cartID/add-item
 */
export async function addItemToCart(data: {
  cartId: number
  productId: number
  quantity: number
  token: string
}): Promise<{ success: boolean; cart: Cart }> {
  const response = await fetch(`${PAYLOAD_API_URL}/api/carts/${data.cartId}/add-item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      item: {
        product: data.productId,
      },
      quantity: data.quantity,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message ?? 'Failed to add item to cart')
  }

  return response.json()
}

/**
 * Initie un paiement Stripe
 * Endpoint: POST /stripe/initiate
 */
export async function initiatePayment(data: {
  cartId: number
  customerEmail?: string
  billingAddress?: Address
  shippingAddress?: Address
  token: string
}): Promise<{ client_secret: string; paymentIntentID: string }> {
  console.log('[PAYMENT DEBUG] ========================================')
  console.log('[PAYMENT DEBUG] Initiating payment with cartId:', data.cartId, 'Type:', typeof data.cartId)
  console.log('[PAYMENT DEBUG] Customer email:', data.customerEmail)
  console.log('[PAYMENT DEBUG] Has billing address:', !!data.billingAddress)
  console.log('[PAYMENT DEBUG] Has shipping address:', !!data.shippingAddress)

  const body = {
    cartID: String(data.cartId),
    currency: 'usd',
    ...(data.customerEmail && { customerEmail: data.customerEmail }),
    ...(data.billingAddress && { billingAddress: data.billingAddress }),
    ...(data.shippingAddress && { shippingAddress: data.shippingAddress }),
  }
  console.log('[PAYMENT DEBUG] Request body:', JSON.stringify(body, null, 2))

  const response = await fetch(`${PAYLOAD_API_URL}/api/payments/stripe/initiate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify(body),
  })

  console.log('[PAYMENT DEBUG] Response status:', response.status)
  console.log('[PAYMENT DEBUG] Response statusText:', response.statusText)

  if (!response.ok) {
    const errorText = await response.text()
    console.error('[PAYMENT DEBUG] Response error text:', errorText)
    try {
      const error = JSON.parse(errorText)
      console.error('[PAYMENT DEBUG] Parsed error:', JSON.stringify(error, null, 2))
      throw new Error(error.message ?? 'Failed to initiate payment')
    } catch (e) {
      console.error('[PAYMENT DEBUG] Failed to parse error response:', e)
      throw new Error(`Failed to initiate payment: ${errorText}`)
    }
  }

  const result = await response.json()
  console.log('[PAYMENT DEBUG] Success response:', JSON.stringify(result, null, 2))
  console.log('[PAYMENT DEBUG] ========================================')

  return result
}

/**
 * Confirme la commande après paiement réussi
 * Endpoint: POST /api/payments/stripe/confirm-order
 */
export async function confirmOrder(data: {
  cartId: number
  paymentIntentID: string
  token: string
}): Promise<{ orderID: string }> {
  const response = await fetch(`${PAYLOAD_API_URL}/api/payments/stripe/confirm-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`,
    },
    body: JSON.stringify({
      cartID: String(data.cartId),
      currency: 'usd',
      paymentIntentID: data.paymentIntentID,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message ?? 'Order confirmation failed')
  }

  return response.json()
}
