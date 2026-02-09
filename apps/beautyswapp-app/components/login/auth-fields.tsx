import { XStack, Input, useTheme } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

interface AuthFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  keyboardType?: 'email-address' | 'default';
  autoCapitalize?: 'none' | 'words';
}

export function AuthField({
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: AuthFieldProps) {
  const theme = useTheme();

  return (
    <XStack
      gap="$3"
      alignItems="center"
      backgroundColor="transparent"
      borderRadius="$4"
      paddingHorizontal="$3"
      borderWidth={1}
      borderColor="$purpleText"
    >
      <Ionicons name={icon} size={20} color={theme.purpleText.get()} />
      <Input
        placeholder={placeholder}
        placeholderTextColor="$purpleText"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        size="$5"
        flex={1}
        borderWidth={0}
        backgroundColor="transparent"
        color="$purpleText"
      />
    </XStack>
  );
}
