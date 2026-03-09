import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Screen } from '../../src/components';
import { theme } from '../../src/core/theme';
import { useSessionStore } from '../../src/state';

export default function ProfileScreen() {
  const user = useSessionStore((state) => state.user);
  const signOut = useSessionStore((state) => state.signOut);

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Card>
          <Text style={styles.name}>{user?.name ?? 'Guest'}</Text>
          <Text style={styles.email}>{user?.email ?? 'Not signed in'}</Text>
          <Button label="Sign out" variant="secondary" onPress={signOut} />
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.xl,
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.xxl,
    color: theme.semantic.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  name: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.lg,
    color: theme.semantic.textPrimary,
  },
  email: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.semantic.textSecondary,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
});
