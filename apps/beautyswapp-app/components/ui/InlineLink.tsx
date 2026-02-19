import { type ReactNode } from 'react';
import { Text } from 'tamagui';
import { Linking } from 'react-native';

interface InlineLinkProps {
  url: string;
  children: ReactNode;
}

export function InlineLink({ url, children }: InlineLinkProps) {
  return (
    <Text
      color="$purpleText"
      textDecorationLine="underline"
      onPress={() => Linking.openURL(url)}
    >
      {children}
    </Text>
  );
}
