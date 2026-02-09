import { YStack, XStack, Heading, Text, Input, Image, useTheme } from 'tamagui';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();

  const handleLogin = () => {
    console.log('Login:', { email, password });
  };

  return (
    <YStack
      padding="$6"
      gap="$4"
      width="100%"
      maxWidth={400}
    >
        <YStack gap="$2" alignItems="center">
          <Image
            src={require('@/assets/images/logo.png')}
            width={80}
            height={80}
            marginBottom="$3"
          />
          <Heading size="$8" color="$purpleText" textAlign="center">
            Connexion
          </Heading>
          <Text color="$purpleText" textAlign="center">
            Bienvenue sur Beautyswapp
          </Text>
        </YStack>

        <YStack gap="$3">
          <XStack
            gap="$3"
            alignItems="center"
            backgroundColor="transparent"
            borderRadius="$4"
            paddingHorizontal="$3"
            borderWidth={1}
            borderColor="$purpleText"
          >
            <Ionicons name="mail-outline" size={20} color={theme.purpleText.get()} />
            <Input
              placeholder="Email"
              placeholderTextColor="$purpleText"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              size="$5"
              flex={1}
              borderWidth={0}
              backgroundColor="transparent"
              color="$purpleText"
            />
          </XStack>

          <XStack
            gap="$3"
            alignItems="center"
            backgroundColor="transparent"
            borderRadius="$4"
            paddingHorizontal="$3"
            borderWidth={1}
            borderColor="$purpleText"
          >
            <Ionicons name="lock-closed-outline" size={20} color={theme.purpleText.get()} />
            <Input
              placeholder="Mot de passe"
              placeholderTextColor="$purpleText"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              size="$5"
              flex={1}
              borderWidth={0}
              backgroundColor="transparent"
              color="$purpleText"
            />
          </XStack>

          <Button
            variant="primary"
            onPress={handleLogin}
            marginTop="$2"
          >
            Se connecter
          </Button>
        </YStack>

        <Text color="$gray10" fontSize="$3" textAlign="center" marginTop="$2">
          Pas encore de compte ?{' '}
          <Text color="$primary" fontWeight="600">
            S'inscrire
          </Text>
        </Text>
      </YStack>
  );
}
