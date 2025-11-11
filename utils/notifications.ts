import { Audio } from 'expo-av';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

let currentAlertSound: Audio.Sound | null = null;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: false,
    shouldShowList: false,
  }),
});

export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  try {
    if (!Device.isDevice) {
      console.warn('Push notifications are not available on emulators/simulators.');
      return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Push notification permission not granted.');
      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    console.log('Expo Push Token:', tokenData.data);

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    return tokenData.data;
  } catch (e: any) {
    // Detect the common Firebase initialization error and give a helpful hint
    const msg = (e && e.message) ? e.message : String(e);
    console.error('registerForPushNotificationsAsync failed:', e);

    if (msg.includes('Default FirebaseApp is not initialized') || msg.includes('FirebaseApp')) {
      console.warn(
        'Firebase is not initialized in the native Android process. ' +
        'Follow https://docs.expo.dev/push-notifications/fcm-credentials/ to add google-services.json and rebuild the app.'
      );
    }

    // Return undefined so callers can continue gracefully
    return undefined;
  }
}

export async function playAlertSound() {
  try {
    await stopAlertSound();

    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/audio/alert.mp3'),
      { shouldPlay: true, isLooping: true }
    );
    currentAlertSound = sound;
  } catch (e) {
    console.error('Error playing alert sound', e);
  }
}

export async function stopAlertSound() {
  try {
    if (currentAlertSound) {
      try {
        await currentAlertSound.stopAsync();
      } catch (e) {
        // ignore stop errors
      }
      try {
        await currentAlertSound.unloadAsync();
      } catch (e) {
        // ignore unload errors
      }
      currentAlertSound = null;
    }
  } catch (e) {
    console.error('Error stopping alert sound', e);
  }
}