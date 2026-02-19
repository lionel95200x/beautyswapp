import { Dimensions } from 'react-native';
import { YStack, Image, Text } from 'tamagui';
import { Carousel } from '@/components/ui/Carousel';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface ProductImageProps {
  images: Array<{ url: string; alt: string }>;
}

export function ProductImage({ images }: ProductImageProps) {
  if (!images.length) {
    return (
      // @ts-ignore - Tamagui types issue
      <YStack height={400} background="$background" jc="center" ai="center">
        {/* @ts-ignore - Tamagui types issue */}
        <YStack width={300} height={300} background="$gray10" jc="center" ai="center">
          <Text color="$background" fontSize="$5">
            Aucune image
          </Text>
        </YStack>
      </YStack>
    );
  }

  return (
    <Carousel height={400}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.url}
          width={SCREEN_WIDTH}
          height={400}
          accessibilityLabel={image.alt}
        />
      ))}
    </Carousel>
  );
}
