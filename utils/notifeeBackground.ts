import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';

// Helper: safely parse JSON strings
function parseMaybeJson<T = any>(value: unknown): T | undefined {
  if (typeof value !== 'string') return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

// Extract title/body from various FCM shapes
function extractTitleBody(remoteMessage: any) {
  const data = remoteMessage?.data || {};
  const notifObj =
    remoteMessage?.notification ??
    parseMaybeJson<{ title?: string; body?: string }>(data?.notification) ??
    undefined;

  const title =
    notifObj?.title ??
    data?.title ??
    data?.notification?.title ??
    data?.alert_title ??
    data?.gcm_notification_title ??
    '⚠️ Emergency Alert';

  const body =
    notifObj?.body ??
    data?.body ??
    data?.notification?.body ??
    data?.alert_body ??
    data?.gcm_notification_body ??
    'Tap to view alert';

  return { title, body, data };
}

// Ensure alert channel exists before any display.
let channelReady = false;
async function ensureAlertChannel() {
  if (channelReady) return;
  await notifee.createChannel({
    id: 'alert',
    name: 'Alert Notifications',
    importance: AndroidImportance.HIGH,
    sound: 'default',
    visibility: AndroidVisibility.PUBLIC,
    vibration: true,
  });
  channelReady = true;
}

// Optional: if @react-native-firebase/messaging is installed, register a background handler.
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const messaging = require('@react-native-firebase/messaging')?.default;
  if (typeof messaging === 'function') {
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      try {
        // Only data-only messages are delivered here on Android when app is backgrounded/killed.
        const { title, body, data } = extractTitleBody(remoteMessage);

        // Basic sanity checks to avoid empty notifs.
        if (!title && !body) {
          console.warn('[notifee][bg] skipped: empty payload', remoteMessage?.messageId);
          return;
        }

        await ensureAlertChannel();

        await notifee.displayNotification({
          title,
          body,
          data,
          android: {
            channelId: 'alert',
            importance: AndroidImportance.HIGH,
            category: AndroidCategory.CALL,
            visibility: AndroidVisibility.PUBLIC,
            pressAction: { id: 'default', launchActivity: 'default' },
          },
        });
      } catch (e) {
        console.warn('[notifee][background][messaging] error', e);
      }
    });
  } else {
    console.warn('[notifee][background] RNFirebase messaging not available (no-op)');
  }
} catch {
  // RNFirebase not installed — ignore
}

// Notifee background events (runs in headless context when app is backgrounded/killed)
notifee.onBackgroundEvent(async ({ type, detail }) => {
  try {
    // Avoid redisplaying notifications on DELIVERED to prevent duplicates.
    if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
      // Handle action/press if needed (analytics/deep link), keep minimal in headless mode.
      // ...no-op or add lightweight handling...
      return;
    }
    // Ignore other events here.
  } catch (e) {
    console.warn('[notifee][background] error', e);
  }
});
