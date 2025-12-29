// معالج الإيماءات المتقدمة للفضاء المكاني

export interface GestureState {
  initialDistance: number;
  initialScale: number;
  currentScale: number;
  isPinching: boolean;
  isRotating: boolean;
  rotationAngle: number;
}

export class GestureHandler {
  private state: GestureState;

  constructor() {
    this.state = {
      initialDistance: 0,
      initialScale: 1,
      currentScale: 1,
      isPinching: false,
      isRotating: false,
      rotationAngle: 0,
    };
  }

  getState(): GestureState {
    return { ...this.state };
  }

  // حساب المسافة بين نقطتين
  private distance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // حساب الزاوية بين نقطتين
  private angle(x1: number, y1: number, x2: number, y2: number): number {
    return Math.atan2(y2 - y1, x2 - x1);
  }

  // معالجة بداية القرص (Pinch)
  handlePinchStart(x1: number, y1: number, x2: number, y2: number) {
    this.state.initialDistance = this.distance(x1, y1, x2, y2);
    this.state.initialScale = this.state.currentScale;
    this.state.isPinching = true;
  }

  // معالجة حركة القرص
  handlePinchMove(x1: number, y1: number, x2: number, y2: number): number {
    if (!this.state.isPinching) return 1;

    const currentDistance = this.distance(x1, y1, x2, y2);
    const scale = currentDistance / this.state.initialDistance;
    this.state.currentScale = this.state.initialScale * scale;

    return scale;
  }

  // معالجة نهاية القرص
  handlePinchEnd() {
    this.state.isPinching = false;
  }

  // معالجة بداية الدوران
  handleRotateStart(x1: number, y1: number, x2: number, y2: number) {
    this.state.rotationAngle = this.angle(x1, y1, x2, y2);
    this.state.isRotating = true;
  }

  // معالجة حركة الدوران
  handleRotateMove(x1: number, y1: number, x2: number, y2: number): number {
    if (!this.state.isRotating) return 0;

    const currentAngle = this.angle(x1, y1, x2, y2);
    const angleDelta = currentAngle - this.state.rotationAngle;

    return angleDelta;
  }

  // معالجة نهاية الدوران
  handleRotateEnd() {
    this.state.isRotating = false;
  }

  // إعادة تعيين الحالة
  reset() {
    this.state = {
      initialDistance: 0,
      initialScale: 1,
      currentScale: 1,
      isPinching: false,
      isRotating: false,
      rotationAngle: 0,
    };
  }
}
