import { YStack, Heading, Text, Image } from 'tamagui';
import { ReactNode } from 'react';
import { useRouter } from 'expo-router';
import type { Href } from 'expo-router';
import { PrimaryButton, TextButton } from '../ui/button';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  onSubmit: () => void;
  submitText: string;
  loading: boolean;
  children: ReactNode;
  footerLinkText: string;
  footerLinkHref: Href;
}

export function AuthLayout({
  title,
  subtitle,
  onSubmit,
  submitText,
  loading,
  children,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  const router = useRouter();

  return (
    <YStack p="$6" gap="$4" width="100%" maxW={400}>
      <YStack gap="$2" alignItems="center">
        <Image
          src={require('@/assets/images/logo.png')}
          width={80}
          height={80}
        />
        <Heading size="$8" color="$purpleText" textAlign="center">
          {title}
        </Heading>
        <Text color="$purpleText" textAlign="center">
          {subtitle}
        </Text>
      </YStack>

      <YStack gap="$3">
        {children}

        <PrimaryButton
          onPress={onSubmit}
          disabled={loading}
        >
          {loading ? 'Chargement...' : submitText}
        </PrimaryButton>
      </YStack>

      <YStack alignItems="center">
        <TextButton onPress={() => router.push(footerLinkHref)}>
          {footerLinkText}
        </TextButton>
      </YStack>
    </YStack>
  );
}
