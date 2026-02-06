import { UseFormReturn } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Save, Loader2 } from 'lucide-react';
import type { ProductFormData } from '@/hooks/useProductForm';
import type { Profile } from '@beautyswapp/domain/types';

interface ProductFormProps {
  form: UseFormReturn<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
  isSubmitting: boolean;
  profiles?: Profile[];
  isLoadingProfiles?: boolean;
}

export function ProductForm({
  form,
  onSubmit,
  onCancel,
  mode,
  isSubmitting,
  profiles,
  isLoadingProfiles,
}: ProductFormProps) {
  const { register, handleSubmit, setValue, watch } = form;
  const isEdit = mode === 'edit';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEdit ? 'Modifier le produit' : 'Créer un produit'}</CardTitle>
        <CardDescription>
          {isEdit ? 'Modifiez les informations du produit' : 'Remplissez le formulaire pour créer un nouveau produit'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {!isEdit && (
              <div className="space-y-2">
                <Label htmlFor="sellerId">Vendeur *</Label>
                {isLoadingProfiles ? (
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
                    Aucun profil disponible
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" {...register('title')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Marque</Label>
              <Input id="brand" {...register('brand')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input id="category" {...register('category')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="25.00"
                {...register('price')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select
                value={watch('condition')}
                onValueChange={(value) => setValue('condition', value as any)}
              >
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Sélectionner une condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sealed_new">Neuf scellé</SelectItem>
                  <SelectItem value="unsealed_new">Neuf non scellé</SelectItem>
                  <SelectItem value="swatched">Échantillonné</SelectItem>
                  <SelectItem value="used_very_little">Très peu utilisé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isEdit && (
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Select
                  value={watch('status')}
                  onValueChange={(value) => setValue('status', value as any)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="submitted">Soumis</SelectItem>
                    <SelectItem value="need_info">Besoin d'infos</SelectItem>
                    <SelectItem value="draft_prepared">Brouillon préparé</SelectItem>
                    <SelectItem value="awaiting_seller_approval">En attente d'approbation</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="blocked">Bloqué</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="batchCode">Code batch</Label>
              <Input id="batchCode" {...register('batchCode')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paoOrExpiry">PAO / Expiration</Label>
              <Input id="paoOrExpiry" {...register('paoOrExpiry')} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              {...register('description')}
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Enregistrement...' : isEdit ? 'Enregistrer' : 'Créer'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
