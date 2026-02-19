import { Dimensions } from 'react-native';
import { YStack, Image, Text } from 'tamagui';
import { useRouter } from 'expo-router';
import { Carousel } from '@/components/ui/Carousel';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    // @ts-ignore - Tamagui types issue
    <YStack flex={1} position="relative">
      <Carousel height={SCREEN_HEIGHT}>
        <Image
          src={require('@/assets/images/onboarding/carousel-1.png')}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
        />
        <Image
          src={require('@/assets/images/onboarding/carousel-2.png')}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
        />
      </Carousel>

      <YStack
        position="absolute"
        bottom="$10"
        left={0}
        right={0}
        ai="center"
      >
        <Text
          color="$backgroundHover"
          fontSize="$3"
          opacity={0.5}
          onPress={() => router.replace('/(tabs)')}
        >
          Passer
        </Text>
      </YStack>
    </YStack>
  );
}
