import { YStack, Text, Avatar } from 'tamagui'
import type { User } from '@beautyswapp/payload-client/types'

interface UserAvatarProps {
  user: User | null | undefined
  size?: '$10' | '$8' | '$6' | '$4'
  showInfo?: boolean
}

export function UserAvatar({ user, size = '$10', showInfo = true }: UserAvatarProps) {
  return (
    <YStack ai="center" gap="$3" alignSelf="center">
      <Avatar circular size={size} borderWidth={4} borderColor="$accent">
        <Avatar.Image
          src={
            user?.metadata?.avatar_url
              ? { uri: user.metadata.avatar_url as string }
              : require('@/assets/images/user/avatar-mock.png')
          }
        />
        <Avatar.Fallback background="$accent" />
      </Avatar>

      {showInfo && user && (
        <YStack ai="center" gap="$1">
          <Text fontSize="$5" fontWeight="bold" color="$color">
            {user.first_name} {user.last_name}
          </Text>
          <Text fontSize="$4" color="$accent" fontWeight="600">
            @{user.metadata?.username}
          </Text>
          <Text fontSize="$3" color="$secondary">
            {user.email}
          </Text>
        </YStack>
      )}
    </YStack>
  )
}
