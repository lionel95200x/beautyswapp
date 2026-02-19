import { YStack, XStack, ScrollView } from 'tamagui'
import { Dimensions } from 'react-native'
import { CategoryCard } from './CategoryCard'
import { CategoryGridSkeleton } from './CategoryCardSkeleton'
import { EmptyState } from './ui/EmptyState'
import type { Category } from '@beautyswapp/payload-client/types'

interface CategoryGridProps {
  categories: Category[] | undefined
  isLoading?: boolean
  error?: Error | null
}

export function CategoryGrid({ categories, isLoading, error }: CategoryGridProps) {
  const screenWidth = Dimensions.get('window').width
  const cardWidth = (screenWidth - 48) / 2

  if (isLoading) {
    return <CategoryGridSkeleton cardWidth={cardWidth} />
  }

  if (error) {
    return <EmptyState message={`Erreur: ${error.message}`} type="error" />
  }

  if (!categories || categories.length === 0) {
    return <EmptyState message="Aucune catégorie disponible" type="empty" />
  }

  const pairs: Category[][] = []
  for (let i = 0; i < categories.length; i += 2) {
    pairs.push(categories.slice(i, i + 2))
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack gap="$4" paddingHorizontal="$4" paddingBottom="$4">
        {pairs.map((pair, pairIndex) => (
          <XStack key={pairIndex} gap="$4" justifyContent="space-between">
            {pair.map((category) => (
              <CategoryCard key={category.id} category={category} width={cardWidth} />
            ))}
            {pair.length === 1 && <YStack width={cardWidth} />}
          </XStack>
        ))}
      </YStack>
    </ScrollView>
  )
}
