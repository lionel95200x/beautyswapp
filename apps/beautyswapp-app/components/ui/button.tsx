import { Button as TamaguiButton, ButtonProps as TamaguiButtonProps } from 'tamagui';

export type PrimaryButtonProps = TamaguiButtonProps;

export function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <TamaguiButton
      backgroundColor="$secondaryPurple"
      color="$red10"
      borderRadius="$8"
      fontWeight="600"
      size="$5"
      pressStyle={{ opacity: 0.8 }}
      hoverStyle={{ opacity: 0.9 }}
      {...props}
    />
  );
}
