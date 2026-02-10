import { YStack, XStack, Heading, Text, useTheme } from 'tamagui';
import { Stack, useRouter } from 'expo-router';
import { SplitBackgroundLayout } from '@/components/login/split-background-layout';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { ImageBanner } from '@/components/ImageBanner';
import { ProductsGrid } from '@/components/ProductsGrid';
import { Tabs } from '@/components/Tabs';
import { useProductsBySeller } from '@beautyswapp/payload-client/hooks/useProducts';

export default function VanityScreen() {
  const { data: user } = useCurrentUser();
  const router = useRouter();
  const theme = useTheme();

  const { data: productsData, isLoading, error } = useProductsBySeller(user?.id as number);
  const products = productsData?.docs;

  const tabs = [
    {
      id: 'selling',
      label: 'Mes produits en vente',
      content: (
        <ProductsGrid
          products={products}
          isLoading={isLoading}
          error={error}
          emptyMessage="Aucun produit en vente"
        />
      ),
    },
    {
      id: 'purchases',
      label: 'Mes achats',
      content: (
        <YStack flex={1} ai="center" jc="center" padding="$4">
          <Text color="$gray10" ta="center">
            Fonctionnalité en cours de développement
          </Text>
        </YStack>
      ),
    },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SplitBackgroundLayout topImage={require('@/assets/images/login/purple-login.jpg')} overlayHeight='90%'>
        <YStack flex={1} padding="$4" paddingTop="$8" gap="$4">
          <XStack position="relative" width="100%" alignItems="center" justifyContent="center">
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              style={{ position: 'absolute', left: 0, zIndex: 10 }}
            >
              <Ionicons name="chevron-back" size={32} color={theme.secondary.val} />
            </TouchableOpacity>
            <Heading size="$8" color="$secondary">
              MON VANITY
            </Heading>
          </XStack>

          <YStack alignItems="center">
            <Text color="$accent" style={{ textTransform: 'uppercase', textAlign: 'center' }}>
              Bienvenue dans ton Vanity !
              Publie, gère et retrouve tous tes produits
            </Text>
          </YStack>

          <ImageBanner
            title="MES PRODUITS"
            subtitle="Gérez vos produits et vos achats"
            image={require('../../assets/images/product/product-kosas-separateur.jpg')}
          />

          <Tabs tabs={tabs} defaultTab="selling" />
        </YStack>
      </SplitBackgroundLayout>
    </>
  );
}
