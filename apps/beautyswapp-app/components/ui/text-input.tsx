import { YStack, Heading, Input } from 'tamagui';

interface TextInputFieldProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
}

export function TextInputField({
  title,
  value,
  onChangeText,
  placeholder,
  multiline,
  keyboardType,
}: TextInputFieldProps) {
  return (
    <YStack gap="$2">
      <Heading size="$4" color="$purpleText">
        {title}
      </Heading>

      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="$purpleText"
        borderColor="$purpleText"
        borderWidth={1}
        bg="transparent"
        color="$purpleText"
        p="$3"
        borderRadius="$4"
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        keyboardType={keyboardType}
      />
    </YStack>
  );
}
