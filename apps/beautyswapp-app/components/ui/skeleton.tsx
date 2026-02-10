import { useEffect, useState } from 'react';
import { YStack, type YStackProps } from 'tamagui';

type SkeletonProps = Omit<YStackProps, 'animation' | 'opacity'>;

export function Skeleton({ width, height = 20, ...props }: SkeletonProps) {
  const [opacity, setOpacity] = useState(0.3);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prev) => (prev === 0.3 ? 0.7 : 0.3));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <YStack
      width={width}
      height={height}
      borderRadius={8}
      backgroundColor="$gray5"
      opacity={opacity}
      animation="quick"
      {...props}
    />
  );
}
