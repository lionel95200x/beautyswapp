import { XStack, ScrollView, Text } from 'tamagui'
import { SectionHeader } from './SectionHeader'
import { ProductCard } from './ProductCard'
import { useProducts } from '@/hooks/useProducts'

export function FeaturedProducts() {
  const { data: productsData, isLoading, error } = useProducts()
  const products = productsData?.products
  const hasProducts = products && products.length > 0

  return (
    <SectionHeader title="EN VEDETTE" link={hasProducts ? '#' : undefined}>
      {isLoading ? (
        <Text color="$gray10">Loading...</Text>
      ) : error ? (
        <Text color="$accent">Erreur: {error.message}</Text>
      ) : !hasProducts ? (
        <Text color="$gray10">Aucun produit disponible</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap="$3" paddingRight="$4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </XStack>
        </ScrollView>
      )}
    </SectionHeader>
  )
}
