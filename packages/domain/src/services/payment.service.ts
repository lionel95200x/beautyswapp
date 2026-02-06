import * as paymentRepository from '../repository/payment.repository';
import * as productRepository from '../repository/product.repository';
import * as orderRepository from '../repository/order.repository';
import * as productService from './product.service';
import type { PaymentIntent } from 'stripe';

export async function createPaymentIntent(params: {
  productId: string;
  buyerId: string;
}): Promise<{
  clientSecret: string;
  paymentIntentId: string;
}> {
  const purchaseCheck = await productService.canBePurchased(params.productId);

  if (!purchaseCheck.canBuy) {
    throw new Error(purchaseCheck.reason);
  }

  const product = await productRepository.findById(params.productId);

  const amountInCents = Math.round(Number(product.price) * 100);

  const paymentIntent = await paymentRepository.createPaymentIntent({
    amount: amountInCents,
    currency: 'eur',
    metadata: {
      productId: params.productId,
      buyerId: params.buyerId,
      sellerId: product.sellerId,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
}

export async function handleWebhookEvent(event: Stripe.Event): Promise<void> {
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as PaymentIntent;

    const { productId, buyerId, sellerId } = paymentIntent.metadata;

    if (!productId || !buyerId || !sellerId) {
      console.error('Missing metadata in PaymentIntent:', paymentIntent.id);
      return;
    }

    const existingOrder = await orderRepository.findByStripePaymentId(
      paymentIntent.id
    );

    if (existingOrder) {
      console.log('Order already exists for PaymentIntent:', paymentIntent.id);
      return;
    }

    const productPrice = (paymentIntent.amount / 100).toString();

    await orderRepository.create({
      productId,
      buyerId,
      sellerId,
      amount: productPrice,
      stripePaymentId: paymentIntent.id,
      status: 'paid',
      paidAt: new Date(),
    });

    try {
      console.log('Marking product as sold:', productId);
      await productRepository.markAsSold(productId);
      console.log('Product marked as sold successfully');
    } catch (error) {
      console.error('Failed to mark product as sold:', error);
    }
  }
}
