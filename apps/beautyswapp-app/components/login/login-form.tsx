import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { AuthLayout } from './auth-layout';
import { AuthField } from './auth-fields';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <AuthLayout
      title="Connexion"
      subtitle="Bienvenue sur Beautyswapp"
      onSubmit={handleLogin}
      submitText="Se connecter"
      loading={loading}
      footerText="Pas encore de compte ?"
      footerLinkText="S'inscrire"
      footerLinkHref="/register"
    >
      <AuthField
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        icon="mail-outline"
        keyboardType="email-address"
      />
      <AuthField
        value={password}
        onChangeText={setPassword}
        placeholder="Mot de passe"
        icon="lock-closed-outline"
        secureTextEntry
      />
    </AuthLayout>
  );
}
