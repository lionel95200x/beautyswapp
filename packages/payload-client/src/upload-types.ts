/**
 * Types pour l'upload de fichiers cross-platform
 */

// React Native file format
export interface ReactNativeFile {
  uri: string;
  type: string;
  name: string;
}

// Web file format
export type WebFile = File;

// Union type for cross-platform support
export type UploadFile = ReactNativeFile | WebFile;

// Media upload response from Payload
export interface MediaUploadResponse {
  doc: {
    id: number;
    alt: string;
    url: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
  };
  message: string;
}

// Product creation payload
export interface CreateProductPayload {
  title: string;
  description: string;
  priceInUSD: number;
  categories: number[];
  gallery: { image: number }[];
  seller: number;
  _status: 'draft' | 'published';
}

// Product creation response
export interface ProductCreateResponse {
  doc: {
    id: number;
    title: string;
    slug: string;
    [key: string]: unknown;
  };
  message: string;
}
