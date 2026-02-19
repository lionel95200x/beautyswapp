import { Text, YStack } from 'tamagui';
import { RichHeading } from '@/components/ui/RichHeading';
import { Paragraph } from '@/components/ui/Paragraph';
import { InlineLink } from '@/components/ui/InlineLink';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LexicalTextNode {
  type: 'text';
  text: string;
  format: number; // bitmask: 1=bold 2=italic 4=strikethrough 8=underline
}

export interface LexicalLinkNode {
  type: 'link';
  fields: { url?: string | null };
  children: LexicalNode[];
}

export interface LexicalParagraphNode {
  type: 'paragraph';
  children: LexicalNode[];
}

export interface LexicalHeadingNode {
  type: 'heading';
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: LexicalNode[];
}

export interface LexicalListNode {
  type: 'list';
  listType: 'bullet' | 'number';
  children: LexicalListItemNode[];
}

export interface LexicalListItemNode {
  type: 'listitem';
  children: LexicalNode[];
}

export type LexicalNode =
  | LexicalTextNode
  | LexicalLinkNode
  | LexicalParagraphNode
  | LexicalHeadingNode
  | LexicalListNode
  | LexicalListItemNode
  | { type: string; children?: LexicalNode[]; [k: string]: unknown };

// ─── Inline renderer (text, bold, link) ──────────────────────────────────────

export function renderInline(node: LexicalNode, index: number): React.ReactNode {
  if (node.type === 'text') {
    const n = node as LexicalTextNode;
    const bold = (n.format & 1) !== 0;
    const italic = (n.format & 2) !== 0;
    const underline = (n.format & 8) !== 0;
    return (
      <Text
        key={index}
        fontWeight={bold ? 'bold' : undefined}
        fontStyle={italic ? 'italic' : undefined}
        textDecorationLine={underline ? 'underline' : undefined}
      >
        {n.text}
      </Text>
    );
  }

  if (node.type === 'link') {
    const n = node as LexicalLinkNode;
    const url = n.fields?.url;
    if (!url) return null;
    return (
      <InlineLink key={index} url={url}>
        {n.children?.map((child, i) => renderInline(child, i))}
      </InlineLink>
    );
  }

  // Recurse unknown nodes
  const n = node as { children?: LexicalNode[] };
  return n.children?.map((child, i) => renderInline(child, i)) ?? null;
}

// ─── Block renderer (heading, paragraph, list) ───────────────────────────────

export function LexicalNode({ node, index }: { node: LexicalNode; index: number }) {
  if (node.type === 'heading') {
    const n = node as LexicalHeadingNode;
    return (
      <RichHeading key={index} tag={n.tag}>
        {n.children?.map((child, i) => renderInline(child, i))}
      </RichHeading>
    );
  }

  if (node.type === 'paragraph') {
    const n = node as LexicalParagraphNode;
    if (!n.children?.length) return null;
    return (
      <Paragraph key={index}>
        {n.children?.map((child, i) => renderInline(child, i))}
      </Paragraph>
    );
  }

  if (node.type === 'list') {
    const n = node as LexicalListNode;
    return (
      <YStack key={index} gap="$2" marginBottom="$3">
        {n.children?.map((item, i) => (
          <Paragraph key={i}>
            {n.listType === 'number' ? `${i + 1}. ` : '• '}
            {item.children?.map((child, j) => renderInline(child, j))}
          </Paragraph>
        ))}
      </YStack>
    );
  }

  return null;
}
