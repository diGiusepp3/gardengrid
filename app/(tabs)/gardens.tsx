import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Screen } from '../../src/components';
import { theme } from '../../src/core/theme';

export default function GardensTab() {
  const { t } = useTranslation();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('gardens.title')}</Text>
          <Text style={styles.subtitle}>{t('gardens.empty')}</Text>
        </View>

        <Card>
          <Text style={styles.cardTitle}>Backyard Kitchen Garden</Text>
          <Text style={styles.cardBody}>12m x 8m · 3 fields · 1 greenhouse</Text>
          <Link href="/gardens" asChild>
            <Button label="Open gardens" />
          </Link>
        </Card>
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
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.semantic.textSecondary,
    marginTop: theme.spacing.xs,
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
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
});
