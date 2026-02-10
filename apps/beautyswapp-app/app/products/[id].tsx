import { useLocalSearchParams, Stack } from 'expo-router';
import { YStack, XStack, Heading, Text, Button, ScrollView, Avatar, Spinner, Image } from 'tamagui';
import { useProduct } from '@beautyswapp/payload-client/hooks/useProducts';
import { getMediaUrl } from '@beautyswapp/payload-client/utils';
import type { Media, User } from '@beautyswapp/payload-client/types';
import { PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { Badge } from '@/components/ui/Badge';

function extractTextFromRichText(richText: any): string {
  if (!richText || !richText.root || !richText.root.children) {
    return '';
  }

  return richText.root.children
    .map((child: any) => {
      if (child.text) {
        return child.text;
      }
      if (child.children) {
        return child.children.map((c: any) => c.text || '').join('');
      }
      return '';
    })
    .join(' ');
}

export default function ProductDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const { id } = params;

  const { data: product, isLoading, error } = useProduct(id);

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" paddingVertical="$8">
        <Spinner size="large" color="$color" />
        <Text marginTop="$4" fontSize="$4" color="$gray10">
          Chargement du produit...
        </Text>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" paddingVertical="$8">
        <Text fontSize="$5" color="$red10">
          Erreur: {error.message}
        </Text>
      </YStack>
    );
  }

  if (!product) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" paddingVertical="$8">
        <Text fontSize="$5" color="$color">
          Produit introuvable
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
                <YStack gap="$2">
                  {seller?.name && (
                    <Text fontSize="$3" color="$gray10">
                      {seller.name}
                    </Text>
                  )}
                  <XStack gap="$2">
                    <Badge text="Profil vérifié" />
                    <Badge text="Swappeuse or" />
                  </XStack>
                </YStack>
              </XStack>
            </YStack>

            {/* Price */}
            {product.priceInUSD && (
              <Heading size="$7" color="$accent">
                {`${(product.priceInUSD / 100).toFixed(2)} €`}
              </Heading>
            )}

            {/* Description */}
            {product.description && (
              <YStack gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$secondary" textTransform="uppercase">
                  Description du produit
                </Text>
                <Text fontSize="$3" color="$gray10" lineHeight="$3">
                  {extractTextFromRichText(product.description)}
                </Text>
              </YStack>
            )}

            {/* Action Buttons */}
            <YStack gap="$3">
              <PrimaryButton size="$5">
                Acheter
              </PrimaryButton>
              <SecondaryButton >
                Message
              </SecondaryButton>
            </YStack>

            <Text fontSize="$3" color="$purpleText" paddingVertical="$2">
              Le droit de rétractation  conformément l’article
            </Text>
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
      </ScrollView >
    </>
  );
}
