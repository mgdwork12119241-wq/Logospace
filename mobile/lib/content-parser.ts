// نظام تحليل وتضمين المحتوى

export interface ParsedContent {
  type: 'concept' | 'website' | 'video' | 'image';
  title: string;
  description?: string;
  url?: string;
  videoId?: string;
  provider?: 'youtube' | 'vimeo' | 'other';
  thumbnail?: string;
}

export class ContentParser {
  // تحليل URL والتعرف على نوع المحتوى
  static parseUrl(input: string): ParsedContent {
    // إزالة المسافات الزائدة
    const trimmed = input.trim();

    // التحقق من أنه URL
    if (!this.isValidUrl(trimmed)) {
      // إذا لم يكن URL، اعتبره مفهوماً
      return {
        type: 'concept',
        title: trimmed,
        description: '',
      };
    }

    // التحقق من YouTube
    const youtubeMatch = this.extractYoutubeId(trimmed);
    if (youtubeMatch) {
      return {
        type: 'video',
        title: 'YouTube Video',
        provider: 'youtube',
        videoId: youtubeMatch,
        url: trimmed,
        thumbnail: `https://img.youtube.com/vi/${youtubeMatch}/maxresdefault.jpg`,
      };
    }

    // التحقق من Vimeo
    const vimeoMatch = this.extractVimeoId(trimmed);
    if (vimeoMatch) {
      return {
        type: 'video',
        title: 'Vimeo Video',
        provider: 'vimeo',
        videoId: vimeoMatch,
        url: trimmed,
      };
    }

    // التحقق من الصور
    if (this.isImageUrl(trimmed)) {
      return {
        type: 'image',
        title: 'Image',
        url: trimmed,
      };
    }

    // بقية الروابط تعتبر مواقع ويب
    return {
      type: 'website',
      title: this.extractDomain(trimmed),
      url: trimmed,
      description: trimmed,
    };
  }

  // التحقق من صحة URL
  private static isValidUrl(str: string): boolean {
    try {
      new URL(str);
      return true;
    } catch {
      // محاولة إضافة https:// إذا لم تكن موجودة
      if (!str.startsWith('http')) {
        try {
          new URL('https://' + str);
          return true;
        } catch {
          return false;
        }
      }
      return false;
    }
  }

  // استخراج معرّف YouTube
  private static extractYoutubeId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  }

  // استخراج معرّف Vimeo
  private static extractVimeoId(url: string): string | null {
    const patterns = [
      /vimeo\.com\/(\d+)/,
      /vimeo\.com\/video\/(\d+)/,
      /player\.vimeo\.com\/video\/(\d+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  }

  // التحقق من أن الرابط يشير لصورة
  private static isImageUrl(url: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerUrl.includes(ext));
  }

  // استخراج اسم النطاق من الرابط
  private static extractDomain(url: string): string {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : 'https://' + url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  }

  // الحصول على رابط الفيديو المضمّن
  static getEmbedUrl(content: ParsedContent): string | null {
    if (content.type === 'video') {
      if (content.provider === 'youtube' && content.videoId) {
        return `https://www.youtube.com/embed/${content.videoId}`;
      }
      if (content.provider === 'vimeo' && content.videoId) {
        return `https://player.vimeo.com/video/${content.videoId}`;
      }
    }
    return content.url || null;
  }

  // توليد معرّف فريد للعقدة
  static generateNodeId(): string {
    return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
