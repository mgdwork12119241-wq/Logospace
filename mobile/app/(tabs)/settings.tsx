import { ScrollView, Text, View, TouchableOpacity, Switch, I18nManager } from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useColors } from "@/hooks/use-colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Language } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export default function SettingsScreen() {
  const [language, setLanguage] = useState<Language>('ar');
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const colors = useColors();
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    // تطبيق اتجاه RTL
    I18nManager.forceRTL(language === 'ar');
  }, [language]);

  const loadSettings = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedNotifications = await AsyncStorage.getItem('notifications');

      if (savedLanguage) setLanguage(savedLanguage as Language);
      if (savedTheme) setTheme(savedTheme as any);
      if (savedNotifications) setNotificationsEnabled(JSON.parse(savedNotifications));
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleLanguageChange = async (lang: Language) => {
    setLanguage(lang);
    await AsyncStorage.setItem('language', lang);
    I18nManager.forceRTL(lang === 'ar');
  };

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const handleNotificationsChange = async (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    await AsyncStorage.setItem('notifications', JSON.stringify(enabled));
  };

  const SettingRow = ({ label, value, onPress }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row justify-between items-center px-4 py-4 border-b border-border"
    >
      <Text className="text-foreground font-medium">{label}</Text>
      <Text className="text-muted">{value}</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* رأس الإعدادات */}
        <View className="px-4 py-6">
          <Text className="text-3xl font-bold text-foreground">
            {t('settings', language)}
          </Text>
        </View>

        {/* قسم اللغة */}
        <View className="mt-6">
          <Text className="px-4 py-2 text-sm font-semibold text-muted uppercase">
            {t('language', language)}
          </Text>
          <View className="bg-surface rounded-lg mx-4 overflow-hidden">
            <TouchableOpacity
              onPress={() => handleLanguageChange('ar')}
              className={`flex-row justify-between items-center px-4 py-3 border-b border-border ${
                language === 'ar' ? 'bg-primary/10' : ''
              }`}
            >
              <Text className="text-foreground font-medium">العربية</Text>
              {language === 'ar' && (
                <View className="w-5 h-5 rounded-full bg-primary" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleLanguageChange('en')}
              className={`flex-row justify-between items-center px-4 py-3 ${
                language === 'en' ? 'bg-primary/10' : ''
              }`}
            >
              <Text className="text-foreground font-medium">English</Text>
              {language === 'en' && (
                <View className="w-5 h-5 rounded-full bg-primary" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* قسم المظهر */}
        <View className="mt-6">
          <Text className="px-4 py-2 text-sm font-semibold text-muted uppercase">
            {t('theme', language)}
          </Text>
          <View className="bg-surface rounded-lg mx-4 overflow-hidden">
            {(['light', 'dark', 'auto'] as const).map((themeOption, index) => (
              <TouchableOpacity
                key={themeOption}
                onPress={() => handleThemeChange(themeOption)}
                className={`flex-row justify-between items-center px-4 py-3 ${
                  index < 2 ? 'border-b border-border' : ''
                } ${theme === themeOption ? 'bg-primary/10' : ''}`}
              >
                <Text className="text-foreground font-medium">
                  {t(themeOption, language)}
                </Text>
                {theme === themeOption && (
                  <View className="w-5 h-5 rounded-full bg-primary" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* قسم الإشعارات */}
        <View className="mt-6">
          <Text className="px-4 py-2 text-sm font-semibold text-muted uppercase">
            {t('notifications', language)}
          </Text>
          <View className="bg-surface rounded-lg mx-4 overflow-hidden">
            <View className="flex-row justify-between items-center px-4 py-4">
              <Text className="text-foreground font-medium">
                {t('notifications', language)}
              </Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationsChange}
                trackColor={{ false: '#767577', true: '#81C784' }}
                thumbColor={notificationsEnabled ? '#4CAF50' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* قسم حول التطبيق */}
        <View className="mt-6 mb-8">
          <Text className="px-4 py-2 text-sm font-semibold text-muted uppercase">
            {t('about', language)}
          </Text>
          <View className="bg-surface rounded-lg mx-4 overflow-hidden">
            <View className="px-4 py-4 border-b border-border">
              <Text className="text-muted text-sm mb-1">{t('version', language)}</Text>
              <Text className="text-foreground font-semibold">1.0.0</Text>
            </View>
            <View className="px-4 py-4">
              <Text className="text-muted text-sm mb-1">{t('developer', language)}</Text>
              <Text className="text-foreground font-semibold">Manus AI</Text>
            </View>
          </View>
        </View>

        {/* وصف التطبيق */}
        <View className="px-4 py-6 items-center">
          <Text className="text-muted text-center text-sm leading-relaxed">
            {language === 'ar'
              ? 'محرك المعرفة المكاني - تطبيق جوال يحول الفضاء المعرفي إلى تجربة تفاعلية حدسية'
              : 'Spatial Knowledge Engine - A mobile app that transforms knowledge space into an intuitive interactive experience'}
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
