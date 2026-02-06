import { useMutation } from '@tanstack/react-query';

interface CreatePaymentIntentParams {
  productId: string;
  buyerId: string;
}

interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: async (params: CreatePaymentIntentParams): Promise<CreatePaymentIntentResponse> => {
      const response = await fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      return response.json();
    },
  });
}
