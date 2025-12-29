import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, I18nManager } from 'react-native';
import { SpatialNode } from '@/lib/spatial/node';
import { t } from '@/lib/i18n';
import type { Language } from '@/lib/i18n';

interface NodeDetailsSheetProps {
  node: SpatialNode | null;
  language: Language;
  onClose: () => void;
  onDelete?: (nodeId: string) => void;
  onEdit?: (nodeId: string, title: string, description: string) => void;
}

export const NodeDetailsSheet: React.FC<NodeDetailsSheetProps> = ({
  node,
  language,
  onClose,
  onDelete,
  onEdit,
}) => {
  const [editMode, setEditMode] = React.useState(false);
  const [title, setTitle] = React.useState(node?.title || '');
  const [description, setDescription] = React.useState(node?.description || '');

  if (!node) return null;

  const getNodeTypeLabel = () => {
    const typeMap: Record<string, string> = {
      concept: t('concept', language),
      website: t('website', language),
      video: t('video', language),
      image: t('image', language),
    };
    return typeMap[node.type] || node.type;
  };

  const getNodeIcon = () => {
    const iconMap: Record<string, string> = {
      concept: '💡',
      website: '🌐',
      video: '▶️',
      image: '🖼️',
    };
    return iconMap[node.type] || '●';
  };

  const handleSave = () => {
    onEdit?.(node.id, title, description);
    setEditMode(false);
  };

  const handleDelete = () => {
    onDelete?.(node.id);
    onClose();
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1e2022',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
      }}
    >
      <ScrollView style={{ padding: 24 }}>
        {/* رأس الورقة */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text style={{ fontSize: 28 }}>{getNodeIcon()}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ECEDEE' }}>
              {t('details', language)}
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 28, color: '#9BA1A6' }}>×</Text>
          </TouchableOpacity>
        </View>

        {/* نوع العقدة */}
        <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#334155' }}>
          <Text style={{ fontSize: 12, color: '#9BA1A6', marginBottom: 4, textTransform: 'uppercase' }}>
            {t('contentType', language)}
          </Text>
          <Text style={{ fontSize: 16, color: '#ECEDEE', fontWeight: '600' }}>
            {getNodeTypeLabel()}
          </Text>
        </View>

        {/* العنوان */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 12, color: '#9BA1A6', marginBottom: 4, textTransform: 'uppercase' }}>
            {language === 'ar' ? 'العنوان' : 'Title'}
          </Text>
          {editMode ? (
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={{
                backgroundColor: '#0a0a0a',
                color: '#ECEDEE',
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#334155',
              }}
              placeholderTextColor="#9BA1A6"
            />
          ) : (
            <Text style={{ fontSize: 16, color: '#ECEDEE', fontWeight: '600' }}>
              {node.title}
            </Text>
          )}
        </View>

        {/* الوصف */}
        <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#334155' }}>
          <Text style={{ fontSize: 12, color: '#9BA1A6', marginBottom: 4, textTransform: 'uppercase' }}>
            {language === 'ar' ? 'الوصف' : 'Description'}
          </Text>
          {editMode ? (
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={{
                backgroundColor: '#0a0a0a',
                color: '#ECEDEE',
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#334155',
                minHeight: 80,
                textAlignVertical: 'top',
              }}
              multiline
              placeholderTextColor="#9BA1A6"
            />
          ) : (
            <Text style={{ fontSize: 14, color: '#9BA1A6', lineHeight: 20 }}>
              {node.description || (language === 'ar' ? 'لا يوجد وصف' : 'No description')}
            </Text>
          )}
        </View>

        {/* المحتوى */}
        {node.content && (
          <View style={{ marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#334155' }}>
            <Text style={{ fontSize: 12, color: '#9BA1A6', marginBottom: 4, textTransform: 'uppercase' }}>
              {language === 'ar' ? 'المحتوى' : 'Content'}
            </Text>
            <Text style={{ fontSize: 12, color: '#0a7ea4', fontFamily: 'monospace' }} numberOfLines={3}>
              {node.content}
            </Text>
          </View>
        )}

        {/* أزرار الإجراء */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
          {editMode ? (
            <>
              <TouchableOpacity
                onPress={() => setEditMode(false)}
                style={{
                  flex: 1,
                  backgroundColor: '#334155',
                  padding: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#ECEDEE', fontWeight: '600' }}>
                  {t('cancel', language)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  flex: 1,
                  backgroundColor: '#0a7ea4',
                  padding: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>
                  {language === 'ar' ? 'حفظ' : 'Save'}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => setEditMode(true)}
                style={{
                  flex: 1,
                  backgroundColor: '#334155',
                  padding: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#ECEDEE', fontWeight: '600' }}>
                  {t('edit', language)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={{
                  flex: 1,
                  backgroundColor: '#EF4444',
                  padding: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>
                  {t('delete', language)}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
