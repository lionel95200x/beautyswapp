import { YStack, Heading } from 'tamagui';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductFormSkeleton() {
  return (
    <YStack flex={1} p="$4" bg="$background" gap="$4">
      <Heading size="$8" color="$color">
        Chargement...
      </Heading>
      <Skeleton height={40} />
      <Skeleton height={120} />
      <Skeleton height={60} />
      <Skeleton height={60} />
      <Skeleton height={60} />
      <Skeleton height={60} />
      <Skeleton height={50} />
    </YStack>
  );
}
