import { useMemo } from 'react';
import { YStack, XStack, Text, ScrollView } from 'tamagui';
import { Stack } from 'expo-router';
import { useProductsBySeller } from '@beautyswapp/payload-client/hooks/useProducts';
import { getMediaUrl } from '@beautyswapp/payload-client/utils';
import { extractTextFromRichText } from '@beautyswapp/payload-client/types';
import { PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { Tabs } from '@/components/Tabs';
import { ProductsGrid } from '@/components/ProductsGrid';
import { ProductImage } from '@/components/ProductDetail/ProductImage';
import { ProductInfo } from '@/components/ProductDetail/ProductInfo';
import { SellerInfo } from '@/components/ProductDetail/SellerInfo';
import type { Product, User, Brand } from '@beautyswapp/payload-client/types';

interface ProductDetailContentProps {
  product: Product;
}

/**
 * Extrait l'ID d'une relation Payload (objet ou ID)
 */
function getRelationId(value: { id: number } | number | null | undefined): number | undefined {
  if (!value) return undefined;
  return typeof value === 'object' ? value.id : value;
}

/**
 * Extrait l'objet d'une relation Payload
 */
function getRelation<T>(value: T | number | null | undefined): T | undefined {
  if (!value) return undefined;
  return typeof value === 'object' ? value : undefined;
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  // Mémoisation des données extraites
  const imageUrl = useMemo(() => {
    const firstImage = product.gallery?.[0]?.image;
    if (firstImage && typeof firstImage === 'object' && firstImage.url) {
      return getMediaUrl(firstImage.url);
    }
    return null;
  }, [product.gallery]);

  const seller = useMemo<User | undefined>(
    () => getRelation<User>(product.seller),
    [product.seller]
  );

  const brand = useMemo<Brand | undefined>(
    () => product.brands?.[0] ? getRelation<Brand>(product.brands[0]) : undefined,
    [product.brands]
  );

  const description = useMemo(
    () => extractTextFromRichText(product.description),
    [product.description]
  );

  const sellerId = useMemo(
    () => getRelationId(product.seller),
    [product.seller]
  );

  // Hook pour récupérer les produits du vendeur
  const { data: productsData, isLoading: isLoadingProducts, error: errorProducts } = useProductsBySeller(sellerId);

  const products = productsData?.docs;

  // Mémoisation des tabs
  const tabs = useMemo(() => [
    {
      id: 'selling',
      label: 'Vanity du swappeur',
      content: (
        <ProductsGrid
          products={products}
          isLoading={isLoadingProducts}
          error={errorProducts}
          emptyMessage="Aucun produit en vente"
        />
      ),
    },
    {
      id: 'purchases',
      label: 'Vous pourriez aimer',
      content: (
        <YStack flex={1} p="$4">
          <Text color="$gray10">
            Fonctionnalité en cours de développement
          </Text>
        </YStack>
      ),
    },
  ], [products, isLoadingProducts, errorProducts]);

  return (
    <>
      <Stack.Screen
        options={{
          title: product.title,
          headerShown: true,
        }}
      />
      <ScrollView background="$background">
        <YStack flex={1}>
          {/* Product Image */}
          <ProductImage imageUrl={imageUrl} productTitle={product.title} />

          {/* Product Info */}
          <YStack p="$4" gap="$4">
            {/* Main Info - Flex Layout */}
            {/* @ts-ignore - Tamagui types issue */}
            <XStack gap="$4" ai="flex-start">
              {/* Left Side - Product Info */}
              <ProductInfo
                title={product.title}
                brand={brand}
                priceInUSD={product.priceInUSD}
              />

              {/* Right Side - Seller Info */}
              {seller && <SellerInfo seller={seller} />}
            </XStack>

            {/* Description */}
            {description && (
              <YStack gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$secondary" textTransform="uppercase">
                  Description du produit
                </Text>
                <Text fontSize="$3" color="$gray10" lineHeight="$3">
                  {description}
                </Text>
              </YStack>
            )}

            {/* Action Buttons */}
            <YStack gap="$3" flexDirection="row">
              <PrimaryButton size="$5">
                Acheter
              </PrimaryButton>
              <SecondaryButton>
                Message
              </SecondaryButton>
            </YStack>

            <Text fontSize="$3" color="$purpleText" py="$2">
              Le droit de rétractation conformément l'article
            </Text>

            {/* Tabs - Related Products */}
            <Tabs tabs={tabs} defaultTab="selling" />
          </YStack>
        </YStack>
      </ScrollView>
    </>
  );
}
