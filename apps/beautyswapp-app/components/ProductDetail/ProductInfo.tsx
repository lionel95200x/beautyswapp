import { YStack, Heading, Text } from 'tamagui';
import type { Brand } from '@beautyswapp/payload-client/types';

interface ProductInfoProps {
  title: string;
  brand?: Brand;
  priceInUSD?: number | null;
}

export function ProductInfo({ title, brand, priceInUSD }: ProductInfoProps) {
  return (
    <YStack flex={1} gap="$3">
      <Heading size="$7" color="$color">
        {title}
      </Heading>

      {brand && brand.title && (
        <Text fontSize="$4" color="$gray10" fontWeight="600">
          {brand.title}
        </Text>
      )}

      {priceInUSD && (
        <Heading size="$6">
          {`${(priceInUSD / 100).toFixed(2)} €`}
        </Heading>
      )}
    </YStack>
  );
}
