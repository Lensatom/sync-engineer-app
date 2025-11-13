import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import '../utils/notifeeBackground'; // register Notifee background handlers

import config from '@/tamagui.config';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';

import { disposePushFlow, initPushFlow } from '../utils/notifications';

export const unstable_settings = {
  anchor: '(tabs)',
};

export function RootLayout() {
  useEffect(() => {
    let mounted = true;
    (async () => {
      await initPushFlow();
      if (!mounted) return;
    })();
    return () => {
      mounted = false;
      disposePushFlow();
    };
  }, []);

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
