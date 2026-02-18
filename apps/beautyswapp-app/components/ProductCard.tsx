import { YStack, Text, Image } from 'tamagui'
import { Pressable, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
// @ts-ignore - expo-router types issue
import { useRouter } from 'expo-router'
import { getMediaUrl } from '@beautyswapp/payload-client/utils'
import type { Product, Category, Media } from '@beautyswapp/payload-client/types'

interface ProductCardProps {
  product: Product
  width?: number
  onEdit?: (productId: number) => void
}

export function ProductCard({ product, width, onEdit }: ProductCardProps) {
  // @ts-ignore - expo-router types issue
  const router = useRouter()

  const firstImage = product.gallery?.[0]?.image as Media | undefined
  const firstCategory = Array.isArray(product.categories)
    ? (product.categories[0] as Category | undefined)
    : (product.categories as Category | undefined)

  const imageUrl = firstImage?.url ? getMediaUrl(firstImage.url) : null

  const handlePress = () => {
    // @ts-ignore - expo-router types issue
    router.push(`/products/${product.id}`)
  }

  const handleEdit = (e: any) => {
    e.stopPropagation()
    if (onEdit) {
      onEdit(product.id)
    }
  }

  return (
      <Pressable style={{ flex: 1 }} onPress={handlePress}>
        <YStack gap="$2" width={width} position="relative">
          {onEdit && (
            <TouchableOpacity
              onPress={handleEdit}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 20,
                padding: 8,
              }}
            >
              <Ionicons name="pencil" size={20} color="#8B5CF6" />
            </TouchableOpacity>
          )}
          <Image
            src={
              imageUrl
                ? { uri: imageUrl }
                : require('../assets/images/product/product-mock.png')
            }
            width="100%"
            height={200}
            borderRadius={12}
            objectFit="cover"
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
            {product.priceInUSD && (
              <Text fontSize="$5" fontWeight="bold" color="$accent">
                {`${(product.priceInUSD / 100).toFixed(2)} €`}
              </Text>
            )}
          </YStack>
        </YStack>
      </Pressable>
  )
}
