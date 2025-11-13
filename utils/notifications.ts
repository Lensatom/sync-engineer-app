import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { Platform } from 'react-native';

// Conditionally silence RNFirebase "No background message handler" if the package is present.
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const messaging = require('@react-native-firebase/messaging')?.default;
  if (typeof messaging === 'function') {
    messaging().setBackgroundMessageHandler(async () => {
      // no-op; OS popup handled via server title/body payload.
    });
  }
} catch {
  // RNFirebase not installed/configured — ignore
}

// Foreground: show popups and sounds
Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

let receivedSub: Notifications.Subscription | null = null;
let responseSub: Notifications.Subscription | null = null;

// Ensure Android channels (heads-up)
async function ensureAndroidChannels() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('default', {
    name: 'Default',
    importance: Notifications.AndroidImportance.HIGH,
    sound: 'default',
  });
  await Notifications.setNotificationChannelAsync('alert', {
    name: 'Alert Notifications',
    importance: Notifications.AndroidImportance.MAX, // heads-up
    sound: 'default',
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
  });
}

// Ask permission and return Expo token
async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    console.warn('[push] Physical device required.');
    return undefined;
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.warn('[push] Permission not granted.');
    return undefined;
  }

  const token = (await Notifications.getExpoPushTokenAsync({
    projectId:
      (Constants.expoConfig?.extra as any)?.eas?.projectId ||
      (Constants as any)?.easConfig?.projectId ||
      (Constants as any)?.manifest2?.extra?.expoClient?.projectId,
  })).data;
  console.log('✅ [push] Expo token:', token);

  await ensureAndroidChannels();
  return token;
}

// Foreground: route immediately and mirror a visible local notification (works with nested data.notification too)
async function onForegroundReceived(n: Notifications.Notification) {
  const c = n.request.content;
  const nested = (c?.data as any)?.notification || {};
  const title = c.title ?? nested.title ?? '⚠️ Emergency Alert';
  const body = c.body ?? nested.body ?? 'Tap to view alert';

  // If neither top-level nor nested provided, warn — OS cannot show background popup without title/body
  if (!c.title && !c.body && !nested.title && !nested.body) {
    console.warn('[push] Server payload missing top-level title/body (and nested notification.title/body). Background popups require title/body on the server payload.');
  }

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: c.data,
        sound: 'default',
        channelId: 'alert', // ensure Android heads-up
      },
      trigger: null,
    });
  } catch (e) {
    console.warn('[push] mirror local heads-up failed:', e);
  }

  try { router.push('/pager'); } catch (e) { console.warn('[push] route error:', e); }
}

// Background/killed: route when user taps the OS popup
function onUserResponse(r: Notifications.NotificationResponse) {
  try { router.push('/pager'); } catch (e) { console.warn('[push] route error:', e); }
}

// Cold start: if opened from a tap, route
async function handleColdStart() {
  const initial = await Notifications.getLastNotificationResponseAsync();
  if (initial) {
    try { router.push('/pager'); } catch (e) { console.warn('[push] route error:', e); }
  }
}

// Public API
export async function initPushFlow() {
  const expoToken = await registerForPushNotificationsAsync();
  try { receivedSub?.remove(); } catch {}
  try { responseSub?.remove(); } catch {}

  receivedSub = Notifications.addNotificationReceivedListener(onForegroundReceived);
  responseSub = Notifications.addNotificationResponseReceivedListener(onUserResponse);

  await handleColdStart();
  return { expoToken, fcmToken: undefined };
}

export function disposePushFlow() {
  try { receivedSub?.remove(); } catch {}
  try { responseSub?.remove(); } catch {}
  receivedSub = null;
  responseSub = null;
}
