import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PrimaryButton } from '@/components/ui/button';
import { SelectField } from '@/components/ui/select';
import { TextInputField } from '@/components/ui/text-input';
import { PhotoUpload } from '@/components/ui/photo-upload';
import { FormError } from '@/components/ui/form-error';
import { Skeleton } from '@/components/ui/skeleton';
import { YStack, Heading, ScrollView } from 'tamagui';
import { useAuth } from '@/hooks/useAuth';
import { useUploadMedia, useCreateProduct } from '@beautyswapp/payload-client/hooks/useProducts';
import { useCategories } from '@beautyswapp/payload-client/hooks/useCategories';
import { uriToFile } from '@/utils/file';
import { createProductSchema, type CreateProductFormData } from '@/schemas/product.schema';

const Subtitle = ({ children }: { children: React.ReactNode }) => (
  <Heading size="$6" color="$purpleText" mt="$2">
    {children}
  </Heading>
);

export default function CreateScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const uploadMedia = useUploadMedia();
  const createProduct = useCreateProduct();
  const { data: categoriesData } = useCategories();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      photos: [],
    },
  });

  const onSubmit = async (data: CreateProductFormData) => {
    if (!user) {
      Alert.alert('Erreur', 'Vous devez être connecté pour créer un produit');
      return;
    }

    try {
      const uploadedMediaIds = await Promise.all(
        data.photos.map(async (photoUri, index) => {
          const file = await uriToFile(photoUri, `photo-${index}.jpg`);
          const media = await uploadMedia.mutateAsync({
            file,
            alt: data.title,
          });
          const mediaId = media.doc.id;
          if (!mediaId) {
            throw new Error('Upload échoué: aucun ID retourné');
          }
          return mediaId;
        })
      );

      const galleryItems = uploadedMediaIds.map((mediaId) => ({ image: mediaId }));

      await createProduct.mutateAsync({
        title: data.title,
        description: data.description,
        priceInUSD: parseFloat(data.price),
        categories: [parseInt(data.category)],
        gallery: galleryItems,
        seller: user.id,
        _status: 'published',
      });

      reset();
      Alert.alert('Succès', 'Produit créé avec succès');
      router.push('/(tabs)/');
    } catch (error) {
      console.error('Erreur création produit:', error);
      Alert.alert('Erreur', 'Impossible de créer le produit. Réessayez.');
    }
  };

  const isLoading = uploadMedia.isPending || createProduct.isPending || isSubmitting;

  if (!categoriesData) {
    return (
      <ScrollView>
        <YStack flex={1} p="$4" bg="$background" gap="$4">
          <Heading size="$8" color="$color">
            Create
          </Heading>

          <Skeleton height={40} />
          <Skeleton height={120} />
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={50} />
        </YStack>
      </ScrollView>
    );
  }

  const categoryItems = categoriesData.docs.map((cat) => ({
    value: String(cat.id),
    label: cat.title,
  }));

  return (
    <ScrollView>
      <YStack flex={1} p="$4" bg="$background" gap="$4">
        <Heading size="$8" color="$color">
          Create
        </Heading>

        <Subtitle>PHOTOS</Subtitle>

        <Controller
          control={control}
          name="photos"
          render={({ field: { onChange } }) => (
            <PhotoUpload title="Photo packaging" onPhotosChange={onChange} />
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

        <PrimaryButton onPress={handleSubmit(onSubmit)} disabled={isLoading}>
          {uploadMedia.isPending
            ? 'Upload photos...'
            : createProduct.isPending
              ? 'Création...'
              : 'Ajouter le produit'}
        </PrimaryButton>
      </YStack>
    </ScrollView>
  );
}
