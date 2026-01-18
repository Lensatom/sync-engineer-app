import { useRetrieveUser, useUpdateNotifToken } from '@/api/auth';
import { queryClient } from '@/config/tanstack';
import config from '@/tamagui.config';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import 'react-native-reanimated';
import { TamaguiProvider, View } from 'tamagui';
import '../utils/notifeeBackground';
import { registerForPushNotificationsAsync, useNotificationListener } from '../utils/notifications';

import { LogBox } from 'react-native';

// Ignore all log notifications (including redbox errors)
LogBox.ignoreAllLogs(true);

export const unstable_settings = {
  anchor: '(tabs)',
};

type UserContextValue = {
  user: any;
  isLoading: boolean;
  refresh: () => void;
  signOut: () => Promise<void>;
  setUser: (u: any) => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const { user: fetchedUser, isLoading, refetch } = useRetrieveUser();
  const [user, setUser] = useState<any>(fetchedUser);

  const refresh = useCallback(() => { refetch(); }, [refetch]);
  const signOut = useCallback(async () => {
    try { await queryClient.clear(); } catch {}
    setUser(null);
    router.replace('/login');
  }, []);

  useEffect(() => {
    if (!isLoading && !fetchedUser) {
      router.replace('/login');
    }
    setUser(fetchedUser);
  }, [fetchedUser, isLoading]);

  return (
    <UserContext.Provider value={{ user, isLoading, refresh, signOut, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <ThemeProvider value={DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <RootContent />
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

function RootContent() {
  const { updateNotifToken } = useUpdateNotifToken();
  
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  useNotificationListener();

  useEffect(() => {
    async function sendTokenToServer(expoToken: string) {
      await updateNotifToken({ expoToken });
    }

    registerForPushNotificationsAsync().then(token => {
      if (token) {
        sendTokenToServer(token);
      }
    });
  }, [updateNotifToken]);

  const { isLoading } = useUser();

  return isLoading ? (
    <View flex={1} jc="center" ai="center" bg="white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ActivityIndicator size="large" color="#D43900" />
    </View>
  ) : (
    <Stack screenOptions={{ headerShown: false, statusBarStyle: 'dark' }} />
  );
}
