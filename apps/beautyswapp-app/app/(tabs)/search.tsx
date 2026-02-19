import { useState } from 'react'
import { ListingScreen } from '../../components/ListingScreen'
import { ProductsGrid } from '../../components/ProductsGrid'
import { useProducts } from '@beautyswapp/payload-client/hooks/useProducts'

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data, isLoading, error } = useProducts()

  const filteredProducts = data?.docs?.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const countLabel = filteredProducts
    ? `${filteredProducts.length} ${searchQuery ? 'résultats' : 'produits'}`
    : undefined

  const emptyMessage = searchQuery
    ? `Pas de produit trouvé pour "${searchQuery}"`
    : 'Aucun produit disponible'

  return (
    <ListingScreen
      title="Search"
      subtitle="Découvrez les produits beauté disponibles"
      searchPlaceholder="Search products..."
      searchQuery={searchQuery}
      onSearch={setSearchQuery}
      countLabel={countLabel}
      topSafeArea
    >
      <ProductsGrid
        products={filteredProducts}
        isLoading={isLoading}
        error={error}
        emptyMessage={emptyMessage}
      />
    </ListingScreen>
  )
}
