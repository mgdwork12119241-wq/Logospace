import { ScrollView, Text, View, TouchableOpacity, TextInput, I18nManager } from "react-native";
import { useEffect, useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";

export default function HomeScreen() {
  const [language, setLanguage] = useState<Language>('ar');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddContent, setShowAddContent] = useState(false);

  useEffect(() => {
    // تطبيق اتجاه RTL للعربية
    I18nManager.forceRTL(language === 'ar');
  }, [language]);

  const handleAddContent = () => {
    setShowAddContent(true);
  };

  const handleResetView = () => {
    // سيتم تطبيقه لاحقاً عند بناء Canvas
  };

  return (
    <ScreenContainer className="flex-1 bg-background">
      {/* شريط البحث العلوي */}
      <View className="px-4 py-3 border-b border-border">
        <View className="flex-row items-center gap-2">
          <TextInput
            placeholder={t('search', language)}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 bg-surface rounded-lg px-4 py-2 text-foreground"
            placeholderTextColor="#9BA1A6"
          />
          <TouchableOpacity
            onPress={handleAddContent}
            className="bg-primary rounded-lg px-4 py-2"
          >
            <Text className="text-background font-semibold">+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* منطقة الفضاء المكاني */}
      <View className="flex-1 bg-gradient-to-b from-background to-surface">
        <View className="flex-1 items-center justify-center">
          <Text className="text-2xl font-bold text-foreground mb-4">
            {t('spatialEngine', language)}
          </Text>
          <Text className="text-muted text-center px-4 mb-6">
            {t('panToMove', language)} • {t('pinchToZoom', language)}
          </Text>
          
          {/* عنصر نموذجي للفضاء */}
          <View className="w-32 h-32 bg-primary rounded-2xl items-center justify-center shadow-lg">
            <Text className="text-background font-bold text-center">
              {t('concept', language)}
            </Text>
          </View>
        </View>
      </View>

      {/* شريط الأدوات السفلي */}
      <View className="px-4 py-3 border-t border-border flex-row justify-around">
        <TouchableOpacity
          onPress={handleResetView}
          className="bg-surface rounded-lg px-4 py-2"
        >
          <Text className="text-foreground text-sm font-medium">
            {t('resetView', language)}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          className="bg-surface rounded-lg px-4 py-2"
        >
          <Text className="text-foreground text-sm font-medium">
            {t('toggleGrid', language)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* نافذة إضافة المحتوى */}
      {showAddContent && (
        <View className="absolute inset-0 bg-black/50 items-end">
          <View className="bg-background w-full rounded-t-3xl p-6 gap-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-foreground">
                {t('addContent', language)}
              </Text>
              <TouchableOpacity onPress={() => setShowAddContent(false)}>
                <Text className="text-2xl text-muted">×</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder={t('enterUrl', language)}
              className="bg-surface rounded-lg px-4 py-3 text-foreground"
              placeholderTextColor="#9BA1A6"
            />

            <TextInput
              placeholder={t('enterConcept', language)}
              className="bg-surface rounded-lg px-4 py-3 text-foreground"
              placeholderTextColor="#9BA1A6"
            />

            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => setShowAddContent(false)}
                className="flex-1 bg-surface rounded-lg py-3"
              >
                <Text className="text-foreground text-center font-semibold">
                  {t('cancel', language)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-primary rounded-lg py-3">
                <Text className="text-background text-center font-semibold">
                  {t('add', language)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScreenContainer>
  );
}
