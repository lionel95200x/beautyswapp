import { YStack, Text, type YStackProps } from 'tamagui';
import React from 'react';

export type EmptyStateProps = YStackProps & {
  message: string;
  type?: 'empty' | 'error' | 'loading';
  icon?: React.ReactNode;
};

export function EmptyState({ message, type, icon, ...props }: EmptyStateProps) {
  const getColor = () => {
    if (type === 'error') return '$red10';
    if (type === 'loading') return '$gray10';
    return '$accent';
  };

  return (
    <YStack padding="$4" alignItems="center" gap="$3" {...props}>
      {icon}
      <Text color={getColor()} fontSize="$4" textAlign="center">
        {message}
      </Text>
    </YStack>
  );
}
