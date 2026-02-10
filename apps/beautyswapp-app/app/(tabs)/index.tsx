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

        </YStack>
      </YStack>
    </ScrollView>
  );
}
