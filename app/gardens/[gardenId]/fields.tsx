import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Screen, Section, Tag } from '../../../src/components';
import { theme } from '../../../src/core/theme';

export default function FieldListScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Fields</Text>
        <Section title="Main beds">
          <Card>
            <Tag label="Raised" />
            <Text style={styles.cardTitle}>Main Beds</Text>
            <Text style={styles.cardBody}>8m x 4m · 4 rows</Text>
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
