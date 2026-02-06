import { createFileRoute, Link } from '@tanstack/react-router';
import { useProduct } from '@beautyswapp/domain/hooks/useProduct';
import { ArrowLeft, Package, Tag, AlertCircle, Calendar, User, Edit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/ui/page-layout';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';

export const Route = createFileRoute('/products/$productId/')({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!product) {
    return (
      <PageLayout>
        <ErrorState message="Produit non trouvé" />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link to="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux produits
          </Link>
        </Button>
        <Button asChild>
          <Link to="/products/$productId/edit" params={{ productId }}>
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-muted-foreground" />
                <div>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>Détails du produit</CardDescription>
                </div>
              </div>
              <Badge>{product.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {product.description && (
              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span>Marque</span>
                </div>
                <p className="font-medium">{product.brand}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>Catégorie</span>
                </div>
                <p className="font-medium">{product.category}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>Condition</span>
                </div>
                <Badge variant="secondary">{product.condition}</Badge>
              </div>

              {product.price && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    <span>Prix</span>
                  </div>
                  <p className="text-2xl font-bold">{product.price} €</p>
                </div>
              )}
            </div>

            {(product.batchCode || product.paoOrExpiry) && (
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Informations produit</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {product.batchCode && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Code batch</p>
                      <p className="font-mono text-sm">{product.batchCode}</p>
                    </div>
                  )}
                  {product.paoOrExpiry && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">PAO / Expiration</p>
                      <p className="font-medium">{product.paoOrExpiry}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Vendeur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              to="/profiles/$profileId"
              params={{ profileId: product.sellerId }}
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <span className="font-mono text-sm">{product.sellerId}</span>
            </Link>
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
              <p className="text-sm text-muted-foreground">Créé le</p>
              <p className="font-medium">
                {new Date(product.createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Dernière mise à jour</p>
              <p className="font-medium">
                {new Date(product.updatedAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            {product.publishedAt && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Publié le</p>
                <p className="font-medium">
                  {new Date(product.publishedAt).toLocaleDateString('fr-FR', {
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
      </div>
    </PageLayout>
  );
}
