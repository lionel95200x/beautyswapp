import { Alert } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { ScrollView, YStack } from 'tamagui';
import { useAuth } from '@/hooks/useAuth';
import { usePhotoUpload } from '@/hooks/usePhotoUpload';
import { useUpdateProduct, useProduct } from '@beautyswapp/payload-client/hooks/useProducts';
import { useCategories } from '@beautyswapp/payload-client/hooks/useCategories';
import { useBrands } from '@beautyswapp/payload-client/hooks/useBrands';
import { ProductForm } from '@/components/ProductForm';
import { ProductFormSkeleton } from '@/components/ProductFormSkeleton';
import { createProductSchema, type CreateProductFormData } from '@/schemas/product.schema';
import { getExistingPhotoUrls, getExistingMediaIds, separatePhotos } from '@/utils/product-helpers';

export default function EditProductScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const { data: categoriesData } = useCategories();
  const { data: brandsData } = useBrands();
  const { data: product, isLoading: productLoading } = useProduct(productId);
  const { uploadPhotos, isUploading } = usePhotoUpload();
  const updateProduct = useUpdateProduct();

  // Transformer le produit en valeurs de formulaire
  const formValues = useMemo<CreateProductFormData | undefined>(() => {
    if (!product) return undefined;

    const firstCategory = Array.isArray(product.categories) && product.categories.length > 0
      ? product.categories[0]
      : null;
    const categoryId = typeof firstCategory === 'number' ? firstCategory : firstCategory?.id;

    const brand = product.brand;
    const brandId = typeof brand === 'number' ? brand : brand?.id;

    return {
      title: product.title,
      description: typeof product.description === 'string' ? product.description : '',
      price: product.priceInUSD ? (product.priceInUSD / 100).toString() : '',
      category: categoryId ? String(categoryId) : '',
      brand: brandId ? String(brandId) : undefined,
      photos: getExistingPhotoUrls(product.gallery),
    };
  }, [product]);

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    values: formValues,
    resetOptions: {
      keepDirtyValues: true, // Garde les modifications de l'utilisateur si les données se rechargent
    },
  });

  const handleSave = async (data: CreateProductFormData) => {
    if (!user) {
      Alert.alert('Erreur', 'Vous devez être connecté pour modifier un produit');
      return;
    }

    try {
      // Séparer photos existantes (URLs) et nouvelles (URIs)
      const { existingUrls, newUris } = separatePhotos(data.photos);

      // Récupérer les IDs des médias existants
      const existingMediaIds = getExistingMediaIds(product?.gallery, existingUrls);

      // Upload des nouvelles photos
      const newMediaIds = newUris.length > 0
        ? await uploadPhotos(newUris, data.title)
        : [];

      const allMediaIds = [...existingMediaIds, ...newMediaIds];
      const galleryItems = allMediaIds.map((mediaId) => ({ image: mediaId }));

      await updateProduct.mutateAsync({
        id: productId,
        data: {
          title: data.title,
          description: data.description,
          priceInUSD: parseFloat(data.price) * 100,
          categories: [parseInt(data.category)],
          brand: data.brand ? parseInt(data.brand) : undefined,
          gallery: galleryItems,
          _status: 'published',
        },
      });

      Alert.alert('Succès', 'Produit modifié avec succès');
      router.push('/vanity/');
    } catch (error) {
      console.error('Erreur modification produit:', error);
      Alert.alert('Erreur', 'Impossible de modifier le produit. Réessayez.');
    }
  };

  if (productLoading || !categoriesData || !brandsData || !product) {
    return (
      <>
        <Stack.Screen options={{ title: 'Modifier le produit', headerShown: true }} />
        <ScrollView>
          <ProductFormSkeleton />
        </ScrollView>
      </>
    );
  }

  const isLoading = isUploading || updateProduct.isPending || form.formState.isSubmitting;

  return (
    <>
      <Stack.Screen options={{ title: 'Modifier le produit', headerShown: true }} />
      <ScrollView>
        <YStack flex={1} p="$4" bg="$background">
          <ProductForm
            form={form}
            categories={categoriesData.docs}
            brands={brandsData.docs}
            onSave={handleSave}
            isLoading={isLoading}
            title="MODIFIER TON PRODUIT"
            submitLabel="Modifier le produit"
          />
        </YStack>
      </ScrollView>
    </>
  );
}
