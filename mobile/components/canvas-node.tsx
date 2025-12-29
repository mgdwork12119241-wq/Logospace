import React from 'react';
import { View, Text } from 'react-native';
import { SpatialNode } from '@/lib/spatial/node';
import { SpatialCamera } from '@/lib/spatial/camera';

interface CanvasNodeProps {
  node: SpatialNode;
  camera: SpatialCamera;
  canvasWidth: number;
  canvasHeight: number;
  isSelected?: boolean;
}

export const CanvasNode: React.FC<CanvasNodeProps> = ({
  node,
  camera,
  canvasWidth,
  canvasHeight,
  isSelected = false,
}) => {
  const screenPos = camera.worldToScreen(node.x, node.y, canvasWidth, canvasHeight);
  const screenWidth = node.width * camera.getState().zoom;
  const screenHeight = node.height * camera.getState().zoom;

  const getNodeColor = () => {
    switch (node.type) {
      case 'concept':
        return '#0a7ea4';
      case 'website':
        return '#22C55E';
      case 'video':
        return '#F59E0B';
      case 'image':
        return '#8B5CF6';
      default:
        return node.color || '#0a7ea4';
    }
  };

  const getNodeIcon = () => {
    switch (node.type) {
      case 'concept':
        return '💡';
      case 'website':
        return '🌐';
      case 'video':
        return '▶️';
      case 'image':
        return '🖼️';
      default:
        return '●';
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: screenPos.x - screenWidth / 2,
        top: screenPos.y - screenHeight / 2,
        width: screenWidth,
        height: screenHeight,
        backgroundColor: getNodeColor(),
        borderRadius: 12,
        borderWidth: isSelected ? 3 : 1,
        borderColor: isSelected ? '#00ffcc' : 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      {/* محتوى العقدة */}
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: Math.max(16, screenHeight / 4), color: 'white' }}>
          {getNodeIcon()}
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: Math.max(10, screenHeight / 8),
            fontWeight: 'bold',
            textAlign: 'center',
            paddingHorizontal: 8,
          }}
          numberOfLines={2}
        >
          {node.title}
        </Text>
      </View>

      {/* مقبض تغيير الحجم */}
      {isSelected && (
        <View
          style={{
            position: 'absolute',
            bottom: -8,
            right: -8,
            width: 16,
            height: 16,
            backgroundColor: '#00ffcc',
            borderRadius: 8,
            borderWidth: 2,
            borderColor: 'white',
          }}
        />
      )}
    </View>
  );
};
