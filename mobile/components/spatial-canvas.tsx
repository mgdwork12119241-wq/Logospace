import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, PanResponder, Animated, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { SpatialCamera } from '@/lib/spatial/camera';
import { NodeManager, SpatialNode } from '@/lib/spatial/node';
import { CanvasNode } from './canvas-node';

interface SpatialCanvasProps {
  width: number;
  height: number;
  onNodeSelect?: (node: SpatialNode | null) => void;
  onNodeMove?: (nodeId: string, x: number, y: number) => void;
  onNodeResize?: (nodeId: string, width: number, height: number) => void;
  showGrid?: boolean;
}

export const SpatialCanvas = React.forwardRef<any, SpatialCanvasProps>(
  (
    {
      width,
      height,
      onNodeSelect,
      onNodeMove,
      onNodeResize,
      showGrid = true,
    },
    ref
  ) => {
    const cameraRef = useRef(new SpatialCamera());
    const nodeManagerRef = useRef(new NodeManager());
    const [nodes, setNodes] = useState<SpatialNode[]>([]);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
    const [resizingNodeId, setResizingNodeId] = useState<string | null>(null);
    const panResponderRef = useRef<any>(null);
    const lastTouchRef = useRef({ x: 0, y: 0, timestamp: 0 });
    const lastDistanceRef = useRef(0);

    const camera = cameraRef.current;
    const nodeManager = nodeManagerRef.current;

    // تهيئة PanResponder للتعامل مع الإيماءات
    useEffect(() => {
      panResponderRef.current = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt: GestureResponderEvent) => {
          const { x, y } = evt.nativeEvent as any;
          const worldPos = camera.worldToScreen(
            camera.getState().x,
            camera.getState().y,
            width,
            height
          );

          const touchedNode = nodeManager.findNodeAt(
            camera.getState().x + (x - width / 2) / camera.getState().zoom,
            camera.getState().y + (y - height / 2) / camera.getState().zoom
          );

          if (touchedNode) {
            const worldX = camera.getState().x + (x - width / 2) / camera.getState().zoom;
            const worldY = camera.getState().y + (y - height / 2) / camera.getState().zoom;
            if (touchedNode.isOverResizeHandle(worldX, worldY)) {
              setResizingNodeId(touchedNode.id);
            } else {
              setDraggedNodeId(touchedNode.id);
              nodeManager.selectNode(touchedNode.id);
              setSelectedNodeId(touchedNode.id);
              onNodeSelect?.(touchedNode);
            }
          } else {
            nodeManager.selectNode(null);
            setSelectedNodeId(null);
            onNodeSelect?.(null);
          }

          lastTouchRef.current = { x, y, timestamp: Date.now() };
        },
        onPanResponderMove: (evt: GestureResponderEvent, state: PanResponderGestureState) => {
          const { dx, dy } = state;

          if (resizingNodeId) {
            const node = nodeManager.getNode(resizingNodeId);
            if (node) {
              node.resize(dx / camera.getState().zoom, dy / camera.getState().zoom);
              onNodeResize?.(resizingNodeId, node.width, node.height);
              setNodes([...nodeManager.getAllNodes()]);
            }
          } else if (draggedNodeId) {
            const node = nodeManager.getNode(draggedNodeId);
            if (node) {
              node.move(dx / camera.getState().zoom, dy / camera.getState().zoom);
              onNodeMove?.(draggedNodeId, node.x, node.y);
              setNodes([...nodeManager.getAllNodes()]);
            }
          } else {
            camera.pan(dx, dy);
          }
        },
        onPanResponderRelease: () => {
          setDraggedNodeId(null);
          setResizingNodeId(null);
        },
      });
    }, [width, height, draggedNodeId, resizingNodeId]);

    // معالج الزوم بالقرص
    const handlePinch = useCallback((scale: number) => {
      if (scale > 1) {
        camera.zoom(1.1, width / 2, height / 2, width, height);
      } else {
        camera.zoom(0.9, width / 2, height / 2, width, height);
      }
    }, [width, height]);

    // إضافة عقدة جديدة
    const addNode = useCallback((node: SpatialNode) => {
      nodeManager.addNode(node);
      setNodes([...nodeManager.getAllNodes()]);
    }, []);

    // إزالة عقدة
    const removeNode = useCallback((id: string) => {
      nodeManager.removeNode(id);
      setNodes([...nodeManager.getAllNodes()]);
    }, []);

    // إعادة تعيين الرؤية
    const resetView = useCallback(() => {
      camera.resetView();
    }, []);

    // تركيز على عقدة
    const focusOnNode = useCallback((nodeId: string) => {
      const node = nodeManager.getNode(nodeId);
      if (node) {
        camera.focusOn(node.x, node.y, 1.5);
      }
    }, []);

    // تحديث الكاميرا والعرض
    useEffect(() => {
      const interval = setInterval(() => {
        camera.update();
        setNodes([...nodeManager.getAllNodes()]);
      }, 1000 / 60); // 60 FPS

      return () => clearInterval(interval);
    }, []);

    // تعريض الواجهة العامة
    React.useImperativeHandle(ref, () => ({
      addNode,
      removeNode,
      resetView,
      focusOnNode,
      getCamera: () => camera,
      getNodeManager: () => nodeManager,
    }), [addNode, removeNode, resetView, focusOnNode]);

    return (
      <View
        {...panResponderRef.current?.panHandlers}
        style={{
          width,
          height,
          backgroundColor: '#0a0a0a',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* شبكة الخلفية */}
        {showGrid && (
          <View
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)
              `,
              backgroundSize: `${100 * camera.getState().zoom}px ${100 * camera.getState().zoom}px`,
            }}
          />
        )}

        {/* العقد */}
        {nodes.map((node) => (
          <CanvasNode
            key={node.id}
            node={node}
            camera={camera}
            canvasWidth={width}
            canvasHeight={height}
            isSelected={selectedNodeId === node.id}
          />
        ))}
      </View>
    );
  }
);

SpatialCanvas.displayName = 'SpatialCanvas';
