import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useProduct } from '@beautyswapp/domain/hooks/useProduct';
import { useUpdateProduct } from '@beautyswapp/domain/hooks/useUpdateProduct';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/ui/page-layout';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';
import { ProductForm } from '@/components/ProductForm';
import { useProductForm, productToFormData } from '@/hooks/useProductForm';
import type { ProductFormData } from '@/hooks/useProductForm';
import { toast } from 'sonner';
import { useEffect } from 'react';

export const Route = createFileRoute('/products/$productId/edit')({
  component: ProductEditPage,
});

function ProductEditPage() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useProduct(productId);
  const updateProduct = useUpdateProduct();

  const form = useProductForm({
    defaultValues: product ? productToFormData(product) : undefined,
  });

  useEffect(() => {
    if (product) {
      const formData = productToFormData(product);
      form.reset(formData);
    }
  }, [product]);

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

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await updateProduct.mutateAsync({
        productId,
        data: {
          title: data.title,
          description: data.description,
          brand: data.brand,
          category: data.category,
          condition: data.condition,
          price: data.price,
          batchCode: data.batchCode,
          paoOrExpiry: data.paoOrExpiry,
          status: data.status,
        },
      });

      toast.success('Produit mis à jour avec succès');
      navigate({ to: '/products/$productId', params: { productId } });
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du produit');
    }
  };

  const handleCancel = () => {
    navigate({ to: '/products/$productId', params: { productId } });
  };

  return (
    <PageLayout>
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/products/$productId" params={{ productId }}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au produit
          </Link>
        </Button>
      </div>

      <ProductForm
        form={form}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        mode="edit"
        isSubmitting={updateProduct.isPending}
      />
    </PageLayout>
  );
}
