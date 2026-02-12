import { useState, useEffect } from 'react';
import { YStack, Heading, Text } from 'tamagui';
import { TouchableOpacity, Alert, Image as RNImage, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

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

  const pickImages = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission requise', 'Vous devez autoriser l\'accès à la galerie photo');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 5,
    });

    if (!result.canceled && result.assets) {
      const newPhotos = result.assets.map(asset => asset.uri);
      const updatedPhotos = [...photos, ...newPhotos].slice(0, 5);
      setPhotos(updatedPhotos);
      onPhotosChange(updatedPhotos);
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    onPhotosChange(updatedPhotos);
  };

  return (
    <YStack gap="$2">
      <Heading size="$4" color="$purpleText">
        {title}
      </Heading>

      <TouchableOpacity onPress={pickImages}>
        <View
          style={{
            borderColor: '#8e6fe8',
            borderWidth: 2,
            borderStyle: 'dashed',
            borderRadius: 12,
            padding: 16,
            minHeight: 120,
            backgroundColor: 'transparent',
          }}
        >
          {photos.length === 0 ? (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="cloud-upload-outline" size={48} color="#8e6fe8" />
              <Text color="$purpleText" mt="$2" fontSize="$4">
                Appuyez pour ajouter des photos
              </Text>
              <Text color="$purpleText" fontSize="$2" opacity={0.7}>
                Maximum 5 photos
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {photos.map((photo, index) => (
                <View key={index} style={{ position: 'relative' }}>
                  <RNImage
                    source={{ uri: photo }}
                    style={{ width: 100, height: 100, borderRadius: 8 }}
                  />
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      removePhoto(index);
                    }}
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
              {photos.length < 5 && (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#8e6fe8',
                    borderStyle: 'dashed',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}
                >
                  <Ionicons name="add" size={32} color="#8e6fe8" />
                </View>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </YStack>
  );
}
