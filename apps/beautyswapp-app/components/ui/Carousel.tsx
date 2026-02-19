import { useState } from 'react';
import { Dimensions } from 'react-native';
import { YStack, XStack, ScrollView } from 'tamagui';
import React from 'react';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface CarouselProps {
  height: number;
  children: React.ReactNode;
}

export function Carousel({ height, children }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = React.Children.toArray(children);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  return (
    // @ts-ignore - Tamagui types issue
    <YStack height={height} position="relative">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        height={height}
      >
        {slides.map((slide, index) => (
          <YStack key={index} width={SCREEN_WIDTH} height={height}>
            {slide}
          </YStack>
        ))}
      </ScrollView>

      {slides.length > 1 && (
        // @ts-ignore - Tamagui types issue
        <XStack
          position="absolute"
          // @ts-ignore - Tamagui types issue
          bottom="$3"
          left={0}
          right={0}
          jc="center"
          gap="$2"
          ai="center"
        >
          {slides.map((_, index) => (
            // @ts-ignore - Tamagui types issue
            <YStack
              key={index}
              width={index === currentIndex ? 20 : 8}
              height={8}
              // @ts-ignore - Tamagui types issue
              borderRadius={4}
              background={index === currentIndex ? '$purpleText' : '$backgroundHover'}
              opacity={index === currentIndex ? 1 : 0.6}
            />
          ))}
        </XStack>
      )}
    </YStack>
  );
}
