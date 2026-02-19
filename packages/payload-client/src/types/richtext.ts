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

