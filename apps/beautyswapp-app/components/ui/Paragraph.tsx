import { type ReactNode } from 'react';
import { Text } from 'tamagui';

interface ParagraphProps {
  children: ReactNode;
}

export function Paragraph({ children }: ParagraphProps) {
  return (
    <Text fontSize="$4" color="$color" lineHeight="$6" marginBottom="$3" flexWrap="wrap">
      {children}
    </Text>
  );
}
