import { YStack, XStack, Text, Image } from 'tamagui';
import { Badge } from '@/components/ui/Badge';
import { UserAvatar } from '@/components/UserAvatar';
import type { User } from '@beautyswapp/payload-client/types';

interface SellerInfoProps {
  seller: User;
}

const RATING_STARS = 5;

export function SellerInfo({ seller }: SellerInfoProps) {
  const displayName = seller.name || seller.email.split('@')[0];

  return (
    <YStack gap="$3" >
      {/* Avatar + Username */}
      {/* @ts-ignore - Tamagui types issue */}
      <XStack gap="$2" ai="center">
        <UserAvatar user={seller} size="$6" showInfo={false} />
        <YStack gap="$2" >

          <Text fontSize="$3" color="$color" fontWeight="600">
            @{displayName}
          </Text>
          {/* Rating Stars */}
          <YStack gap="$2">
            <XStack gap="$1" >
              {Array.from({ length: RATING_STARS }).map((_, i) => (
                <Image
                  key={i}
                  src={require('@/assets/icon/gloss.png')}
                  width={16}
                  height={16}
                />
              ))}
            </XStack>
            <XStack gap="$2">
              <Badge text="Profile vérifié" />
              <Badge text="Swappeuse or" />
            </XStack>
          </YStack>
        </YStack>

      </XStack>


      {/* Badges */}

    </YStack>
  );
}
