import { YStack, Heading, Text } from 'tamagui';
import type { Brand } from '@beautyswapp/payload-client/types';

interface ProductInfoProps {
  title: string;
  brand?: string;
  priceInUSD?: number | null;
}

export function ProductInfo({ title, brand, priceInUSD }: ProductInfoProps) {
  return (
    <YStack flex={1} gap="$1">
      <Heading size="$4" color="$color">
        {title}
      </Heading>

      {brand && (
        <Text fontSize="$4" color="$gray10" fontWeight="600">
          {brand}
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
