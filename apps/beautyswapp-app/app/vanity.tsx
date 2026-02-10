import { YStack, Heading, Text } from 'tamagui';
import { SplitBackgroundLayout } from '@/components/login/split-background-layout';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export default function VanityScreen() {
  const { data: user } = useCurrentUser();

  return (
    <SplitBackgroundLayout topImage={require('@/assets/images/login/purple-login.jpg')}>
      <YStack flex={1} padding="$4" paddingTop="$8" gap="$4">
        <Heading size="$8" color="$secondary" textAlign="center">
          MON VANITY
        </Heading>

        <Text fontSize="$4" color="$color" textAlign="center">
          Mes produits en vente
        </Text>

        {user && (
          <Text fontSize="$3" color="$secondary" textAlign="center">
            {user.email}
          </Text>
        )}
      </YStack>
    </SplitBackgroundLayout>
  );
}
