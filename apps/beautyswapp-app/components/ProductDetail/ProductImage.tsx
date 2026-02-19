import { YStack, Text, Image } from 'tamagui';

interface ProductImageProps {
  imageUrl: string | null;
  productTitle: string;
}

export function ProductImage({ imageUrl, productTitle }: ProductImageProps) {
  return (
    // @ts-ignore - Tamagui types issue
    <YStack height={400} background="$background" jc="center" ai="center">
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={'100%'}
          height={'100%'}
        />
      ) : (
        <YStack
          // @ts-ignore - Tamagui types issue
          width={300}
          height={300}
          background="$gray10"
          jc="center"
          ai="center"
        >
          <Text color="$background" fontSize="$5">
            Aucune image
          </Text>
        </YStack>
      )}
    </YStack>
  );
}
