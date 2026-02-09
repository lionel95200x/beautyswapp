import { YStack, Heading, Text, Button, ScrollView, Avatar, XStack } from 'tamagui';
import { useRouter } from 'expo-router';
import { useAuth } from '@beautyswapp/medusa-client/hooks/useAuth';
import { useCurrentUser } from '@beautyswapp/medusa-client/hooks/useCurrentUser';
import { PrimaryButton } from '@/components/ui/button';
import { SplitBackgroundLayout } from '@/components/login/split-background-layout';

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { data: user } = useCurrentUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <SplitBackgroundLayout topImage={require('@/assets/images/login/purple-login.jpg')}
    >
      <YStack flex={1} padding="$4" paddingTop="$8" gap="$4">
        <Heading size="$8" color="$secondary" textAlign="center">
          PROFIL
        </Heading>

        <YStack alignItems="center" gap="$3" marginBottom="$4">
          <Avatar circular size="$10" borderWidth={4} borderColor="$accent">
            <Avatar.Image
              src={
                user?.metadata?.avatar_url
                  ? { uri: user.metadata.avatar_url as string }
                  : require('@/assets/images/user/avatar-mock.png')
              }
            />
            <Avatar.Fallback background="$accent" />
          </Avatar>

          <YStack alignItems="center" gap="$1">
            <Text fontSize="$5" fontWeight="bold" color="$color">
              {user?.first_name} {user?.last_name}
            </Text>
            <Text fontSize="$4" color="$accent" fontWeight="600">
              @{user?.metadata?.username}
            </Text>
            <Text fontSize="$3" color="$secondary">
              {user?.email}
            </Text>
          </YStack>
        </YStack>

        <PrimaryButton>
          Mes Favoris
        </PrimaryButton>

        <PrimaryButton>
          Mon vanity
        </PrimaryButton>

        <Button
          size="$5"
          theme="red"
          onPress={handleSignOut}
        >
          Se déconnecter
        </Button>
      </YStack>
    </SplitBackgroundLayout>
  );
}
