import { useState, useEffect } from 'react';
import { YStack, Text } from 'tamagui';
import { TouchableOpacity, Alert, Image as RNImage, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const MIN_PHOTOS = 3;
const MAX_PHOTOS = 5;

interface PhotoUploadProps {
  title: string;
  onPhotosChange: (photos: string[]) => void;
  initialPhotos?: string[];
}

export function PhotoUpload({ title, onPhotosChange, initialPhotos }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<string[]>(initialPhotos || []);

  useEffect(() => {
    if (initialPhotos) {
      setPhotos(initialPhotos);
    }
  }, [initialPhotos]);

  const takePhoto = async () => {
    if (photos.length >= MAX_PHOTOS) return;

    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permission requise',
        'Vous devez autoriser l\'accès à la caméra pour prendre des photos'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      quality: 0.8,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets[0]) {
      const updatedPhotos = [...photos, result.assets[0].uri];
      setPhotos(updatedPhotos);
      onPhotosChange(updatedPhotos);
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };

  const remaining = MIN_PHOTOS - photos.length;
  const canAddMore = photos.length < MAX_PHOTOS;

  return (
    <YStack gap="$3">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text color="$purpleText" fontWeight="600" fontSize="$4">
          {title}
        </Text>
        <Text
          fontSize="$2"
          color={photos.length >= MIN_PHOTOS ? '#22c55e' : '$purpleText'}
          opacity={0.8}
        >
          {photos.length}/{MAX_PHOTOS}
          {photos.length < MIN_PHOTOS ? ` (min ${MIN_PHOTOS})` : ''}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {photos.map((photo, index) => (
          <View key={index} style={{ position: 'relative' }}>
            <RNImage
              source={{ uri: photo }}
              style={{ width: 100, height: 100, borderRadius: 8 }}
            />
            <TouchableOpacity
              onPress={() => removePhoto(index)}
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                backgroundColor: '#e60b0f',
                borderRadius: 12,
                width: 24,
                height: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="close" size={16} color="white" />
            </TouchableOpacity>
          </View>
        ))}

        {canAddMore && (
          <TouchableOpacity onPress={takePhoto}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: '#8e6fe8',
                borderStyle: 'dashed',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
              }}
            >
              <Ionicons name="camera-outline" size={32} color="#8e6fe8" />
              {remaining > 0 && (
                <Text fontSize="$1" color="$purpleText" mt="$1" textAlign="center">
                  +{remaining} requise{remaining > 1 ? 's' : ''}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>

      {photos.length === 0 && (
        <Text fontSize="$2" color="$purpleText" opacity={0.6} textAlign="center">
          Prenez au moins {MIN_PHOTOS} photos avec votre caméra
        </Text>
      )}
    </YStack>
  );
}
