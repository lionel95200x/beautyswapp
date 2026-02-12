import { Controller, UseFormReturn } from 'react-hook-form';
import { useMemo } from 'react';
import { PrimaryButton } from '@/components/ui/button';
import { SelectField } from '@/components/ui/select';
import { TextInputField } from '@/components/ui/text-input';
import { PhotoUpload } from '@/components/ui/photo-upload';
import { FormError } from '@/components/ui/form-error';
import { YStack, Heading } from 'tamagui';
import type { CreateProductFormData } from '@/schemas/product.schema';
import type { Category, Brand } from '@beautyswapp/payload-client/types';

const Subtitle = ({ children }: { children: React.ReactNode }) => (
  <Heading size="$6" color="$purpleText" mt="$2">
    {children}
  </Heading>
);

interface ProductFormProps {
  form: UseFormReturn<CreateProductFormData>;
  categories: Category[];
  brands: Brand[];
  onSave: (data: CreateProductFormData) => void;
  isLoading: boolean;
  title: string;
  submitLabel: string;
}

export function ProductForm({ form, categories, brands, onSave, isLoading, title, submitLabel }: ProductFormProps) {
  const { control, formState: { errors }, handleSubmit } = form;

  const categoryItems = useMemo(
    () => categories.map((cat) => ({
      value: String(cat.id),
      label: cat.title,
    })),
    [categories]
  );

  const brandItems = useMemo(
    () => brands.map((brand) => ({
      value: String(brand.id),
      label: brand.name,
    })),
    [brands]
  );

  return (
    <YStack gap="$4">
      <Heading size="$8" color="$secondaryPurple">
        {title}
      </Heading>

      <Subtitle>PHOTOS</Subtitle>

      <Controller
        control={control}
        name="photos"
        render={({ field: { onChange, value } }) => (
          <PhotoUpload
            title="Photo packaging"
            onPhotosChange={onChange}
            initialPhotos={value}
          />
        )}
      />
      {errors.photos && <FormError>{errors.photos.message}</FormError>}

      <Subtitle>DESCRIPTION DU PRODUIT</Subtitle>

      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInputField
            title="Titre"
            value={value}
            onChangeText={onChange}
            placeholder="Nom du produit"
          />
        )}
      />
      {errors.title && <FormError>{errors.title.message}</FormError>}

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInputField
            title="Description"
            value={value}
            onChangeText={onChange}
            placeholder="Décrivez votre produit"
            multiline
          />
        )}
      />
      {errors.description && <FormError>{errors.description.message}</FormError>}

      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <SelectField
            title="Catégorie"
            items={categoryItems}
            value={value}
            onValueChange={onChange}
            placeholder="Sélectionnez une catégorie"
          />
        )}
      />
      {errors.category && <FormError>{errors.category.message}</FormError>}

      <Controller
        control={control}
        name="brand"
        render={({ field: { onChange, value } }) => (
          <SelectField
            title="Marque"
            items={brandItems}
            value={typeof value === 'string' ? value : ''}
            onValueChange={onChange}
            placeholder="Sélectionnez une marque (optionnel)"
          />
        )}
      />
      {errors.brand && <FormError>{errors.brand.message}</FormError>}

      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => (
          <TextInputField
            title="Prix"
            value={value}
            onChangeText={onChange}
            placeholder="0.00 €"
            keyboardType="numeric"
          />
        )}
      />
      {errors.price && <FormError>{errors.price.message}</FormError>}

      <PrimaryButton onPress={handleSubmit(onSave)} disabled={isLoading}>
        {isLoading ? 'Enregistrement...' : submitLabel}
      </PrimaryButton>
    </YStack>
  );
}
