import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { translations } from '../lib/translations';

export type Locale = 'en' | 'es' | 'pt-BR';
type Translations = typeof translations.en;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof Translations | string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getNestedTranslation = (obj: Translations, key: string): string => {
  // The translation object uses a flat structure with dot-notation keys (e.g., 'sidebar.title').
  // The previous implementation incorrectly tried to traverse a nested object.
  // This direct property access correctly retrieves the translation for the given key.
  return (obj as Record<string, string>)[key] || key;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const savedLocale = localStorage.getItem('app-locale') as Locale;
    if (savedLocale && ['en', 'es', 'pt-BR'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // You could add browser language detection here
      setLocaleState('en');
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem('app-locale', newLocale);
    setLocaleState(newLocale);
  };

  const t = useCallback((key: keyof Translations | string): string => {
      const translationSet = translations[locale] || translations.en;
      return getNestedTranslation(translationSet, key as string);
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
