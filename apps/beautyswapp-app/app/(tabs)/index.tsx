import { YStack, Heading, Text, Card, XStack, Button, ScrollView } from 'tamagui';

export default function HomeScreen() {
  return (
    <ScrollView>
      <YStack flex={1} padding="$4" backgroundColor="$background">
        <YStack paddingTop="$8" paddingBottom="$4">
          <Heading size="$9" color="$color">
            Welcome to Beautyswapp
          </Heading>
          <Text color="$gray10" marginTop="$2" fontSize="$4">
            Discover, share, and swap beauty products
          </Text>
        </YStack>

        <YStack gap="$4" marginTop="$4">
          <Card
            elevation="$2"
            size="$4"
            borderWidth="$0.5"
            borderColor="$borderColor"
            padding="$4"
            backgroundColor="$backgroundHover"
          >
            <Card.Header>
              <Heading size="$6" color="$color">
                Featured Products
              </Heading>
            </Card.Header>
            <Text color="$gray11" marginTop="$2">
              Explore the latest beauty products from our community
            </Text>
            <Button marginTop="$4">
              Browse Products
            </Button>
          </Card>

          <Card
            elevation="$2"
            size="$4"
            borderWidth="$0.5"
            borderColor="$borderColor"
            padding="$4"
            backgroundColor="$backgroundHover"
          >
            <Card.Header>
              <Heading size="$6" color="$color">
                Swap with Friends
              </Heading>
            </Card.Header>
            <Text color="$gray11" marginTop="$2">
              Exchange beauty products with people nearby
            </Text>
            <Button marginTop="$4">
              Start Swapping
            </Button>
          </Card>

          <Card
            elevation="$2"
            size="$4"
            borderWidth="$0.5"
            borderColor="$borderColor"
            padding="$4"
            backgroundColor="$backgroundHover"
          >
            <Card.Header>
              <Heading size="$6" color="$color">
                Your Collection
              </Heading>
            </Card.Header>
            <XStack gap="$4" marginTop="$3">
              <YStack flex={1} alignItems="center">
                <Text fontSize="$7" fontWeight="bold" color="$color">
                  12
                </Text>
                <Text color="$gray10" fontSize="$2">
                  Products
                </Text>
              </YStack>
              <YStack flex={1} alignItems="center">
                <Text fontSize="$7" fontWeight="bold" color="$color">
                  8
                </Text>
                <Text color="$gray10" fontSize="$2">
                  Swaps
                </Text>
              </YStack>
              <YStack flex={1} alignItems="center">
                <Text fontSize="$7" fontWeight="bold" color="$color">
                  24
                </Text>
                <Text color="$gray10" fontSize="$2">
                  Reviews
                </Text>
              </YStack>
            </XStack>
          </Card>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
