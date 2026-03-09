import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAppBootstrap } from '../src/hooks/useAppBootstrap';
import { theme } from '../src/core/theme';

export default function RootLayout() {
  const { ready } = useAppBootstrap();

  if (!ready) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.semantic.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.semantic.primary} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="gardens" />
      <Stack.Screen name="plants" />
      <Stack.Screen name="tasks" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
