import type { Product, Media } from '@beautyswapp/payload-client/types';
import { getMediaUrl } from '@beautyswapp/payload-client/utils';

/**
 * Extrait les URLs des photos existantes d'un produit
 */
export function getExistingPhotoUrls(gallery: Product['gallery']): string[] {
  return gallery
    ?.map((item) => {
      const image = item.image as Media;
      return image.url ? getMediaUrl(image.url) : null;
    })
    .filter((url): url is string => url !== null) || [];
}

/**
 * Récupère les IDs des médias existants à partir de leurs URLs
 */
export function getExistingMediaIds(
  gallery: Product['gallery'],
  photoUrls: string[]
): number[] {
  return gallery
    ?.filter((item) => {
      const image = item.image as Media;
      const url = image.url ? getMediaUrl(image.url) : null;
      return url && photoUrls.includes(url);
    })
    .map((item) => (item.image as Media).id) || [];
}

/**
 * Sépare les photos en URLs existantes (http) et URIs locaux (nouveaux)
 */
export function separatePhotos(photos: string[]): {
  existingUrls: string[];
  newUris: string[];
} {
  const existingUrls: string[] = [];
  const newUris: string[] = [];

  photos.forEach((photo) => {
    if (photo.startsWith('http')) {
      existingUrls.push(photo);
    } else {
      newUris.push(photo);
    }
  });

  return { existingUrls, newUris };
}
