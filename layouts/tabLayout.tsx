import { Icon } from '@/components/ui';
import { Tabs } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function TabLayout() {
  // useFocusEffect(
  //   useCallback(() => {
  //     if (Platform.OS === 'android') {
  //       StatusBar.setBackgroundColor('white', true);
  //     }
  //     StatusBar.setBarStyle('dark-content', true);
  //     return undefined;
  //   }, [])
  // );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }}
      edges={['top', 'left', 'right']}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#D43900",
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '400',
          },
          tabBarStyle: {
            paddingTop: 12,
            height: 98,
            borderTopColor: "#E7E8EC",
            borderTopWidth: 1,
          }
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Tasks',
            tabBarIcon: ({ focused }) => <Icon size={24} name={focused ? "t_tasks_active" : "t_tasks"} padding={4} />,
          }}
        />
        <Tabs.Screen
          name="alerts"
          options={{
            title: 'Alerts',
            tabBarIcon: ({ focused }) => <Icon size={24} name={focused ? "t_alerts" : "t_alerts"} padding={4} />,
          }}
        />
        <Tabs.Screen
          name="metrics"
          options={{
            title: 'Metrics',
            tabBarIcon: ({ focused }) => <Icon size={24} name={focused ? "t_metrics_active" : "t_metrics"} padding={4} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
