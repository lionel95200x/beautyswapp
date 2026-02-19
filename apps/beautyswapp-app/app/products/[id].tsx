import { useLocalSearchParams, Stack } from 'expo-router';
import { YStack, Text } from 'tamagui';
import { useProduct } from '@beautyswapp/payload-client/hooks/useProducts';
import { ProductDetailSkeleton } from '@/components/ProductDetailSkeleton';
import { ProductDetailContent } from '@/components/ProductDetailContent';

export default function ProductDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Erreur',
            headerShown: true,
          }}
        />
        {/* @ts-ignore - Tamagui types issue */}
        <YStack flex={1} jc="center" ai="center" py="$8">
          <Text fontSize="$5" color="$red10">
            Erreur: {error.message}
          </Text>
        </YStack>
      </>
    );
  }

  // Show not found state
  if (!product) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'Introuvable',
            headerShown: true,
          }}
        />
        {/* @ts-ignore - Tamagui types issue */}
        <YStack flex={1} jc="center" ai="center" py="$8">
          <Text fontSize="$5" color="$color">
            Produit introuvable
          </Text>
        </YStack>
      </>
    );
  }

  // Render content with all hooks properly called
  return <ProductDetailContent product={product} />;
}
