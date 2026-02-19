import { YStack } from 'tamagui';
import { LexicalNode, type LexicalNode as LexicalNodeType } from './LexicalNode';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RichTextField {
  root: {
    type: string;
    children: LexicalNodeType[];
    [k: string]: unknown;
  };
  [k: string]: unknown;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function LexicalRichText({ richText }: { richText: RichTextField }) {
  const nodes = richText?.root?.children;
  if (!nodes?.length) return null;

  return (
    <YStack gap="$1">
      {nodes.map((node, i) => (
        <LexicalNode key={i} node={node} index={i} />
      ))}
    </YStack>
  );
}
