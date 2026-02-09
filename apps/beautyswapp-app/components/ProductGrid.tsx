import { YStack, XStack } from 'tamagui'
import { ProductCard } from './ProductCard'
import type { Product } from '@beautyswapp/payload-client'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  // Grouper les produits par 2
  const rows = []
  for (let i = 0; i < products.length; i += 2) {
    rows.push(products.slice(i, i + 2))
  }

  return (
    <YStack gap="$3">
      {rows.map((row, rowIndex) => (
        <XStack key={rowIndex} gap="$3" flex={1}>
          {row.map((product) => (
            <YStack key={product.id} flex={1}>
              <ProductCard product={product} />
            </YStack>
          ))}
        </XStack>
      ))}
    </YStack>
  )
}
