import { YStack, Text, Image } from 'tamagui'
import { getMediaUrl } from '@beautyswapp/payload-client/utils'
import type { Product, Category, Media } from '@beautyswapp/payload-client/types'

interface ProductCardProps {
  product: Product
  width?: number | string
}

export function ProductCard({ product, width }: ProductCardProps) {
  const firstImage = product.gallery?.[0]?.image as Media | undefined
  const firstCategory = Array.isArray(product.categories)
    ? (product.categories[0] as Category | undefined)
    : (product.categories as Category | undefined)

  const imageUrl = firstImage?.url ? getMediaUrl(firstImage.url) : null

  return (
    <YStack gap="$2" width={width || '100%'}>
      <Image
        src={
          imageUrl
            ? { uri: imageUrl }
            : require('../assets/images/product/product-mock.png')
        }
        width="100%"
        aspectRatio={1}
        borderRadius={12}
      />
      <YStack gap="$1">
        {firstCategory && (
          <Text fontSize="$2" color="$gray10" fontWeight="600">
            {firstCategory.title}
          </Text>
        )}
        <Text fontSize="$4" fontWeight="600" color="$color" numberOfLines={2}>
          {product.title}
        </Text>
        <Text fontSize="$5" fontWeight="bold" color="$accent">
          {product.priceInUSD ? `${(product.priceInUSD / 100).toFixed(2)} €` : 'Prix sur demande'}
        </Text>
      </YStack>
    </YStack>
  )
}
