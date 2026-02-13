import { YStack, Heading, Text, type YStackProps } from 'tamagui';
import React from 'react';

export type FormFieldWrapperProps = YStackProps & {
  title: string;
  children: React.ReactNode;
  error?: string;
};

export function FormFieldWrapper({ title, children, error, ...props }: FormFieldWrapperProps) {
  return (
    <YStack gap="$2" {...props}>
      <Heading size="$4" color="$purpleText">
        {title}
      </Heading>
      {children}
      {error && (
        <Text color="$red10" fontSize="$3">
          {error}
        </Text>
      )}
    </YStack>
  );
}
