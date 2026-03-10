import { Redirect, useRouter } from 'expo-router';
import { eq } from 'drizzle-orm';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, FormField, Screen, Tag } from '../../src/components';
import { theme } from '../../src/core/theme';
import { db } from '../../src/data/db/client';
import { users } from '../../src/data/db/schema';
import { useSessionStore } from '../../src/state';

export default function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const setUser = useSessionStore((state) => state.setUser);
  const [email, setEmail] = useState('gielenmatthias68@gmail.com');
  const [password, setPassword] = useState('7824');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const matches = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail));

    const user = matches.find((candidate) => candidate.password === normalizedPassword);

    if (!user) {
      setError(t('auth.invalidCredentials'));
      return;
    }

    setError(null);
    await db
      .update(users)
      .set({ lastLogin: new Date().toISOString(), updatedAt: new Date().toISOString() })
      .where(eq(users.id, user.id));

    setUser({
      id: user.id,
      email: user.email,
      name: user.name,
      photoUrl: user.photoUrl ?? undefined,
    });
    router.replace('/(tabs)');
  };

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

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
        <FormField
          label={t('auth.emailLabel')}
          placeholder={t('auth.emailPlaceholder')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <FormField
          label={t('auth.passwordLabel')}
          placeholder={t('auth.passwordPlaceholder')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <Button label={t('auth.signIn')} onPress={() => void handleLogin()} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.note}>Sign in with your local GardenGrid account.</Text>
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
  error: {
    fontFamily: theme.typography.fontFamily.bodyMedium,
    fontSize: theme.typography.size.sm,
    color: theme.semantic.danger,
    marginTop: theme.spacing.sm,
  },
});
