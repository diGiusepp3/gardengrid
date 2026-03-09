import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Screen, Section, Tag } from '../../../src/components';
import { theme } from '../../../src/core/theme';

export default function StructuresScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Structures</Text>
        <Section title="Protected growing">
          <Card>
            <Tag label="Greenhouse" />
            <Text style={styles.cardTitle}>Glasshouse</Text>
            <Text style={styles.cardBody}>2.5m x 3.5m · Active</Text>
          </Card>
        </Section>
        <Section title="Infrastructure">
          <Card>
            <Tag label="Water point" tone="accent" />
            <Text style={styles.cardTitle}>Rain barrel</Text>
            <Text style={styles.cardBody}>200L · East fence</Text>
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
    marginTop: theme.spacing.sm,
  },
  cardBody: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.semantic.textSecondary,
    marginTop: theme.spacing.xs,
  },
});
