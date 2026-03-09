import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Screen, Section } from '../../src/components';
import { theme } from '../../src/core/theme';

export default function TaskListScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Task list</Text>
        <Section title="Upcoming">
          <Card>
            <Text style={styles.cardTitle}>Water greenhouse beds</Text>
            <Text style={styles.cardBody}>Tomorrow · 07:00</Text>
          </Card>
        </Section>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xl,
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.xxl,
    color: theme.semantic.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.md,
    color: theme.semantic.textPrimary,
  },
  cardBody: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.semantic.textSecondary,
    marginTop: theme.spacing.xs,
  },
});
