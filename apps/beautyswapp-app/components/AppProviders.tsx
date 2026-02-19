import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider } from '@tamagui/core'
import { PortalProvider } from '@tamagui/portal'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import config from '../tamagui.config'
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/contexts/AuthContext';

const queryClient = new QueryClient()

export function AppProviders() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config} defaultTheme="light">
          <PortalProvider shouldAddRootHost>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="aide" options={{ headerShown: false }} />
                <Stack.Screen name="welcome-login" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="register" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="categories/index" options={{ headerShown: false }} />
                <Stack.Screen name="products/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="vanity/edit/[productId]/index" options={{ headerShown: false }} />
                <Stack.Screen name="checkout" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ headerShown: false, presentation: 'modal' }} />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </PortalProvider>
        </TamaguiProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
