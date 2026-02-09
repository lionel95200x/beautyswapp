import { useLocalSearchParams, Stack } from 'expo-router';
import { YStack, XStack, Heading, Text, Button, ScrollView, Avatar, Card, Image } from 'tamagui';
import { useProducts } from '@beautyswapp/medusa-client/hooks/useProducts';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useProducts();

  const product = data?.products?.find((p) => p.id === id);

  if (!product) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
        <Text fontSize="$5" color="$color">
          Product not found
        </Text>
      </YStack>
    );
  }

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
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
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
                  <Avatar.Image src="https://picsum.photos/100" />
                  <Avatar.Fallback backgroundColor="$secondary" />
                </Avatar>
                <Text fontSize="$3" color="$gray10">
                  Nom du vendeur
                </Text>
              </XStack>
            </YStack>

            {/* Price */}
            <Heading size="$7" color="$color">
              {product.variants?.[0]?.calculated_price?.calculated_amount
                ? `${product.variants[0].calculated_price.calculated_amount} ${product.variants[0].calculated_price.currency_code}`
                : 'Prix non disponible'}
            </Heading>

            {/* Description */}
            {product.description && (
              <YStack gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$secondary" textTransform="uppercase">
                  Description du produit
                </Text>
                <Text fontSize="$3" color="$gray10" lineHeight="$3">
                  {product.description}
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

            {/* Product Variants or Related */}
            {product.variants && product.variants.length > 1 && (
              <YStack gap="$3" marginTop="$4">
                <Text fontSize="$4" fontWeight="600" color="$color">
                  Variantes
                </Text>
                <XStack gap="$3">
                  {product.variants.slice(0, 3).map((variant) => (
                    <Card
                      key={variant.id}
                      flex={1}
                      padding="$3"
                      backgroundColor="$backgroundHover"
                      borderWidth="$0.5"
                      borderColor="$borderColor"
                    >
                      <Text fontSize="$2" color="$gray10" numberOfLines={2}>
                        {variant.title}
                      </Text>
                    </Card>
                  ))}
                </XStack>
              </YStack>
            )}
          </YStack>
        </YStack>
      </ScrollView>
    </>
  );
}
