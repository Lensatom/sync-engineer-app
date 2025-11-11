import { Icon } from '@/components/ui';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';
import React from 'react';

export function TabLayout() {
  const colorScheme = useColorScheme();

  return (
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
  );
}
