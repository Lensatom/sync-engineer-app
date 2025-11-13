import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

let channelsReady = false;
async function ensureChannels() {
  if (channelsReady) return;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: 'default',
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
    await Notifications.setNotificationChannelAsync('alert', {
      name: 'Alert',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 300, 300, 300],
      lightColor: '#FF0000',
      sound: 'default',
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  }
  channelsReady = true;
}

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    alert('Must use physical device for push notifications');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token');
    return;
  }

  await ensureChannels();
  activateForegroundListeners();

  const projectId =
    (Constants?.expoConfig as any)?.extra?.eas?.projectId ??
    (Constants as any)?.easConfig?.projectId;

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  console.log('📱 Expo Push Token:', token);

  return token;
}

function parseMaybeJson(value: any) {
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch { return {}; }
}

let foregroundListenersActive = false;
function activateForegroundListeners() {
  if (foregroundListenersActive) return;
  foregroundListenersActive = true;
  console.log('[push] activating foreground listeners');

  let navigating = false;
  function navigateToPagerOnce() {
    if (navigating) return;
    navigating = true;
    try { router.push('/pager'); } catch (e) { console.warn('[push] navigation error:', e); }
    setTimeout(() => { navigating = false; }, 1200);
  }

  const received = Notifications.addNotificationReceivedListener(async notification => {
    const content = notification.request.content;
    const rawNested = (content.data as any)?.notification;
    const nested = parseMaybeJson(rawNested) || {};
    const title = content.title || nested.title || '';
    const body = content.body || nested.body || '';
    const alreadyMirrored = !!(content.data as any)?.__local_mirror;

    const isDataOnlyAndroid = Platform.OS === 'android' && !title && !body;
    const needsMirror = Platform.OS === 'ios' || isDataOnlyAndroid;

    if (needsMirror && !alreadyMirrored) {
      try {
        await ensureChannels();
        await Notifications.scheduleNotificationAsync({
          content: {
            title: title || 'Notification',
            body: body || '',
            data: { ...content.data, __local_mirror: true },
            sound: 'default',
          },
          trigger: null,
        });
        console.log('[push] mirrored foreground notification (platform:', Platform.OS, 'dataOnlyAndroid:', isDataOnlyAndroid, ')');
      } catch (e) {
        console.warn('[push] mirror failed:', e);
      }
    } else {
      console.log('[push] foreground notification (no mirror needed)');
    }

    if (!alreadyMirrored) navigateToPagerOnce();
  });

  const response = Notifications.addNotificationResponseReceivedListener(resp => {
    console.log('[push] notification tapped (foreground):', resp.notification.request.content.data);
    navigateToPagerOnce();
  });

  try {
    const messaging = require('@react-native-firebase/messaging')?.default;
    if (typeof messaging === 'function') {
      messaging().onMessage(async (remoteMessage: any) => {
        console.log('[push] firebase onMessage (foreground) received:', remoteMessage?.messageId || '');
        navigateToPagerOnce();
      });
    }
  } catch {
    // RNFirebase not installed — ignore
  }
}

export async function initializeNotificationsFlow() {
  const token = await registerForPushNotificationsAsync();
  if (!token) {
    console.warn('[push] initializeNotificationsFlow: Expo token unavailable');
  } else {
    console.log('[push] initializeNotificationsFlow complete');
  }
  return token;
}

export async function triggerLocalTest(title = 'Test', body = 'Local notification test') {
  await ensureChannels();
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
      data: { test: true }
    },
    trigger: null,
  });
  console.log('[push] local test notification scheduled');
}

export function useNotificationListener() {
  useEffect(() => {
    activateForegroundListeners();
  }, []);
}

try { activateForegroundListeners(); } catch {}