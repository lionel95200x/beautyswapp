import { createFileRoute, Link } from '@tanstack/react-router';
import { useProducts } from '@beautyswapp/domain/hooks/useProducts';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/ui/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';
import { ProductsTable } from '@/components/ProductsTable';

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!products) {
    return null;
  }

  return (
    <PageLayout>
      <PageHeader
        title="Produits"
        description="Liste des produits publiés sur BeautySwapp"
        action={
          <Button asChild>
            <Link to="/products/create">
              <Plus className="h-4 w-4 mr-2" />
              Créer
            </Link>
          </Button>
        }
      />

      <ProductsTable products={products} />
    </PageLayout>
  );
}
