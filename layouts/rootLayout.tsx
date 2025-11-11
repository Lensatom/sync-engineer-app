import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import config from '@/tamagui.config';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';

import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { playAlertSound, registerForPushNotificationsAsync } from '../utils/notifications';

export const unstable_settings = {
  anchor: '(tabs)',
};

export function RootLayout() {
  const router = useRouter();
  const notificationListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // call registration in an async IIFE and handle errors to avoid "Uncaught (in promise)"
    (async () => {
      try {
        await registerForPushNotificationsAsync();
      } catch (e) {
        console.warn('registerForPushNotificationsAsync threw:', e);
      }
    })();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      const data = notification.request.content.data as { screen?: string; pageIndex?: number };

      if (data?.screen === 'pager') {
        playAlertSound();
        router.push({
          pathname: '/pager',
          params: { index: String(data.pageIndex ?? 0), alert: 'true' },
        });
      }
    });

    return () => {
      notificationListener.current?.remove();
      notificationListener.current = null;
    };
  }, []);

  return (
    <TamaguiProvider config={config}>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "white" }}
          edges={['top', 'left', 'right']}
        >
          <StatusBar barStyle="dark-content" />
          <Stack screenOptions={{ headerShown: false, statusBarStyle: 'dark' }} />
        </SafeAreaView>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
