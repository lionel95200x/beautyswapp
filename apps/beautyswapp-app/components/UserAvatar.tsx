import { YStack, Text, Avatar } from 'tamagui'
import type { User, Media } from '@beautyswapp/payload-client/types'
import { getMediaUrl } from '@beautyswapp/payload-client/utils'

interface UserAvatarProps {
  user: User | null | undefined
  size?: '$10' | '$8' | '$6' | '$4'
  showInfo?: boolean
}

export function UserAvatar({ user, size = '$10', showInfo = true }: UserAvatarProps) {
  const profileMedia = user?.profileImage && typeof user.profileImage === 'object'
    ? user.profileImage as Media
    : null
  const avatarUrl = profileMedia?.url ? getMediaUrl(profileMedia.url) : null

  return (
    <YStack alignItems="center" gap="$3" alignSelf="center">
      <Avatar circular size={size} borderWidth={4} borderColor="$accent">
        <Avatar.Image
          src={
            avatarUrl
              ? { uri: avatarUrl }
              : require('@/assets/images/user/avatar-mock.png')
          }
        />
        <Avatar.Fallback background="$accent" />
      </Avatar>

      {showInfo && user && (
        <YStack alignItems="center" gap="$1">
          <Text fontSize="$5" fontWeight="bold" color="$color">
            {user.name}
          </Text>
          <Text fontSize="$3" color="$secondary">
            {user.email}
          </Text>
        </YStack>
      )}
    </YStack>
  )
}
