import { useState } from 'react';
import { YStack, Heading, Text, Input, ScrollView, Spinner, XStack } from 'tamagui';
import { useProducts } from '@beautyswapp/medusa-client/hooks/useProducts';
import { ProductGrid } from '../../components/ProductGrid';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, error } = useProducts();

  const filteredProducts = data?.products?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <YStack flex={1} >
      <YStack padding="$4" paddingTop="$8" paddingBottom="$3" backgroundColor="$background">
        <Heading size="$8" color="$color" marginBottom="$2">
          Search
        </Heading>
        <Text color="$gray10" marginBottom="$4">
          Find products, brands, and more
        </Text>

        <Input
          placeholder="Search products..."
          size="$4"
          value={searchQuery}
          onChangeText={setSearchQuery}
          backgroundColor="$backgroundHover"
          borderColor="$borderColor"
        />
      </YStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack padding="$4" paddingTop="$2">
          {isLoading ? (
            <YStack flex={1} justifyContent="center" alignItems="center" paddingVertical="$8">
              <Spinner size="large" color="$color" />
              <Text marginTop="$4" fontSize="$4" color="$gray10">
                Loading products...
              </Text>
            </YStack>
          ) : error ? (
            <YStack flex={1} justifyContent="center" alignItems="center" paddingVertical="$8">
              <Text fontSize="$4" color="$red10">
                Error: {error.message}
              </Text>
            </YStack>
          ) : (
            <>
              <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
                <Text fontSize="$5" fontWeight="600" color="$color">
                  {searchQuery ? 'Search Results' : 'All Products'}
                </Text>
                <Text fontSize="$3" color="$gray10">
                  {filteredProducts?.length || 0} products
                </Text>
              </XStack>

              {filteredProducts && filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : searchQuery ? (
                <YStack paddingVertical="$8" alignItems="center">
                  <Text fontSize="$4" color="$gray10">
                    No products found for "{searchQuery}"
                  </Text>
                </YStack>
              ) : null}
            </>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
}
