import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { TamaguiProvider } from '@tamagui/core'
import { PortalProvider } from '@tamagui/portal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StripeProviderWrapper as StripeProvider } from '@/providers/StripeProviderWrapper'
import config from '../tamagui.config'
import { useState } from 'react'

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/contexts/AuthContext';

const STRIPE_ENABLED = process.env.EXPO_PUBLIC_STRIPE_ENABLED === 'true'
const STRIPE_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY

// En production (STRIPE_ENABLED=true), la clé est obligatoire
if (STRIPE_ENABLED && !STRIPE_PUBLISHABLE_KEY) {
  throw new Error('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY is required when STRIPE_ENABLED=true')
}

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient())
  const colorScheme = useColorScheme();

  const content = (
    <TamaguiProvider config={config} defaultTheme="light">
      <PortalProvider shouldAddRootHost>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="welcome-login" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="products/[id]" options={{ title: 'Produit' }} />
            <Stack.Screen name="checkout" options={{ title: 'Paiement' }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PortalProvider>
    </TamaguiProvider>
  )

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        {STRIPE_ENABLED && STRIPE_PUBLISHABLE_KEY ? (
          <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
            {content}
          </StripeProvider>
        ) : (
          content
        )}
      </QueryClientProvider>
    </AuthProvider>
  );
}
