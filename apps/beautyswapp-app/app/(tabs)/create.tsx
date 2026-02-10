import { PrimaryButton } from '@/components/ui/button';
import { YStack, Heading, Text, Button, ScrollView } from 'tamagui';

export default function CreateScreen() {
  return (
    <ScrollView>
      <YStack flex={1} padding="$4" backgroundColor="$background">
        <Heading size="$8" color="$color">
          Create
        </Heading>

        <PrimaryButton>
          Ajouter le produit
        </PrimaryButton>
      </YStack>
    </ScrollView>
  );
}
