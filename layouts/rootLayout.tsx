import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import config from '@/tamagui.config';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';

export const unstable_settings = {
  anchor: '(tabs)',
};

export function RootLayout() {
  // const colorScheme = useColorScheme();

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
