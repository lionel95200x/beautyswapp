import 'react-native-reanimated';
import { useEffect } from 'react';
import * as Updates from 'expo-updates';
import LogRocket from '@logrocket/react-native';
import { AppProviders } from '@/components/AppProviders';

const LOGROCKET_ENABLED = process.env.EXPO_PUBLIC_LOGROCKET_ENABLED === 'true'
const LOGROCKET_APP_ID = process.env.EXPO_PUBLIC_LOGROCKET_APP_ID

if (LOGROCKET_ENABLED && !LOGROCKET_APP_ID) {
  throw new Error('EXPO_PUBLIC_LOGROCKET_APP_ID is required when LOGROCKET_ENABLED=true')
}

export default function RootLayout() {
  useEffect(() => {
    if (LOGROCKET_ENABLED && LOGROCKET_APP_ID) {
      try {
        LogRocket.init(LOGROCKET_APP_ID, {
          updateId: Updates.isEmbeddedLaunch ? null : Updates.updateId,
          expoChannel: Updates.channel,
        });
        console.log('[LogRocket] Initialized successfully');
      } catch (error) {
        console.error('[LogRocket] Initialization failed:', error);
      }
    }
  }, []);

  return <AppProviders />;
}
