import { styled, GetProps } from 'tamagui';
import { Button as TamaguiButton } from 'tamagui';

export const Button = styled(TamaguiButton, {
  name: 'Button',
  borderRadius: '$8',
  fontWeight: '600',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$secondaryPurple',
        color: '$red10',
        pressStyle: {
          opacity: 0.8,
        },
        hoverStyle: {
          opacity: 0.9,
        },
      },
      // On pourra ajouter secondary et tertiary plus tard
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: '$5',
  },
});

export type ButtonProps = GetProps<typeof Button>;
