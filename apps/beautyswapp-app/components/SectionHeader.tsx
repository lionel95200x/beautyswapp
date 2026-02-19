import { YStack, Heading, Text, XStack } from 'tamagui'
import { Pressable } from 'react-native'
import { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  link?: string
  onLinkPress?: () => void
  children: ReactNode
}

export function SectionHeader({ title, link, onLinkPress, children }: SectionHeaderProps) {
  return (
    <YStack gap="$3">
      <XStack justifyContent="space-between" alignItems="center">
        <Heading size="$8" color="$accent" fontWeight="bold">
          {title}
        </Heading>
        {link && !onLinkPress && (
          <Text fontSize="$4" color="$accent" fontWeight="600">
            Voir tout →
          </Text>
        )}
        {onLinkPress && (
          <Pressable onPress={onLinkPress}>
            <Text fontSize="$4" color="$accent" fontWeight="600">
              Voir tout →
            </Text>
          </Pressable>
        )}
      </XStack>
      {children}
    </YStack>
  )
}
