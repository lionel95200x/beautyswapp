import { YStack, Text, Image } from 'tamagui'

interface ProductCardProps {
  product: any
  width?: number | string
}

export function ProductCard({ product, width }: ProductCardProps) {
  return (
    <YStack gap="$2" width={width || '100%'}>
      <Image
        src={
          product.thumbnail
            ? { uri: product.thumbnail }
            : require('../assets/images/product/product-mock.png')
        }
        width="100%"
        aspectRatio={1}
        borderRadius={12}
      />
      <YStack gap="$1">
        <Text fontSize="$2" color="$gray10" fontWeight="600">
          {product.collection?.title}
        </Text>
        <Text fontSize="$4" fontWeight="600" color="$color" numberOfLines={2}>
          {product.title}
        </Text>
        <Text fontSize="$3" color="$gray11">
          {product.vendor}
        </Text>
        <Text fontSize="$5" fontWeight="bold" color="$accent">
          {product.variants?.[0]?.calculated_price?.calculated_amount
            ? `${(product.variants[0].calculated_price.calculated_amount / 100).toFixed(2)} €`
            : product._mockPriceLabel}
        </Text>
      </YStack>
    </YStack>
  )
}
