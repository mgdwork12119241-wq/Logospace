// نظام الترجمة والدعم متعدد اللغات
export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    // الملاحة
    home: 'الاستكشاف',
    settings: 'الإعدادات',
    
    // الشاشة الرئيسية
    addContent: 'إضافة محتوى',
    search: 'بحث...',
    resetView: 'إعادة تعيين الرؤية',
    toggleGrid: 'إظهار/إخفاء الشبكة',
    
    // إضافة المحتوى
    enterUrl: 'أدخل رابط ويب أو فيديو...',
    enterConcept: 'أدخل مفهوماً جديداً...',
    contentType: 'نوع المحتوى',
    concept: 'مفهوم',
    website: 'موقع ويب',
    video: 'فيديو',
    image: 'صورة',
    add: 'إضافة',
    cancel: 'إلغاء',
    
    // تفاصيل العقدة
    details: 'التفاصيل',
    edit: 'تعديل',
    delete: 'حذف',
    share: 'مشاركة',
    close: 'إغلاق',
    
    // الإعدادات
    language: 'اللغة',
    theme: 'المظهر',
    light: 'فاتح',
    dark: 'مظلم',
    auto: 'تلقائي',
    notifications: 'الإشعارات',
    about: 'حول التطبيق',
    version: 'الإصدار',
    developer: 'المطور',
    
    // الرسائل
    success: 'تم بنجاح',
    error: 'حدث خطأ',
    loading: 'جاري التحميل...',
    noContent: 'لا يوجد محتوى',
    invalidUrl: 'الرابط غير صحيح',
    
    // الفضاء المكاني
    spatialEngine: 'محرك المعرفة المكاني',
    panToMove: 'اسحب للتحرك',
    pinchToZoom: 'اقرص بإصبعين للتكبير/التصغير',
    tapToSelect: 'اضغط لتحديد',
    dragCornerToResize: 'اسحب من الزاوية لتغيير الحجم',
  },
  en: {
    // Navigation
    home: 'Explore',
    settings: 'Settings',
    
    // Home Screen
    addContent: 'Add Content',
    search: 'Search...',
    resetView: 'Reset View',
    toggleGrid: 'Toggle Grid',
    
    // Add Content
    enterUrl: 'Enter a web or video URL...',
    enterConcept: 'Enter a new concept...',
    contentType: 'Content Type',
    concept: 'Concept',
    website: 'Website',
    video: 'Video',
    image: 'Image',
    add: 'Add',
    cancel: 'Cancel',
    
    // Node Details
    details: 'Details',
    edit: 'Edit',
    delete: 'Delete',
    share: 'Share',
    close: 'Close',
    
    // Settings
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    auto: 'Auto',
    notifications: 'Notifications',
    about: 'About',
    version: 'Version',
    developer: 'Developer',
    
    // Messages
    success: 'Success',
    error: 'Error',
    loading: 'Loading...',
    noContent: 'No content',
    invalidUrl: 'Invalid URL',
    
    // Spatial Engine
    spatialEngine: 'Spatial Knowledge Engine',
    panToMove: 'Drag to move',
    pinchToZoom: 'Pinch to zoom',
    tapToSelect: 'Tap to select',
    dragCornerToResize: 'Drag corner to resize',
  },
};

export function t(key: keyof typeof translations.ar, language: Language = 'ar'): string {
  return translations[language][key] || key;
}
