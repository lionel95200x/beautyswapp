import { useState } from 'react';
import { PrimaryButton } from '@/components/ui/button';
import { SelectField } from '@/components/ui/select';
import { TextInputField } from '@/components/ui/text-input';
import { PhotoUpload } from '@/components/ui/photo-upload';
import { YStack, Heading, ScrollView } from 'tamagui';

const Subtitle = ({ children }: { children: React.ReactNode }) => <Heading size="$6" color="$purpleText" mt="$2">
  {children}
</Heading>

const CATEGORIES = [
  { value: 'makeup', label: 'Maquillage' },
  { value: 'skincare', label: 'Soin de la peau' },
  { value: 'haircare', label: 'Soin des cheveux' },
  { value: 'fragrance', label: 'Parfum' },
  { value: 'accessories', label: 'Accessoires' },
];

export default function CreateScreen() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  return (
    <ScrollView>
      <YStack flex={1} p="$4" bg="$background" gap="$4">
        <Heading size="$8" color="$color">
          Create
        </Heading>

        <Subtitle>PHOTOS</Subtitle>

        <PhotoUpload
          title="Photo packaging"
          onPhotosChange={setPhotos}
        />

        <Subtitle>DESCRIPTION DU PRODUIT</Subtitle>

        <TextInputField
          title="Titre"
          value={title}
          onChangeText={setTitle}
          placeholder="Nom du produit"
        />

        <TextInputField
          title="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Décrivez votre produit"
          multiline
        />

        <SelectField
          title="Catégorie"
          items={CATEGORIES}
          value={category}
          onValueChange={setCategory}
          placeholder="Sélectionnez une catégorie"
        />

        <TextInputField
          title="Prix"
          value={price}
          onChangeText={setPrice}
          placeholder="0.00 €"
          keyboardType="numeric"
        />

        <PrimaryButton>
          Ajouter le produit
        </PrimaryButton>
      </YStack>
    </ScrollView>
  );
}
