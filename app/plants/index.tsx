import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button, Card, Screen, Section } from '../../src/components';
import { theme } from '../../src/core/theme';

export default function PlantListScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Plants</Text>
        <Link href="/plants/edit" asChild>
          <Button label="Add plant" />
        </Link>
        <Section title="Current crops">
          <Card>
            <Text style={styles.cardTitle}>Tomato · Roma</Text>
            <Text style={styles.cardBody}>6 plants · Greenhouse</Text>
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
