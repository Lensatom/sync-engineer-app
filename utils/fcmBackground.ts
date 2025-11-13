// Minimal background handler for @react-native-firebase/messaging to silence warnings.
// Does not alter Expo Notifications flow. OS popup is handled by server-provided title/body.
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const messaging = require('@react-native-firebase/messaging')?.default;
  if (typeof messaging === 'function') {
    messaging().setBackgroundMessageHandler(async () => {
      // no-op
    });
  }
} catch {
  // RNFirebase not installed/configured — ignore
}
