import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useCreateProduct } from '@beautyswapp/domain/hooks/useCreateProduct';
import { useProfiles } from '@beautyswapp/domain/hooks/useProfiles';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import type { NewProduct, ProductCondition } from '@beautyswapp/domain/types';
import { productCondition } from '@beautyswapp/domain/schema';

export const Route = createFileRoute('/products/create')({
  component: CreateProductPage,
});

const conditionLabels: Record<ProductCondition, string> = {
  sealed_new: 'Scellé - Neuf',
  unsealed_new: 'Non scellé - Neuf',
  swatched: 'Swatché',
  used_very_little: 'Utilisé - très peu',
};

function CreateProductPage() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const { data: profiles, isLoading: profilesLoading } = useProfiles();

  const { register, handleSubmit, setValue } = useForm<NewProduct>({
    defaultValues: {
      sellerCommitmentAccepted: false,
    },
  });

  const onSubmit = async (data: NewProduct) => {
    try {
      await createProduct.mutateAsync({ product: data });
      toast.success('Produit créé');
      navigate({ to: '/products' });
    } catch (error) {
      toast.error('Erreur création');
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Créer un produit</h1>
          <p className="text-muted-foreground">Formulaire de test</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-lg border p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sellerId">Vendeur *</Label>
            {profilesLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Chargement...</span>
              </div>
            ) : profiles && profiles.length > 0 ? (
              <Select onValueChange={(value) => setValue('sellerId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un vendeur" />
                </SelectTrigger>
                <SelectContent>
                  {profiles.map((profile) => (
                    <SelectItem key={profile.id} value={profile.id}>
                      {profile.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground border rounded-md bg-muted">
                Aucun profile disponible
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Marque</Label>
            <Input id="brand" {...register('brand')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input id="title" {...register('title')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Prix</Label>
            <Input id="price" placeholder="25.00" {...register('price')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select onValueChange={(value) => setValue('condition', value as ProductCondition)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {productCondition.enumValues.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {conditionLabels[condition]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={createProduct.isPending}>
              {createProduct.isPending ? 'Création...' : 'Créer'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/products' })}
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
