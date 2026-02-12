import { YStack, Heading } from 'tamagui';
import { useRouter } from 'expo-router';
import { PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { SplitBackgroundLayout } from '@/components/login/split-background-layout';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useAuth } from '@/hooks/useAuth';
import { UserAvatar } from '@/components/UserAvatar';

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

        <UserAvatar user={user} size="$10" showInfo={true} />

        <PrimaryButton onPress={() => router.push('/vanity')}>
          Mon vanity
        </PrimaryButton>
        <PrimaryButton>
          Ma wishlist
        </PrimaryButton>


        <SecondaryButton>
          Tout savoir sur BeautySwapp
        </SecondaryButton>
        <SecondaryButton>
          Besoin d'aide ?
        </SecondaryButton>
        <SecondaryButton

          onPress={handleSignOut}
        >
          Se déconnecter
        </SecondaryButton>
      </YStack>
    </SplitBackgroundLayout>
  );
}
