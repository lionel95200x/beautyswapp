import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCreatePaymentIntent } from '@beautyswapp/domain/hooks/useCreatePaymentIntent';
import { useAuth } from '@beautyswapp/domain/hooks/useAuth';
import { ShoppingCart, AlertCircle, Loader2 } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface BuyButtonProps {
  productId: string;
}

function CheckoutForm({ onClose }: { onClose: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setError('');
    setIsProcessing(true);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/orders`,
        },
        redirect: 'if_required',
      });

      if (submitError) {
        setError(submitError.message);
        setIsProcessing(false);
      } else {
        window.location.href = '/orders';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <PaymentElement />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!stripe || isProcessing}
            className="flex-1"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Pay'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export function BuyButton(props: BuyButtonProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');
  const createPaymentIntent = useCreatePaymentIntent();
  const { user } = useAuth();

  useEffect(() => {
    if (showCheckout && !clientSecret && user) {
      createPaymentIntent.mutate(
        { productId: props.productId, buyerId: user.id },
        {
          onSuccess: (data) => {
            setClientSecret(data.clientSecret);
          },
        }
      );
    }
  }, [showCheckout, clientSecret, props.productId, user]);

  const handleClose = () => {
    setShowCheckout(false);
    setClientSecret('');
    createPaymentIntent.reset();
  };

  return (
    <>
      <Button onClick={() => setShowCheckout(true)}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        Buy with Stripe
      </Button>

      <Dialog open={showCheckout} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
          </DialogHeader>

          {createPaymentIntent.isPending && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {createPaymentIntent.isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {createPaymentIntent.error instanceof Error
                  ? createPaymentIntent.error.message
                  : 'Failed to initialize payment'}
              </AlertDescription>
            </Alert>
          )}

          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm onClose={handleClose} />
            </Elements>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
