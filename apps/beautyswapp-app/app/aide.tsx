import { ProfileSubPageLayout } from '@/components/ProfileSubPageLayout';
import { PayloadLayout } from '@/components/lexical/PayloadLayout';
import { usePageBySlug } from '@beautyswapp/payload-client/hooks/usePageBySlug';
import { ScrollView, Spinner, Text, YStack } from 'tamagui';

export default function AideScreen() {
  const { data, isLoading, error } = usePageBySlug('home');

  return (
    <ProfileSubPageLayout title="BESOIN D'AIDE ?">
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack paddingBottom="$8">
          {isLoading && (
            <YStack flex={1} alignItems="center" justifyContent="center" paddingTop="$8">
              <Spinner size="large" color="$purpleText" />
            </YStack>
          )}

          {error && (
            <Text color="$red10" fontSize="$4" textAlign="center" paddingTop="$8">
              Une erreur est survenue
            </Text>
          )}

          {data && (
            <PayloadLayout layout={data.layout as any} />
          )}
        </YStack>
      </ScrollView>
    </ProfileSubPageLayout>
  );
}
