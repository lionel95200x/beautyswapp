import { type ReactNode } from 'react';
import { Heading } from 'tamagui';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const SIZE_MAP: Record<HeadingTag, '$6' | '$7' | '$8' | '$9'> = {
  h1: '$9',
  h2: '$8',
  h3: '$7',
  h4: '$6',
  h5: '$6',
  h6: '$6',
};

interface RichHeadingProps {
  tag: HeadingTag;
  children: ReactNode;
}

export function RichHeading({ tag, children }: RichHeadingProps) {
  return (
    <Heading size={SIZE_MAP[tag]} color="$purpleText" marginBottom="$2">
      {children}
    </Heading>
  );
}
