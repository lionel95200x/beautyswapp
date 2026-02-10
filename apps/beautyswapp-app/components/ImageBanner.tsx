import { YStack, Image, Text } from 'tamagui'
import type { ImageSourcePropType } from 'react-native'

interface ImageBannerProps {
  title: string
  subtitle: string
  image: ImageSourcePropType
}

export function ImageBanner({
  title,
  subtitle,
  image
}: ImageBannerProps) {
  return (
    <YStack position="relative" height={200} width="100%" overflow="hidden" borderRadius={12}>
      {/* Image de fond */}
      <Image
        src={image}
        width="100%"
        height={200}
        resizeMode="cover"
        position="absolute"
      />

      {/* Textes superposés */}
      <YStack
        position="absolute"
        bottom={0}
        left={0}
        width="100%"
        paddingHorizontal="$4"
        paddingVertical="$3"
        alignItems="center"
      >
        {/* Titre */}
        <Text fontSize="$5" fontWeight="bold" color="white">
          {title}
        </Text>

        {/* Sous-titre */}
        <Text fontSize="$3" color="white" opacity={0.9}>
          {subtitle}
        </Text>
      </YStack>
    </YStack>
  )
}
