import { YStack, Heading, Text, Card, XStack, Button, ScrollView } from 'tamagui';
import { Categories } from '../../components/Categories';
import { FeaturedProducts } from '../../components/FeaturedProducts';
import { ImageBanner } from '../../components/ImageBanner';
import { PrimaryButton } from '@/components/ui/button';

export default function HomeScreen() {
  return (
    <ScrollView>
      <YStack flex={1} padding="$4" >


        <YStack gap="$4" marginTop="$4">
          <Categories />
          <PrimaryButton>
            Commencer
          </PrimaryButton>
          <FeaturedProducts />

          <ImageBanner
            title="OFFRES SPÉCIALES"
            subtitle="Découvrez les derniers produits beauté"
            image={require('../../assets/images/product/product-nouveaute-separateur.png')}
          />

          <Card
            elevation="$2"
            size="$4"
            borderWidth="$0.5"
            borderColor="$borderColor"
            padding="$4"
            backgroundColor="$backgroundHover"
          >
            <Card.Header>
              <Heading size="$6" color="$color">
                Your Collection
              </Heading>
            </Card.Header>
            <XStack gap="$4" marginTop="$3">
              <YStack flex={1} alignItems="center">
                <Text fontSize="$7" fontWeight="bold" color="$color">
                  12
                </Text>
                <Text color="$gray10" fontSize="$2">
                  Products
                </Text>
              </YStack>
              <YStack flex={1} alignItems="center">
                <Text fontSize="$7" fontWeight="bold" color="$color">
                  8
                </Text>
                <Text color="$gray10" fontSize="$2">
                  Swaps
                </Text>
              </YStack>
              <YStack flex={1} alignItems="center">
                <Text fontSize="$7" fontWeight="bold" color="$color">
                  24
                </Text>
                <Text color="$gray10" fontSize="$2">
                  Reviews
                </Text>
              </YStack>
            </XStack>
          </Card>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
