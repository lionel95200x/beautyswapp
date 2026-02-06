import { createFileRoute, Link } from '@tanstack/react-router';
import { useOrder } from '@beautyswapp/domain/hooks/useOrder';
import { ArrowLeft, ShoppingCart, Package, User, CreditCard, Calendar, Truck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/ui/page-layout';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';

export const Route = createFileRoute('/orders/$orderId')({
  component: OrderDetailPage,
});

function OrderDetailPage() {
  const { orderId } = Route.useParams();
  const { data: order, isLoading, error } = useOrder(orderId);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!order) {
    return (
      <PageLayout>
        <ErrorState message="Commande non trouvée" />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux commandes
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                <div>
                  <CardTitle>Commande</CardTitle>
                  <CardDescription className="font-mono text-sm">{order.id}</CardDescription>
                </div>
              </div>
              <Badge>{order.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>Produit</span>
                </div>
                <Link
                  to="/products/$productId"
                  params={{ productId: order.productId }}
                  className="text-primary hover:underline font-mono text-sm"
                >
                  {order.productId}
                </Link>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span>Montant</span>
                </div>
                <p className="text-2xl font-bold">{order.amount} €</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Participants
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Acheteur</p>
                <Link
                  to="/profiles/$profileId"
                  params={{ profileId: order.buyerId }}
                  className="text-primary hover:underline font-mono text-sm"
                >
                  {order.buyerId}
                </Link>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Vendeur</p>
                <Link
                  to="/profiles/$profileId"
                  params={{ profileId: order.sellerId }}
                  className="text-primary hover:underline font-mono text-sm"
                >
                  {order.sellerId}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Livraison
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {order.trackingNumber && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Numéro de suivi</p>
                <p className="font-mono text-sm">{order.trackingNumber}</p>
              </div>
            )}

            {order.shippingLabelUrl && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Étiquette de livraison</p>
                <a
                  href={order.shippingLabelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  Télécharger
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Historique
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Créée le</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            {order.paidAt && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Payée le</p>
                <p className="font-medium">
                  {new Date(order.paidAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            )}

            {order.shippedAt && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Expédiée le</p>
                <p className="font-medium">
                  {new Date(order.shippedAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            )}

            {order.deliveredAt && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Livrée le</p>
                <p className="font-medium">
                  {new Date(order.deliveredAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Paiement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Stripe Payment ID</p>
              <p className="font-mono text-sm">{order.stripePaymentId}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
