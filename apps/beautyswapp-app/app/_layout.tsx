import 'react-native-reanimated';
import { AppProviders } from '@/components/AppProviders';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://c45f2bd955f599742c3bf1dc0013a20d@o4510749955129344.ingest.de.sentry.io/4510908885172304',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  return <AppProviders />;
});