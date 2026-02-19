import { YStack, XStack, Image, Separator } from 'tamagui';
import { getMediaUrl } from '@beautyswapp/payload-client/utils';
import { LexicalRichText, type RichTextField } from './LexicalRichText';
import { PrimaryButton } from '@/components/ui/button';
import { Linking } from 'react-native';

// ─── Types ───────────────────────────────────────────────────────────────────

interface MediaObject {
  url?: string | null;
  alt?: string;
  width?: number | null;
  height?: number | null;
}

interface ContentColumn {
  id?: string;
  richText?: RichTextField;
}

interface ContentBlock {
  blockType: 'content';
  columns?: ContentColumn[];
}

interface MediaBlockData {
  blockType: 'mediaBlock';
  media?: MediaObject;
}

interface CtaLink {
  id?: string;
  link: {
    url?: string | null;
    label?: string | null;
    newTab?: boolean | null;
  };
}

interface CtaBlock {
  blockType: 'cta';
  richText?: RichTextField;
  links?: CtaLink[];
}

type Block = ContentBlock | MediaBlockData | CtaBlock | { blockType: string; [k: string]: unknown };

// ─── Block renderers ─────────────────────────────────────────────────────────

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  if (!block.columns?.length) return null;

  // Single column → full width, multi-columns → stack vertically on mobile
  return (
    <YStack gap="$4">
      {block.columns.map((col, i) => (
        <YStack key={col.id ?? i}>
          {col.richText && <LexicalRichText richText={col.richText} />}
          {i < (block.columns?.length ?? 0) - 1 && (
            <Separator marginTop="$4" borderColor="$borderColor" />
          )}
        </YStack>
      ))}
    </YStack>
  );
}

function MediaBlockRenderer({ block }: { block: MediaBlockData }) {
  const url = getMediaUrl(block.media?.url);
  if (!url) return null;

  return (
    <YStack borderRadius="$4" overflow="hidden" height={200} width="100%">
      <Image
        src={{ uri: url }}
        width="100%"
        height={200}
        resizeMode="cover"
        alt={block.media?.alt}
      />
    </YStack>
  );
}

function CtaBlockRenderer({ block }: { block: CtaBlock }) {
  return (
    <YStack
      gap="$4"
      padding="$4"
      borderRadius="$4"
      backgroundColor="$primary"
    >
      {block.richText && <LexicalRichText richText={block.richText} />}
      {block.links?.length ? (
        <XStack gap="$3" flexWrap="wrap">
          {block.links.map((item, i) => (
            <PrimaryButton
              key={item.id ?? i}
              onPress={() => {
                const url = item.link.url;
                if (url) Linking.openURL(url);
              }}
            >
              {item.link.label}
            </PrimaryButton>
          ))}
        </XStack>
      ) : null}
    </YStack>
  );
}

// ─── Main dispatcher ──────────────────────────────────────────────────────────

export function PayloadLayout({ layout }: { layout: Block[] | null | undefined }) {
  if (!layout?.length) return null;

  return (
    <YStack gap="$6">
      {layout.map((block, i) => {
        if (block.blockType === 'content') {
          return <ContentBlockRenderer key={i} block={block as ContentBlock} />;
        }
        if (block.blockType === 'mediaBlock') {
          return <MediaBlockRenderer key={i} block={block as MediaBlockData} />;
        }
        if (block.blockType === 'cta') {
          return <CtaBlockRenderer key={i} block={block as CtaBlock} />;
        }
        return null;
      })}
    </YStack>
  );
}
