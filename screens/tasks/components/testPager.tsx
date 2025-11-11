// app/index.tsx
import * as Notifications from 'expo-notifications';
import React from 'react';
import { Button, View } from 'react-native';

export function TestPager() {
  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🚨 New Alert',
        body: 'Pager is opening!',
        data: { screen: 'pager', pageIndex: 1 },
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Trigger Pager Notification" onPress={sendNotification} />
    </View>
  );
}