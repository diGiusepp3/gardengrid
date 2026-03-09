import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, Screen, Section } from '../../src/components';
import { theme } from '../../src/core/theme';
import { setLanguage } from '../../src/core/i18n';
import { useSettingsStore } from '../../src/state';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'nl', label: 'Dutch' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
];

export default function SettingsTab() {
  const { t } = useTranslation();
  const language = useSettingsStore((state) => state.language);
  const setLang = useSettingsStore((state) => state.setLanguage);

  const handleLanguage = async (code: string) => {
    setLang(code);
    await setLanguage(code);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>{t('settings.title')}</Text>
        <Section title={t('settings.language')}>
          <Card>
            {languages.map((lang) => (
              <Pressable
                key={lang.code}
                style={styles.row}
                onPress={() => handleLanguage(lang.code)}
              >
                <Text style={styles.rowLabel}>{lang.label}</Text>
                {language === lang.code && <Text style={styles.rowValue}>Active</Text>}
              </Pressable>
            ))}
          </Card>
        </Section>
        <Section title="Account">
          <Card>
            <Link href="/settings/profile" asChild>
              <Pressable style={styles.row}>
                <Text style={styles.rowLabel}>Profile</Text>
                <Text style={styles.rowValue}>View</Text>
              </Pressable>
            </Link>
          </Card>
        </Section>
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
  row: {
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.semantic.border,
  },
  rowLabel: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.md,
    color: theme.semantic.textPrimary,
  },
  rowValue: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.semantic.primary,
  },
});
