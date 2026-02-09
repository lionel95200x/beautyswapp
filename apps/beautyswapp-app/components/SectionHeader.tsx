import { YStack, Heading, Text, XStack } from 'tamagui'
import { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  link?: string
  children: ReactNode
}

export function SectionHeader({ title, link, children }: SectionHeaderProps) {
  return (
    <YStack gap="$3">
      <XStack justifyContent="space-between" alignItems="center">
        <Heading size="$8" color="$accent" fontWeight="bold">
          {title}
        </Heading>
        {link && (
          <Text fontSize="$4" color="$accent" fontWeight="600">
            Voir tout →
          </Text>
        )}
      </XStack>
      {children}
    </YStack>
  )
}
