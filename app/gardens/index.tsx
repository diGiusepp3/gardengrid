import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Screen, Section } from '../../src/components';
import { theme } from '../../src/core/theme';

export default function GardenListScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Garden list</Text>
          <Link href="/gardens/create" asChild>
            <Button label="Create garden" />
          </Link>
        </View>
        <Section title="Your gardens">
          <Link href="/gardens/1" asChild>
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>Backyard Kitchen Garden</Text>
              <Text style={styles.cardBody}>12m x 8m · 3 fields · 1 greenhouse</Text>
            </Card>
          </Link>
        </Section>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.xxl,
    color: theme.semantic.textPrimary,
    marginBottom: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.md,
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
