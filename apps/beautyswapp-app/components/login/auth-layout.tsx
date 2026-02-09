import { YStack, Heading, Text, Image } from 'tamagui';
import { ReactNode } from 'react';
import { Link, Href } from 'expo-router';
import { PrimaryButton } from '../ui/button';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  onSubmit: () => void;
  submitText: string;
  loading: boolean;
  children: ReactNode;
  footerText: string;
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
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) {
  return (
    <YStack p="$6" gap="$4" width="100%" maxW={400}>
      <YStack gap="$2" alignItems="center">
        <Image
          src={require('@/assets/images/logo.png')}
          width={80}
          height={80}
          marginBottom="$3"
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

      <Text color="$gray10" fontSize="$3" textAlign="center">
        {footerText}{' '}
        <Link href={footerLinkHref} asChild>
          <Text color="$primary" fontWeight="600">
            {footerLinkText}
          </Text>
        </Link>
      </Text>
    </YStack>
  );
}
