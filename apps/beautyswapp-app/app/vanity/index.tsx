import { YStack, XStack, Heading, Text, useTheme } from 'tamagui';
import { Stack, useRouter } from 'expo-router';
import { SplitBackgroundLayout } from '@/components/login/split-background-layout';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { ImageBanner } from '@/components/ImageBanner';

export default function VanityScreen() {
  const { data: user } = useCurrentUser();
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SplitBackgroundLayout topImage={require('@/assets/images/login/purple-login.jpg')} overlayHeight='90%'>
        <YStack flex={1} padding="$4" paddingTop="$8" gap="$4">
          <XStack position="relative" width="100%" alignItems="center" justifyContent="center">
            <TouchableOpacity
              onPress={() => router.back()}
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
            title="MES ACHATS"
            subtitle="Découvrez les derniers produits beauté"
            image={require('../../assets/images/product/product-kosas-separateur.jpg')}
          />
          <Text fontSize="$4" color="$color" style={{ textAlign: 'center' }}>
            Mes produits en vente
          </Text>

          {user && (
            <Text fontSize="$3" color="$secondary" style={{ textAlign: 'center' }}>
              {user.email}
            </Text>
          )}
        </YStack>
      </SplitBackgroundLayout>
    </>
  );
}
