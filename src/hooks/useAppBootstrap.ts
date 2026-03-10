import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Font from 'expo-font';
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { initI18n } from '../core/i18n';

export const useAppBootstrap = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await initI18n();
        await Font.loadAsync({
          Manrope_400Regular,
          Manrope_600SemiBold,
          Manrope_700Bold,
        });
        if (Platform.OS !== 'web') {
          const [{ rawDb }, { runMigrations }, { seedIfEmpty }] = await Promise.all([
            import('../data/db/client'),
            import('../data/db/migrations'),
            import('../data/seed/seed'),
          ]);
          await runMigrations(rawDb);
          await seedIfEmpty();
        }
      } finally {
        setReady(true);
      }
    };

    bootstrap();
  }, []);

  return { ready };
};
