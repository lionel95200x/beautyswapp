import { YStack, Heading, Text, Input } from 'tamagui'
import { ReactNode } from 'react'

interface ListingScreenProps {
  title?: string
  subtitle?: string
  searchPlaceholder?: string
  searchQuery?: string
  onSearch?: (query: string) => void
  countLabel?: string
  topSafeArea?: boolean
  children: ReactNode
}

export function ListingScreen({
  title,
  subtitle,
  searchPlaceholder,
  searchQuery,
  onSearch,
  countLabel,
  topSafeArea,
  children,
}: ListingScreenProps) {
  const headerPaddingTop = topSafeArea ? '$8' : '$4'

  return (
    <YStack flex={1}>
      <YStack
        padding="$4"
        paddingTop={headerPaddingTop}
        paddingBottom="$3"
        backgroundColor="$background"
        gap="$2"
      >
        {title && (
          <Heading size="$8" color="$color" marginBottom="$1">
            {title}
          </Heading>
        )}
        {subtitle && (
          <Text color="$gray10">
            {subtitle}
          </Text>
        )}
        {onSearch && (
          <Input
            placeholder={searchPlaceholder}
            size="$4"
            value={searchQuery}
            onChangeText={onSearch}
            backgroundColor="$backgroundHover"
            borderColor="$borderColor"
            marginTop="$2"
          />
        )}
      </YStack>
      {countLabel && (
        <YStack paddingHorizontal="$4" paddingBottom="$2">
          <Text fontSize="$3" color="$gray10">
            {countLabel}
          </Text>
        </YStack>
      )}
      <YStack flex={1}>
        {children}
      </YStack>
    </YStack>
  )
}
