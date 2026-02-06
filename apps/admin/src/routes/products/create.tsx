import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useCreateProduct } from '@beautyswapp/domain/hooks/useCreateProduct';
import { useProfiles } from '@beautyswapp/domain/hooks/useProfiles';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PageLayout } from '@/components/ui/page-layout';
import { ProductForm } from '@/components/ProductForm';
import { useProductForm } from '@/hooks/useProductForm';
import type { ProductFormData } from '@/hooks/useProductForm';
import { ArrowLeft } from 'lucide-react';

export const Route = createFileRoute('/products/create')({
  component: CreateProductPage,
});

function CreateProductPage() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const { data: profiles, isLoading: profilesLoading } = useProfiles();

  const form = useProductForm({
    defaultValues: {
      brand: '',
      category: '',
      condition: 'sealed_new',
      batchCode: '',
      paoOrExpiry: '',
      title: '',
      description: '',
      price: '',
      status: 'submitted',
    },
  });

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await createProduct.mutateAsync({
        product: {
          sellerId: data.sellerId,
          brand: data.brand,
          category: data.category,
          condition: data.condition,
          batchCode: data.batchCode,
          paoOrExpiry: data.paoOrExpiry,
          title: data.title,
          description: data.description,
          price: data.price,
          sellerCommitmentAccepted: false,
        },
      });

      toast.success('Produit créé avec succès');
      navigate({ to: '/products' });
    } catch (error) {
      toast.error('Erreur lors de la création du produit');
    }
  };

  const handleCancel = () => {
    navigate({ to: '/products' });
  };

  return (
    <PageLayout>
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux produits
          </Link>
        </Button>
      </div>

      <ProductForm
        form={form}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        mode="create"
        isSubmitting={createProduct.isPending}
        profiles={profiles}
        isLoadingProfiles={profilesLoading}
      />
    </PageLayout>
  );
}
