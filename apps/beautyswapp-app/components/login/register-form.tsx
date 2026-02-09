import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { AuthLayout } from './auth-layout';
import { AuthField } from './auth-fields';
import { useAuth } from '@/hooks/useAuth';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { signUp, loading } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await signUp(email, password, firstName, lastName);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <AuthLayout
      title="Inscription"
      subtitle="Rejoins la communauté Beautyswapp"
      onSubmit={handleRegister}
      submitText="S'inscrire"
      loading={loading}
      footerText="Déjà un compte ?"
      footerLinkText="Se connecter"
      footerLinkHref="/login"
    >
      <AuthField
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Prénom"
        icon="person-outline"
        autoCapitalize="words"
      />
      <AuthField
        value={lastName}
        onChangeText={setLastName}
        placeholder="Nom"
        icon="person-outline"
        autoCapitalize="words"
      />
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
