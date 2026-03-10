import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './locales/en.json';

const resources = {
  en: { translation: en },
};

const normalizeLanguage = (locale: string) => {
  const base = locale.split('-')[0];
  return base in resources ? base : 'en';
};

export const initI18n = async () => {
  if (i18n.isInitialized) return i18n;

  const deviceLocale = Localization.getLocales()[0]?.languageTag ?? 'en';
  const language = normalizeLanguage(deviceLocale);

  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: language,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

  return i18n;
};

export const setLanguage = async (language: string) => {
  const next = normalizeLanguage(language);
  await i18n.changeLanguage(next);
};

export default i18n;
