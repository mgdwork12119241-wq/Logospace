import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

interface EmbeddedVideoProps {
  videoId: string;
  provider: 'youtube' | 'vimeo' | 'other';
  title?: string;
  width?: number;
  height?: number;
  onError?: (error: Error) => void;
}

export const EmbeddedVideo: React.FC<EmbeddedVideoProps> = ({
  videoId,
  provider,
  title,
  width = 300,
  height = 200,
  onError,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const getEmbedUrl = (): string => {
    switch (provider) {
      case 'youtube':
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
      case 'vimeo':
        return `https://player.vimeo.com/video/${videoId}`;
      default:
        return videoId;
    }
  };

  const getHtmlContent = (url: string): string => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { background: #000; }
            .container {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            iframe {
              width: 100%;
              height: 100%;
              border: none;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <iframe
              src="${url}"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </body>
      </html>
    `;
  };

  const handleError = (error: any) => {
    const errorMessage = error?.message || 'Failed to load video';
    setError(errorMessage);
    onError?.(new Error(errorMessage));
  };

  if (error) {
    return (
      <View
        style={{
          width,
          height,
          backgroundColor: '#1e2022',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 12,
        }}
      >
        <Text style={{ color: '#EF4444', textAlign: 'center', fontSize: 12 }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        width,
        height,
        backgroundColor: '#000',
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <WebView
        source={{ html: getHtmlContent(getEmbedUrl()) }}
        style={{ flex: 1 }}
        onLoadEnd={() => setLoading(false)}
        onError={handleError}
        scrollEnabled={false}
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false}
      />
      {loading && (
        <View
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#0a7ea4" />
        </View>
      )}
    </View>
  );
};
