import { YStack, Image } from 'tamagui';
import { BlurView } from 'expo-blur';
import { StyleSheet, ImageSourcePropType } from 'react-native';
import { ReactNode } from 'react';

interface SplitBackgroundLayoutProps {
  topImage: ImageSourcePropType;
  children: ReactNode;
  overlayHeight?: string;
}

export function SplitBackgroundLayout({
  topImage,
  children,
  overlayHeight = '80%'
}: SplitBackgroundLayoutProps) {
  return (
    <YStack flex={1}>
      {/* Background split en 2 */}
      <YStack flex={1}>
        {/* Top 50% - Image */}
        <YStack flex={1}>
          <Image
            src={topImage}
            width="100%"
            height="100%"
            resizeMode="cover"
          />
        </YStack>

        {/* Bottom 50% - Primary color */}
        <YStack flex={1} backgroundColor="$primary" />
      </YStack>

      {/* Overlay avec BlurView */}
      <YStack
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        height={overlayHeight}
      >
        <BlurView intensity={40} tint="light" style={styles.blurContainer}>
          {children}
        </BlurView>
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
});
