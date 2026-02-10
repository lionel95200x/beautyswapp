import { YStack, XStack, Text, ScrollView } from 'tamagui'
import { ProductCard } from './ProductCard'
import { ProductsGridSkeleton } from './ProductCardSkeleton'
import { Dimensions } from 'react-native'
import type { Product } from '@beautyswapp/payload-client/types'

interface ProductsGridProps {
  products: Product[] | undefined
  isLoading?: boolean
  error?: Error | null
  emptyMessage?: string
}

export function ProductsGrid({
  products,
  isLoading,
  error,
  emptyMessage = 'Aucun produit disponible'
}: ProductsGridProps) {
  // Calculer la largeur des cartes (2 par ligne avec gap)
  const screenWidth = Dimensions.get('window').width
  const cardWidth = (screenWidth - 48) / 2 // 48 = padding (16*2) + gap (16)

  if (isLoading) {
    return <ProductsGridSkeleton cardWidth={cardWidth} />
  }

  if (error) {
    return (
      <YStack padding="$4" alignItems="center">
        <Text color="$accent">Erreur: {error.message}</Text>
      </YStack>
    )
  }

  if (!products || products.length === 0) {
    return (
      <YStack padding="$4" alignItems="center">
        <Text color="$gray10">{emptyMessage}</Text>
      </YStack>
    )
  }

  // Organiser les produits par paires (2 par ligne)
  const productPairs: Product[][] = []
  for (let i = 0; i < products.length; i += 2) {
    productPairs.push(products.slice(i, i + 2))
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack gap="$4" paddingHorizontal="$4" paddingBottom="$4">
        {productPairs.map((pair, pairIndex) => (
          <XStack key={pairIndex} gap="$4" justifyContent="space-between">
            {pair.map((product) => (
              <ProductCard key={product.id} product={product} width={cardWidth} />
            ))}
            {/* Ajouter un espace vide si la ligne n'a qu'un produit */}
            {pair.length === 1 && <YStack width={cardWidth} />}
          </XStack>
        ))}
      </YStack>
    </ScrollView>
  )
}
