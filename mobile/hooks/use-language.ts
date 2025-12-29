import { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import type { Language } from '@/lib/i18n';
import { t } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: keyof typeof t) => string;
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

export function useLanguageState() {
  const [language, setLanguageState] = useState<Language>('ar');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const saved = await AsyncStorage.getItem('language');
      const lang = (saved as Language) || 'ar';
      setLanguageState(lang);
      applyLanguage(lang);
    } catch (error) {
      console.error('Failed to load language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
      applyLanguage(lang);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  const applyLanguage = (lang: Language) => {
    const isRTL = lang === 'ar';
    I18nManager.forceRTL(isRTL);
  };

  return {
    language,
    setLanguage,
    isLoading,
  };
}
