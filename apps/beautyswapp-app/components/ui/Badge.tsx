import { XStack, Text } from 'tamagui'

interface BadgeProps {
  text: string
}

export function Badge({ text }: BadgeProps) {
  return (
    <XStack
      paddingHorizontal="$3"
      paddingVertical="$1.5"
      borderRadius="$10"
      borderWidth={1}
      borderColor="$purpleText"
      alignItems="center"
    >
      <Text fontSize="$2" color="$purpleText" fontWeight="600">
        {text}
      </Text>
    </XStack>
  )
}
