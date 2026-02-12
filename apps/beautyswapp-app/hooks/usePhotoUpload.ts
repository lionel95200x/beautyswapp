import { useUploadMedia } from '@beautyswapp/payload-client/hooks/useProducts';
import { uriToFile } from '@/utils/file';

export function usePhotoUpload() {
  const uploadMedia = useUploadMedia();

  const uploadPhotos = async (photos: string[], altText: string): Promise<number[]> => {
    return await Promise.all(
      photos.map(async (photoUri, index) => {
        const file = await uriToFile(photoUri, `photo-${index}.jpg`);
        const media = await uploadMedia.mutateAsync({ file, alt: altText });
        if (!media.doc.id) {
          throw new Error('Upload échoué: aucun ID retourné');
        }
        return media.doc.id;
      })
    );
  };

  return {
    uploadPhotos,
    isUploading: uploadMedia.isPending,
  };
}
