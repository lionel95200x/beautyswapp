import { YStack, Text, XStack, ScrollView, Image } from 'tamagui'
import { SectionHeader } from './SectionHeader'
import { useCategories, getMediaUrl, type Media } from '@beautyswapp/payload-client'

export function Categories() {
  const { data: categoriesData, isLoading } = useCategories()
  const categories = categoriesData?.docs
  const hasCategories = categories && categories.length > 0

  if (!isLoading && !hasCategories) {
    return null
  }

  return (
    <SectionHeader title="CATEGORIES" link={hasCategories ? '#' : undefined}>
      {isLoading ? (
        <Text color="$gray10">Loading...</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap="$3" paddingRight="$4">
            {categories?.map((category) => {
              const image = category.image as Media | undefined
              const imageUrl = image?.url ? getMediaUrl(image.url) : null

              return (
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
                      imageUrl
                        ? { uri: imageUrl }
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
                    {category.title}
                  </Text>
                </YStack>
              )
            })}
          </XStack>
        </ScrollView>
      )}
    </SectionHeader>
  )
}
