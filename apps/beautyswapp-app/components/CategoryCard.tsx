import { YStack, Text, Image } from 'tamagui'
import { getMediaUrl } from '@beautyswapp/payload-client/utils'
import type { Category, Media } from '@beautyswapp/payload-client/types'

interface CategoryCardProps {
  category: Category
  width: number
}

export function CategoryCard({ category, width }: CategoryCardProps) {
  const image = category.image as Media | undefined
  const imageUrl = image?.url ? getMediaUrl(image.url) : null

  return (
    <YStack
      gap="$2"
      width={width}
      pressStyle={{ opacity: 0.7 }}
      animation="quick"
    >
      <Image
        src={
          imageUrl
            ? { uri: imageUrl }
            : require('../assets/images/category/category-mock.jpg')
        }
        width={width}
        height={width}
        borderRadius={12}
        objectFit="cover"
      />
      <Text fontSize="$4" fontWeight="600" color="$color" numberOfLines={2}>
        {category.title}
      </Text>
    </YStack>
  )
}
