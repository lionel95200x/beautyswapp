import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollView, YStack } from 'tamagui';
import { useAuth } from '@/hooks/useAuth';
import { usePhotoUpload } from '@/hooks/usePhotoUpload';
import { useCreateProduct } from '@beautyswapp/payload-client/hooks/useProducts';
import { useCategories } from '@beautyswapp/payload-client/hooks/useCategories';
import { useBrands } from '@beautyswapp/payload-client/hooks/useBrands';
import { ProductForm } from '@/components/ProductForm';
import { ProductFormSkeleton } from '@/components/ProductFormSkeleton';
import { createProductSchema, type CreateProductFormData } from '@/schemas/product.schema';

export default function CreateScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: categoriesData } = useCategories();
  const { data: brandsData } = useBrands();
  const { uploadPhotos, isUploading } = usePhotoUpload();
  const createProduct = useCreateProduct();

  console.log('Categories:', categoriesData);
  console.log('Brands:', brandsData);
  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      brand: '',
      photos: [],
    },
  });

  const handleSave = async (data: CreateProductFormData) => {
    if (!user) {
      Alert.alert('Erreur', 'Vous devez être connecté pour créer un produit');
      return;
    }

    try {
      const uploadedMediaIds = await uploadPhotos(data.photos, data.title);
      const galleryItems = uploadedMediaIds.map((mediaId) => ({ image: mediaId }));

      await createProduct.mutateAsync({
        title: data.title,
        description: data.description,
        priceInUSD: parseFloat(data.price) * 100,
        categories: [parseInt(data.category)],
        brand: data.brand ? parseInt(data.brand) : undefined,
        gallery: galleryItems,
        seller: user.id,
        _status: 'published',
      });

      form.reset();
      Alert.alert('Succès', 'Produit créé avec succès');
      router.push('/(tabs)/');
    } catch (error) {
      console.error('Erreur création produit:', error);
      Alert.alert('Erreur', 'Impossible de créer le produit. Réessayez.');
    }
  };

  if (!categoriesData || !brandsData) {
    return (
      <ScrollView>
        <ProductFormSkeleton />
      </ScrollView>
    );
  }

  const isLoading = isUploading || createProduct.isPending || form.formState.isSubmitting;

  return (
    <ScrollView>
      <YStack flex={1} p="$4" bg="$background">
        <ProductForm
          form={form}
          categories={categoriesData.docs}
          brands={brandsData.docs}
          onSave={handleSave}
          isLoading={isLoading}
          title="VENDS TON PRODUIT !"
          submitLabel="Ajouter le produit"
        />
      </YStack>
    </ScrollView>
  );
}
