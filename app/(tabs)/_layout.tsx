import { Tabs } from 'expo-router';
import { theme } from '../../src/core/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.semantic.primary,
        tabBarInactiveTintColor: theme.semantic.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.semantic.surface,
          borderTopColor: theme.semantic.border,
          height: 64,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamily.bodyMedium,
          fontSize: theme.typography.size.sm,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="gardens" options={{ title: 'Gardens' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tasks' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
