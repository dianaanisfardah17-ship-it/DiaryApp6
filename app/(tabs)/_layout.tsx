import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import type { ComponentProps } from 'react';

type IconName = ComponentProps<typeof Ionicons>['name'];

const ACTIVE = '#A78BFA';
const INACTIVE = '#B8B0C8';

const tabIcon =
  (active: IconName, inactive: IconName) =>
  ({ focused }: { focused: boolean }) => (
    <Ionicons
      name={focused ? active : inactive}
      size={22}
      color={focused ? ACTIVE : INACTIVE}
    />
  );

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
          elevation: 12,
          shadowColor: '#A78BFA',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: tabIcon('home', 'home-outline'),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: tabIcon('heart', 'heart-outline'),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: tabIcon('add-circle', 'add-circle-outline'),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: tabIcon('settings', 'settings-outline'),
        }}
      />
    </Tabs>
  );
}