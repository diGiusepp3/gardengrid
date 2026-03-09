import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Screen, Tag } from '../../src/components';
import { theme } from '../../src/core/theme';
import { useSessionStore } from '../../src/state';

export default function LoginScreen() {
  const { t } = useTranslation();
  const setUser = useSessionStore((state) => state.setUser);

  const handleDemoLogin = () => {
    setUser({
      id: 'demo-user',
      email: 'demo@gardengrid.app',
      name: 'Garden Demo',
    });
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <Tag label="Android-first" tone="accent" />
        <Text style={styles.title}>{t('auth.welcomeTitle')}</Text>
        <Text style={styles.subtitle}>{t('auth.welcomeBody')}</Text>
      </View>
      <Card>
        <Text style={styles.cardTitle}>{t('app.name')}</Text>
        <Text style={styles.cardBody}>{t('app.tagline')}</Text>
        <Button label={t('auth.signInGoogle')} onPress={handleDemoLogin} />
        <Text style={styles.note}>Google Sign-In wiring is ready in auth layer.</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.xxl,
    color: theme.semantic.textPrimary,
    marginTop: theme.spacing.md,
  },
  subtitle: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.md,
    color: theme.semantic.textSecondary,
    marginTop: theme.spacing.sm,
  },
  cardTitle: {
    fontFamily: theme.typography.fontFamily.heading,
    fontSize: theme.typography.size.lg,
    color: theme.semantic.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  cardBody: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.md,
    color: theme.semantic.textSecondary,
    marginBottom: theme.spacing.md,
  },
  note: {
    fontFamily: theme.typography.fontFamily.body,
    fontSize: theme.typography.size.sm,
    color: theme.semantic.textSecondary,
    marginTop: theme.spacing.sm,
  },
});
