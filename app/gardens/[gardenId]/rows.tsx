import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Screen, Section } from '../../../src/components';
import { theme } from '../../../src/core/theme';

export default function RowsScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Rows</Text>
        <Section title="Main beds">
          <Card>
            <Text style={styles.cardTitle}>Row 1</Text>
            <Text style={styles.cardBody}>8m length · Leafy greens</Text>
          </Card>
          <Card style={styles.cardSpacing}>
            <Text style={styles.cardTitle}>Row 2</Text>
            <Text style={styles.cardBody}>8m length · Root vegetables</Text>
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
  cardSpacing: {
    marginTop: theme.spacing.md,
  },
});
