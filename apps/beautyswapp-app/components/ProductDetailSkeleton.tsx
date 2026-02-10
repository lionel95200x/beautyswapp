import { YStack, XStack, ScrollView, Spinner } from 'tamagui';
import { Stack } from 'expo-router';

export function ProductDetailSkeleton() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Chargement...',
          headerShown: true,
        }}
      />
      <ScrollView background="$background">
        <YStack flex={1}>
          {/* Image Skeleton */}
          {/* @ts-ignore - Tamagui types issue */}
          <YStack height={400} background="$gray3" jc="center" ai="center">
            {/* @ts-ignore - Tamagui types issue */}
            <YStack width={300} height={300} background="$gray5" br="$4" />
          </YStack>

          {/* Content Skeleton */}
          <YStack p="$4" gap="$4">
            {/* @ts-ignore - Tamagui types issue */}
            <XStack gap="$4" ai="flex-start">
              <YStack flex={1} gap="$3">
                {/* Title Skeleton */}
                {/* @ts-ignore - Tamagui types issue */}
                <YStack height={32} width="80%" background="$gray3" br="$2" />
                {/* Brand Skeleton */}
                {/* @ts-ignore - Tamagui types issue */}
                <YStack height={20} width="40%" background="$gray3" br="$2" />
                {/* Price Skeleton */}
                {/* @ts-ignore - Tamagui types issue */}
                <YStack height={28} width="30%" background="$gray3" br="$2" />
              </YStack>

              {/* Seller Info Skeleton */}
              {/* @ts-ignore - Tamagui types issue */}
              <YStack gap="$3" ai="center">
                {/* Avatar Skeleton */}
                {/* @ts-ignore - Tamagui types issue */}
                <YStack width={48} height={48} br="$12" background="$gray3" />
                {/* Username Skeleton */}
                {/* @ts-ignore - Tamagui types issue */}
                <YStack height={16} width={80} background="$gray3" br="$2" />
              </YStack>
            </XStack>

            {/* Description Skeleton */}
            <YStack gap="$2">
              {/* @ts-ignore - Tamagui types issue */}
              <YStack height={18} width="60%" background="$gray3" br="$2" />
              {/* @ts-ignore - Tamagui types issue */}
              <YStack height={60} width="100%" background="$gray3" br="$2" />
            </YStack>

            {/* Buttons Skeleton */}
            <XStack gap="$3">
              {/* @ts-ignore - Tamagui types issue */}
              <YStack flex={1} height={48} background="$gray3" br="$4" />
              {/* @ts-ignore - Tamagui types issue */}
              <YStack flex={1} height={48} background="$gray3" br="$4" />
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </>
  );
}
