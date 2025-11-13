import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';

function parseMaybeJson<T = any>(value: unknown): T | undefined {
  if (typeof value !== 'string') return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

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
    '⚠️ Emergency Alert';

  const body =
    notifObj?.body ??
    data?.body ??
    data?.notification?.body ??
    'Tap to view alert';

  return { title, body, data };
}

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

try {
  const messaging = require('@react-native-firebase/messaging')?.default;
  if (typeof messaging === 'function') {
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      try {
        const { title, body, data } = extractTitleBody(remoteMessage);
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
            category: AndroidCategory.ALARM,
            visibility: AndroidVisibility.PUBLIC,
            pressAction: { id: 'default', launchActivity: 'default' },
          },
        });
        console.log('[notifee][bg] displayed notification');
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

notifee.onBackgroundEvent(async ({ type /*, detail*/ }) => {
  try {
    if (type === EventType.ACTION_PRESS || type === EventType.PRESS) {
      // no-op here; UI navigation handled in app runtime
      return;
    }
  } catch (e) {
    console.warn('[notifee][background] error', e);
  }
});
