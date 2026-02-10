import { YStack, XStack } from 'tamagui'
import { useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'

interface ProductCardSkeletonProps {
  width?: number
}

export function ProductCardSkeleton({ width }: ProductCardSkeletonProps) {
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
          width="100%"
          aspectRatio={1}
          borderRadius={12}
          backgroundColor="$gray5"
        />
      </Animated.View>

      <YStack gap="$1">
        <Animated.View style={{ opacity }}>
          <YStack
            height={12}
            width="60%"
            borderRadius={6}
            backgroundColor="$gray5"
          />
        </Animated.View>

        <Animated.View style={{ opacity }}>
          <YStack
            height={16}
            width="90%"
            borderRadius={6}
            backgroundColor="$gray5"
            marginTop="$1"
          />
        </Animated.View>

        <Animated.View style={{ opacity }}>
          <YStack
            height={20}
            width="50%"
            borderRadius={6}
            backgroundColor="$gray5"
            marginTop="$1"
          />
        </Animated.View>
      </YStack>
    </YStack>
  )
}

interface ProductsGridSkeletonProps {
  count?: number
  cardWidth: number
}

export function ProductsGridSkeleton({ count = 6, cardWidth }: ProductsGridSkeletonProps) {
  const skeletonPairs: number[][] = []
  for (let i = 0; i < count; i += 2) {
    skeletonPairs.push([i, i + 1])
  }

  return (
    <YStack gap="$4" paddingHorizontal="$4" paddingBottom="$4">
      {skeletonPairs.map((pair, pairIndex) => (
        <XStack key={pairIndex} gap="$4" justifyContent="space-between">
          <ProductCardSkeleton width={cardWidth} />
          {pair[1] < count && <ProductCardSkeleton width={cardWidth} />}
          {pair[1] >= count && <YStack width={cardWidth} />}
        </XStack>
      ))}
    </YStack>
  )
}
