import { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { YStack, XStack, Heading, useTheme } from 'tamagui';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SplitBackgroundLayout } from '@/components/login/split-background-layout';

interface ProfileSubPageLayoutProps {
  title: string;
  children?: ReactNode;
}

export function ProfileSubPageLayout({ title, children }: ProfileSubPageLayoutProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SplitBackgroundLayout
        topImage={require('@/assets/images/login/purple-login.jpg')}
        overlayHeight="90%"
      >
        <YStack flex={1} padding="$4" paddingTop="$8" gap="$4">
          {/* @ts-ignore - Tamagui types issue */}
          <XStack position="relative" width="100%" alignItems="center" justifyContent="center">
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ position: 'absolute', left: 0, zIndex: 10 }}
            >
              <Ionicons name="chevron-back" size={32} color={theme.secondary.val} />
            </TouchableOpacity>
            <Heading size="$8" color="$secondary">
              {title}
            </Heading>
          </XStack>

          {children}
        </YStack>
      </SplitBackgroundLayout>
    </>
  );
}
