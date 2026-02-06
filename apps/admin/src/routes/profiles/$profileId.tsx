import { createFileRoute, Link } from '@tanstack/react-router';
import { useProfile } from '@beautyswapp/domain/hooks/useProfile';
import { useProducts } from '@beautyswapp/domain/hooks/useProducts';
import { ArrowLeft, User, Shield, Calendar, AlertTriangle, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/ui/page-layout';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';
import { ProductsTable } from '@/components/ProductsTable';

export const Route = createFileRoute('/profiles/$profileId')({
  component: ProfileDetailPage,
});

function ProfileDetailPage() {
  const { profileId } = Route.useParams();
  const { data: profile, isLoading, error } = useProfile(profileId);
  const { data: products, isLoading: isLoadingProducts } = useProducts({
    filters: { sellerId: profileId },
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!profile) {
    return (
      <PageLayout>
        <ErrorState message="Profil non trouvé" />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/profiles">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux profils
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-muted-foreground" />
                <div>
                  <CardTitle>Profil utilisateur</CardTitle>
                  <CardDescription>Informations détaillées du profil</CardDescription>
                </div>
              </div>
              {profile.isSuspended ? (
                <Badge variant="destructive">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Suspendu
                </Badge>
              ) : (
                <Badge variant="default">Actif</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Identifiant</span>
                </div>
                <p className="font-mono text-sm">{profile.id}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Rôle</span>
                </div>
                <Badge variant="outline">{profile.role}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Historique
            </CardTitle>
            <CardDescription>Dates importantes du profil</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Créé le</p>
              <p className="font-medium">
                {new Date(profile.createdAt).toLocaleDateString('fr-FR', {
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
                {new Date(profile.updatedAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Package className="h-6 w-6" />
              Produits en vente
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Liste des produits mis en vente par ce profil
            </p>
          </div>

          {isLoadingProducts ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  Chargement des produits...
                </div>
              </CardContent>
            </Card>
          ) : products ? (
            <ProductsTable products={products} />
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  Aucun produit
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
