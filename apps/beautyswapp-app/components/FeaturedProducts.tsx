import { XStack, ScrollView } from 'tamagui'
import { SectionHeader } from './SectionHeader'
import { ProductCard } from './ProductCard'
import { EmptyState } from './ui/EmptyState'
import { useProducts } from '@beautyswapp/payload-client/hooks/useProducts'

export function FeaturedProducts() {
  const { data: productsData, isLoading, error } = useProducts()
  const products = productsData?.docs
  const hasProducts = products && products.length > 0

  return (
    <SectionHeader title="EN VEDETTE" link={hasProducts ? '#' : undefined}>
      {isLoading ? (
        <EmptyState message="Loading..." type="loading" />
      ) : error ? (
        <EmptyState message={`Erreur: ${error.message}`} type="error" />
      ) : !hasProducts ? (
        <EmptyState message="Aucun produit disponible" type="empty" />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap="$3" paddingRight="$4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} width={150} />
            ))}
          </XStack>
        </ScrollView>
      )}
    </SectionHeader>
  )
}
