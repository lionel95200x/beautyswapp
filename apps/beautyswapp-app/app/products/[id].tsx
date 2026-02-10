import { useLocalSearchParams, Stack } from 'expo-router';
import { YStack, XStack, Heading, Text, Button, ScrollView, Avatar, Card, Image } from 'tamagui';
import { useProducts } from '@beautyswapp/payload-client/hooks/useProducts';
import { getMediaUrl } from '@beautyswapp/payload-client/utils';
import type { Media, User } from '@beautyswapp/payload-client/types';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useProducts();

  const product = data?.docs?.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
        <Text fontSize="$5" color="$color">
          Product not found
        </Text>
      </YStack>
    );
  }

  const firstImage = product.gallery?.[0]?.image as Media | undefined;
  const imageUrl = firstImage?.url ? getMediaUrl(firstImage.url) : null;
  const seller = product.seller as User;

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
          <YStack height={400} background="$background" justifyContent="center" alignItems="center">
            {imageUrl ? (
              <Image
                src={{ uri: imageUrl }}
                width={300}
                height={300}
              />
            ) : (
              <YStack
                width={300}
                height={300}
                background="$gray10"
                justifyContent="center"
                alignItems="center"
              >
                <Text color="$background" fontSize="$5">
                  Aucune image
                </Text>
              </YStack>
            )}
          </YStack>

          {/* Product Info */}
          <YStack padding="$4" gap="$4">
            {/* Title and Seller */}
            <YStack gap="$2">
              <Heading size="$8" color="$color">
                {product.title}
              </Heading>
              <XStack gap="$2" alignItems="center">
                <Avatar circular size="$3">
                  <Avatar.Fallback backgroundColor="$secondary" />
                </Avatar>
                <Text fontSize="$3" color="$gray10">
                  {seller?.name ? seller.name : seller?.email}
                </Text>
              </XStack>
            </YStack>

            {/* Price */}
            <Heading size="$7" color="$accent">
              {product.priceInUSD ? `${(product.priceInUSD / 100).toFixed(2)} €` : 'Prix sur demande'}
            </Heading>

            {/* Description */}
            {product.description && (
              <YStack gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$secondary" textTransform="uppercase">
                  Description du produit
                </Text>
                <Text fontSize="$3" color="$gray10" lineHeight="$3">
                  Description disponible
                </Text>
              </YStack>
            )}

            {/* Action Buttons */}
            <YStack gap="$3">
              <Button size="$5" backgroundColor="$primary" color="white">
                Acheter
              </Button>
              <Button size="$5" backgroundColor="$secondary" color="white">
                Message
              </Button>
              <Button size="$5" backgroundColor="$accent" color="white">
                Faire une offre
              </Button>
            </YStack>

            {/* Additional Actions */}
            <XStack gap="$3">
              <Button flex={1} backgroundColor="$accent" color="white">
                Verre du swappeur
              </Button>
              <Button flex={1} backgroundColor="$accent" color="white">
                Vous pourrez ouvrir
              </Button>
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </>
  );
}
