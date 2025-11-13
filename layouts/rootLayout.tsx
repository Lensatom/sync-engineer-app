import config from '@/tamagui.config';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';
import '../utils/notifeeBackground';
import { registerForPushNotificationsAsync, useNotificationListener } from '../utils/notifications';

export const unstable_settings = {
  anchor: '(tabs)',
};

export function RootLayout() {

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useNotificationListener();

  return (
    <TamaguiProvider config={config}>
      <ThemeProvider value={DefaultTheme}>
        <Slot />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
