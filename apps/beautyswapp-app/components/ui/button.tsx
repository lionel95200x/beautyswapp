import { Button as TamaguiButton, ButtonProps as TamaguiButtonProps } from 'tamagui';

const COMMON_BUTTON_PROPS = {
  borderRadius: "$4",
  fontWeight: "600",
  size: "$5",
  pressStyle: { opacity: 0.8 },
  hoverStyle: { opacity: 0.9 },
} as const;

export type PrimaryButtonProps = TamaguiButtonProps;
export type SecondaryButtonProps = TamaguiButtonProps;

export function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <TamaguiButton
      backgroundColor="$secondaryPurple"
      color="$red10"
      {...COMMON_BUTTON_PROPS}
      {...props}
    />
  );
}

export function SecondaryButton(props: SecondaryButtonProps) {
  return (
    <TamaguiButton
      backgroundColor="$orangeButton"
      color="$white"
      {...COMMON_BUTTON_PROPS}
      {...props}
    />
  );
}
