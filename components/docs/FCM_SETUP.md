FCM Setup (direct Firebase Cloud Messaging) — actionable checklist
-----------------------------------------------------------------

Short summary
- Expo token (ExponentPushToken[...]) is different from raw FCM tokens.
- To get raw FCM tokens you must configure native Firebase and install react-native-firebase/messaging, then rebuild a native app (custom dev client or standalone). Expo Go will NOT give raw FCM tokens.

1) Install native Firebase packages
- In project root run:
  yarn add @react-native-firebase/app @react-native-firebase/messaging
  # or npm:
  # npm install @react-native-firebase/app @react-native-firebase/messaging

- iOS: run
  npx pod-install ios

2) Add Firebase config files
- Android:
  - Download google-services.json from Firebase console for your Android app.
  - Place it at: android/app/google-services.json
- iOS:
  - Download GoogleService-Info.plist and add to your Xcode project (ios/ or in the prebuilt project).
  - If using Expo prebuild, place it under ios/<YourApp>/ and ensure it's included in native project.

3) Android Gradle / manifest notes (example)
- In android/build.gradle (top-level) ensure:
  buildscript {
    dependencies {
      classpath('com.google.gms:google-services:4.3.15') // or newer
    }
  }
- In android/app/build.gradle (module) add at bottom:
  apply plugin: 'com.google.gms.google-services'

- Add POST_NOTIFICATIONS permission (Android 13+):
  <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

- Ensure MainActivity is exported if you rely on full-screen intents:
  <activity android:name=".MainActivity" android:exported="true" ... />

4) Rebuild native app
- For Expo-managed w/ prebuild + EAS:
  npx expo prebuild
  eas build --platform android --profile development (or preview/staging/production as needed)
- For bare/react-native:
  Android: cd android && ./gradlew clean assembleDebug
  iOS: npx pod-install && open ios/YourApp.xcworkspace && build from Xcode

5) Get the raw FCM token at runtime
- After installing native libs and rebuilding, call:
  import messaging from '@react-native-firebase/messaging';
  const fcmToken = await messaging().getToken();

- Our helper getRawFcmToken() attempts a dynamic import and logs instructions if package not installed.

6) Server payload examples
- Legacy HTTP (simple):
  POST https://fcm.googleapis.com/fcm/send
  Headers:
    Authorization: key=<SERVER_KEY>
    Content-Type: application/json
  Body:
  {
    "to": "<FCM_DEVICE_TOKEN>",
    "priority": "high",
    "notification": { "title": "Alert", "body": "Pager triggered" },
    "data": { "screen": "pager", "pageIndex": "1" }
  }

- HTTP v1 (recommended):
  POST https://fcm.googleapis.com/v1/projects/<PROJECT_ID>/messages:send
  Use OAuth2 service account credentials. Example message:
  {
    "message": {
      "token": "<FCM_DEVICE_TOKEN>",
      "android": {
        "priority": "HIGH",
        "notification": { "title": "Alert", "body": "Pager triggered" }
      },
      "data": { "screen": "pager", "pageIndex": "1" }
    }
  }

Node.js test sender (HTTP v1)
-----------------------------
Save the snippet below as tools/sendFcmV1.js and run:
  SERVICE_ACCOUNT_PATH=./path/to/service-account.json PROJECT_ID=your-project-id node tools/sendFcmV1.js <FCM_DEVICE_TOKEN>

Note: use the raw FCM token (messaging().getToken()) — not the Expo token.

```javascript
// tools/sendFcmV1.js
const { GoogleAuth } = require('google-auth-library');
const fetch = require('node-fetch');

async function sendFcmV1(targetToken, title='Test Alert', body='This is a test') {
  const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH;
  const projectId = process.env.PROJECT_ID;
  if (!serviceAccountPath || !projectId) {
    console.error('Set SERVICE_ACCOUNT_PATH and PROJECT_ID environment variables.');
    process.exit(1);
  }

  const auth = new GoogleAuth({
    keyFilename: serviceAccountPath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  const client = await auth.getClient();
  const accessToken = (await client.getAccessToken()).token;

  const url = `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`;
  const message = {
    message: {
      token: targetToken,
      android: {
        priority: 'HIGH',
        notification: { title, body },
      },
      data: { screen: 'pager', pageIndex: '1' },
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  const json = await res.json();
  console.log('FCM response:', json);
}

const token = process.argv[2];
if (!token) {
  console.error('Usage: node tools/sendFcmV1.js <FCM_DEVICE_TOKEN>');
  process.exit(1);
}

sendFcmV1(token).catch(err => {
  console.error('Failed to send FCM:', err);
  process.exit(1);
});
```

Testing checklist (quick)
- Build the app (you must rebuild native after adding google-services.json and native Firebase libs).
- Run the app on a physical device, open it once, then background/kill it.
- Obtain the raw FCM token from the debug panel (or use messaging().getToken()).
- Run the Node script with SERVICE_ACCOUNT_PATH and PROJECT_ID env vars and the token.
- Observe device behavior: notification delivered, notifee background handler and full-screen pager should trigger (check adb logcat if not).

Notes / troubleshooting
- If getRawFcmToken returns undefined: you either didn't install @react-native-firebase/messaging, or did not rebuild the native app after adding google-services.json.
- After replacing google-services.json you often need to uninstall/reinstall the app or perform a clean rebuild.
- Check adb logcat for Firebase/FCM errors on Android or device logs on iOS.
- Ensure the Android package name in Firebase matches app.json (com.lensatom.syncengineerapp).
- Make sure you register SHA-1 / SHA-256 for Release builds if using features requiring auth.

If you'd like, I can:
- add a small on-screen debug component that shows expoToken and raw FCM token for easy verification,
- or add a Node.js server snippet that sends FCM v1 messages using google-auth-library.
