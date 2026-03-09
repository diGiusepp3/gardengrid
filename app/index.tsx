import { Redirect } from 'expo-router';
import { useSessionStore } from '../src/state';

export default function Index() {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  return <Redirect href={isAuthenticated ? '/(tabs)' : '/(auth)/login'} />;
}
