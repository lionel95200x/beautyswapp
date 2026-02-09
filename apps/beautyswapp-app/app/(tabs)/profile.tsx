import { YStack, Heading, Text, Button, ScrollView } from 'tamagui';
import { useRouter } from 'expo-router';
import { useAuth } from '@beautyswapp/medusa-client/hooks/useAuth';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <ScrollView>
      <YStack flex={1} padding="$4" paddingTop="$8" gap="$4">
        <Heading size="$8" color="$color">
          Profile
        </Heading>

        {user?.email && (
          <YStack gap="$2">
            <Text color="$gray10" fontSize="$3">Email</Text>
            <Text color="$color" fontSize="$5" fontWeight="600">
              {user.email}
            </Text>
          </YStack>
        )}

        <Button
          size="$5"
          theme="red"
          onPress={handleSignOut}
        >
          Se déconnecter
        </Button>
      </YStack>
    </ScrollView>
  );
}
