/**
 * Types stricts pour les champs RichText de Payload CMS
 */

export interface RichTextNode {
  type?: string;
  text?: string;
  children?: RichTextNode[];
  [key: string]: unknown;
}

export interface RichTextRoot {
  root: {
    type: string;
    children: RichTextNode[];
    direction: string | null;
    format: string;
    indent: number;
    version: number;
  };
}

export type RichTextField = RichTextRoot | null | undefined;

/**
 * Extrait le texte brut d'un champ RichText
 * Fail-fast si la structure est invalide
 */
export function extractTextFromRichText(richText: RichTextField): string {
  if (!richText?.root?.children) {
    return '';
  }

  return richText.root.children
    .map((child) => {
      if (child.text !== undefined) {
        return child.text;
      }
      if (child.children) {
        return child.children
          .filter((c): c is RichTextNode & { text: string } => {
            return c.text !== undefined && c.text !== null;
          })
          .map((c) => c.text)
          .join('');
      }
      return '';
    })
    .join(' ');
}
