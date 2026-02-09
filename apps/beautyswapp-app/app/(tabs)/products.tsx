import { ScrollView, YStack, Text, Card, Spinner, Heading } from 'tamagui'
import { useProducts } from '@beautyswapp/medusa-client'

export default function ProductsScreen() {
  const { data, isLoading, error } = useProducts()

  console.log('Products data:', data)
  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
        <Spinner size="large" color="$color" />
        <Text marginTop="$4" fontSize="$5" color="$color">
          Chargement des produits...
        </Text>
      </YStack>
    )
  }

  if (error) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$background">
        <Text fontSize="$5" color="$red10">
          Erreur: {error.message}
        </Text>
      </YStack>
    )
  }

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4">
      <Heading size="$8" marginBottom="$4">
        Produits ({data?.products?.length || 0})
      </Heading>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack space="$3">
          {data?.products?.map((item) => (
            <Card
              key={item.id}
              elevated
              padding="$4"
              backgroundColor="$backgroundHover"
              borderRadius="$4"
            >
              <Heading size="$6" marginBottom="$2">
                {item.title}
              </Heading>
              <Text fontSize="$4" color="$gray11" marginBottom="$2">
                {item.description}
              </Text>
              <Text fontSize="$5" fontWeight="600" color="$green10">
                {item.variants?.[0]?.calculated_price?.calculated_amount
                  ? `${item.variants[0].calculated_price.calculated_amount} ${item.variants[0].calculated_price.currency_code}`
                  : 'Prix non disponible'}
              </Text>
            </Card>
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
