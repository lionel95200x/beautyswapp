import { YStack, Heading, Text, Avatar, XStack, Button, ScrollView, Separator } from 'tamagui';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  return (
    <ScrollView>
      <YStack flex={1} padding="$4" paddingTop="$8" gap="$4">
        <Heading size="$8" color="$color">
          Profile
        </Heading>

        <Link href="/login" asChild>
          <Button size="$5" backgroundColor="$primary" color="white">
            Se connecter
          </Button>
        </Link>
      </YStack>
    </ScrollView>
  );
}
