import config from '@/tamagui.config';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        <SafeAreaView
          style={{ flex: 1, backgroundColor: 'white' }}
          edges={['top', 'left', 'right']}
        >
          <StatusBar barStyle="dark-content" />
          <Stack screenOptions={{ headerShown: false, statusBarStyle: 'dark' }} />
        </SafeAreaView>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
