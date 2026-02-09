import { XStack, ScrollView, Text } from 'tamagui'
import { useProducts } from '@beautyswapp/medusa-client/hooks/useProducts'
import { SectionHeader } from './SectionHeader'
import { ProductCard } from './ProductCard'

export function FeaturedProducts() {
  const { data: productsData, isLoading, error } = useProducts()

  if (isLoading) {
    return (
      <SectionHeader title="EN VEDETTE">
        <Text color="$gray10">Loading...</Text>
      </SectionHeader>
    )
  }

  if (error) {
    return (
      <SectionHeader title="EN VEDETTE">
        <Text color="$accent">Erreur: {error.message}</Text>
      </SectionHeader>
    )
  }

  const products = productsData?.products

  if (!products || products.length === 0) {
    return (
      <SectionHeader title="EN VEDETTE">
        <Text color="$gray10">Aucun produit disponible</Text>
      </SectionHeader>
    )
  }

  return (
    <SectionHeader title="EN VEDETTE" link="#">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$3" paddingRight="$4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </XStack>
      </ScrollView>
    </SectionHeader>
  )
}
