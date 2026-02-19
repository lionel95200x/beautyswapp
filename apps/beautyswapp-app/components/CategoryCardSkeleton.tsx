import { YStack, XStack, ScrollView } from 'tamagui'
import { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'

function CategoryCardSkeletonItem({ width, imageSize }: { width: number; imageSize: number }) {
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    )
    animation.start()
    return () => animation.stop()
  }, [opacity])

  return (
    <YStack gap="$2" width={width}>
      <Animated.View style={{ opacity }}>
        <YStack
          width={imageSize}
          height={imageSize}
          borderRadius={12}
          backgroundColor="$gray5"
        />
      </Animated.View>
      <Animated.View style={{ opacity }}>
        <YStack height={14} width={width * 0.75} borderRadius={6} backgroundColor="$gray5" />
      </Animated.View>
    </YStack>
  )
}

interface CategoryGridSkeletonProps {
  count?: number
  cardWidth: number
}

export function CategoryGridSkeleton({ count = 6, cardWidth }: CategoryGridSkeletonProps) {
  const pairs: number[][] = []
  for (let i = 0; i < count; i += 2) {
    pairs.push([i, i + 1])
  }

  return (
    <YStack gap="$4" paddingHorizontal="$4" paddingBottom="$4">
      {pairs.map((pair, idx) => (
        <XStack key={idx} gap="$4" justifyContent="space-between">
          <CategoryCardSkeletonItem width={cardWidth} imageSize={cardWidth} />
          {pair[1] < count ? (
            <CategoryCardSkeletonItem width={cardWidth} imageSize={cardWidth} />
          ) : (
            <YStack width={cardWidth} />
          )}
        </XStack>
      ))}
    </YStack>
  )
}

interface CategoriesHorizontalSkeletonProps {
  count?: number
}

export function CategoriesHorizontalSkeleton({ count = 5 }: CategoriesHorizontalSkeletonProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <XStack gap="$3" paddingRight="$4">
        {Array.from({ length: count }).map((_, i) => (
          <CategoryCardSkeletonItem key={i} width={100} imageSize={80} />
        ))}
      </XStack>
    </ScrollView>
  )
}
