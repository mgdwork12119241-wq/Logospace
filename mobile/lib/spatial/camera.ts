// نظام الكاميرا المكانية للتطبيق الجوال

export interface CameraState {
  x: number;
  y: number;
  zoom: number;
  targetX: number;
  targetY: number;
  targetZoom: number;
  rotation: number;
  targetRotation: number;
}

export class SpatialCamera {
  private state: CameraState;
  private minZoom = 0.1;
  private maxZoom = 5.0;
  private lerpFactor = 0.1;

  constructor() {
    this.state = {
      x: 0,
      y: 0,
      zoom: 1.0,
      targetX: 0,
      targetY: 0,
      targetZoom: 1.0,
      rotation: 0,
      targetRotation: 0,
    };
  }

  getState(): CameraState {
    return { ...this.state };
  }

  update() {
    this.state.x += (this.state.targetX - this.state.x) * this.lerpFactor;
    this.state.y += (this.state.targetY - this.state.y) * this.lerpFactor;
    this.state.zoom += (this.state.targetZoom - this.state.zoom) * this.lerpFactor;
    this.state.rotation += (this.state.targetRotation - this.state.rotation) * this.lerpFactor;

    // قيود الزوم
    this.state.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.state.zoom));
  }

  pan(dx: number, dy: number) {
    this.state.targetX += dx / this.state.zoom;
    this.state.targetY += dy / this.state.zoom;
  }

  zoom(factor: number, screenX: number, screenY: number, width: number, height: number) {
    const worldPos = this.screenToWorld(screenX, screenY, width, height);
    this.state.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.state.targetZoom * factor));
    this.state.targetX = worldPos.x - (screenX - width / 2) / this.state.targetZoom;
    this.state.targetY = worldPos.y - (screenY - height / 2) / this.state.targetZoom;
  }

  rotate(angle: number) {
    this.state.targetRotation += angle;
  }

  resetView() {
    this.state.targetX = 0;
    this.state.targetY = 0;
    this.state.targetZoom = 1.0;
    this.state.targetRotation = 0;
  }

  focusOn(worldX: number, worldY: number, zoomLevel: number = 1.5) {
    this.state.targetX = worldX;
    this.state.targetY = worldY;
    this.state.targetZoom = zoomLevel;
  }

  worldToScreen(worldX: number, worldY: number, width: number, height: number) {
    const dx = worldX - this.state.x;
    const dy = worldY - this.state.y;

    // تطبيق الدوران
    const cos = Math.cos(this.state.rotation);
    const sin = Math.sin(this.state.rotation);

    const rx = dx * cos - dy * sin;
    const ry = dx * sin + dy * cos;

    return {
      x: rx * this.state.zoom + width / 2,
      y: ry * this.state.zoom + height / 2,
    };
  }

  screenToWorld(screenX: number, screenY: number, width: number, height: number) {
    const cos = Math.cos(-this.state.rotation);
    const sin = Math.sin(-this.state.rotation);

    const dx = (screenX - width / 2) / this.state.zoom;
    const dy = (screenY - height / 2) / this.state.zoom;

    const rx = dx * cos - dy * sin;
    const ry = dx * sin + dy * cos;

    return {
      x: rx + this.state.x,
      y: ry + this.state.y,
    };
  }
}
