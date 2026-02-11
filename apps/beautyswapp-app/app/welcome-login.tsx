import { SplitBackgroundLayout } from '@/components/login/split-background-layout';
import { PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { YStack, Text, Heading } from 'tamagui';
import { useRouter } from 'expo-router';

export default function WelcomeLoginScreen() {
  const router = useRouter();

  return (
    <SplitBackgroundLayout
      topImage={require('@/assets/images/login/girl-login.png')}
      overlayHeight="60%"
    >
      <YStack flex={1} pt="$8" gap="$3" px="$4">
        <YStack flex={1} gap="$2" alignItems="center" justifyContent="center">
          <Text
            color="$purpleText"
            fontSize="$5"
            textTransform="uppercase"
            letterSpacing={2}
          >
            Bienvenue sur
          </Text>
          <Heading
            size="$10"
            color="$purpleText"
            textTransform="uppercase"
            letterSpacing={1}
          >
            Beautyswapp
          </Heading>
          <Text
            color="$purpleText"
            fontSize="$4"
            textAlign="center"
            mt="$4"
            px="$2"
          >
            Rejoins la première communauté qui réinvente la beauté durable.
          </Text>
        </YStack>

        <YStack gap="$3" pb="$6">
          <PrimaryButton onPress={() => router.push('/register')}>
            Commencer
          </PrimaryButton>
          <SecondaryButton onPress={() => router.push('/login')}>
            J'ai déjà un compte
          </SecondaryButton>
        </YStack>
      </YStack>
    </SplitBackgroundLayout>
  );
}
