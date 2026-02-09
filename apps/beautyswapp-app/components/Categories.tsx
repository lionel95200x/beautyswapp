import { YStack, Text, XStack, ScrollView, Image } from 'tamagui'
import { useCategories } from '@beautyswapp/medusa-client/hooks/useCategories'
import { SectionHeader } from './SectionHeader'

export function Categories() {
  const { data: categoriesData, isLoading } = useCategories()

  if (isLoading) {
    return (
      <SectionHeader title="CATEGORIES">
        <Text color="$gray10">Loading...</Text>
      </SectionHeader>
    )
  }

  const categories = categoriesData?.product_categories

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <SectionHeader title="CATEGORIES" link="#">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <XStack gap="$3" paddingRight="$4">
          {categories.map((category) => (
            <YStack
              key={category.id}
              gap="$2"
              alignItems="center"
              width={100}
              pressStyle={{ opacity: 0.7 }}
              animation="quick"
            >
              <Image
                src={
                  category.metadata?.image_url
                    ? { uri: category.metadata.image_url as string }
                    : require('../assets/images/category/category-mock.jpg')
                }
                width={80}
                height={80}
                borderRadius={12}
              />
              <Text
                fontSize="$3"
                fontWeight="600"
                color="$color"
                textAlign="center"
                numberOfLines={2}
              >
                {category.name}
              </Text>
            </YStack>
          ))}
        </XStack>
      </ScrollView>
    </SectionHeader>
  )
}
