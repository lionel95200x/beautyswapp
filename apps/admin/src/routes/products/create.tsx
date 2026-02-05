import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateProduct } from '@beautyswapp/domain/hooks/useCreateProduct';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { NewProduct } from '@beautyswapp/domain/types';

export const Route = createFileRoute('/products/create')({
  component: CreateProductPage,
});

const createProductSchema = z.object({
  sellerId: z.string().uuid('ID vendeur invalide'),
  brand: z.string().min(1, 'Marque requise'),
  title: z.string().min(1, 'Titre requis'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Prix invalide'),
  condition: z.enum(['sealed_new', 'unsealed_new', 'swatched', 'used_very_little']),
});

type CreateProductForm = z.infer<typeof createProductSchema>;

function CreateProductPage() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = async (data: CreateProductForm) => {
    try {
      const product: NewProduct = {
        sellerId: data.sellerId,
        brand: data.brand,
        title: data.title,
        price: data.price,
        condition: data.condition,
        sellerCommitmentAccepted: false,
      };

      await createProduct.mutateAsync({ product });
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

        <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-lg border p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sellerId">Seller ID *</Label>
            <Input
              id="sellerId"
              placeholder="00000000-0000-0000-0000-000000000000"
              {...register('sellerId')}
            />
            {errors.sellerId && (
              <p className="text-sm text-destructive">{errors.sellerId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Marque *</Label>
            <Input
              id="brand"
              placeholder="Dior"
              {...register('brand')}
            />
            {errors.brand && (
              <p className="text-sm text-destructive">{errors.brand.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              placeholder="Rouge Dior 999"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Prix *</Label>
            <Input
              id="price"
              placeholder="25.00"
              {...register('price')}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition *</Label>
            <Select onValueChange={(value) => setValue('condition', value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sealed_new">Scellé - Neuf</SelectItem>
                <SelectItem value="unsealed_new">Non scellé - Neuf</SelectItem>
                <SelectItem value="swatched">Swatché</SelectItem>
                <SelectItem value="used_very_little">Utilisé - très peu</SelectItem>
              </SelectContent>
            </Select>
            {errors.condition && (
              <p className="text-sm text-destructive">{errors.condition.message}</p>
            )}
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
