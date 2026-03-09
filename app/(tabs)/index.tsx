import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Screen, Section, Tag } from '../../src/components';
import { theme } from '../../src/core/theme';

export default function DashboardScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('dashboard.title')}</Text>
          <Text style={styles.subtitle}>{t('dashboard.subtitle')}</Text>
          <View style={styles.tagRow}>
            <Tag label="Offline-first" />
            <Tag label="Android" tone="muted" />
          </View>
        </View>

        <Section title="Garden health">
          <Card>
            <Text style={styles.cardTitle}>Moisture check</Text>
            <Text style={styles.cardBody}>2 zones need watering within 24 hours.</Text>
          </Card>
        </Section>

        <Section title="Upcoming tasks">
          <Card>
            <Text style={styles.cardTitle}>Water greenhouse beds</Text>
            <Text style={styles.cardBody}>Scheduled for tomorrow morning.</Text>
          </Card>
        </Section>

        <Section title="Planting focus">
          <Card>
            <Text style={styles.cardTitle}>Spring sowing</Text>
            <Text style={styles.cardBody}>Carrots, spinach, peas, and basil.</Text>
          </Card>
        </Section>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing.xxxl,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.xxl,
    color: theme.semantic.textPrimary,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.md,
    color: theme.semantic.textSecondary,
    marginTop: theme.spacing.xs,
  },
  tagRow: {
    flexDirection: 'row',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.md,
  },
  cardTitle: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.md,
    color: theme.semantic.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  cardBody: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.semantic.textSecondary,
  },
});
