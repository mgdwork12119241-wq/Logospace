/**
 * SpatialEntity - Base class for all spatial objects.
 */
export class SpatialEntity {
    constructor(id, x, y, width = 200, height = 150) {
        this.id = id || Math.random().toString(36).substr(2, 9);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = 'base';
        this.selected = false;
        this.dragging = false;
        this.resizing = false;
        this.data = {};
    }

    contains(worldX, worldY) {
        return worldX >= this.x - this.width / 2 &&
               worldX <= this.x + this.width / 2 &&
               worldY >= this.y - this.height / 2 &&
               worldY <= this.y + this.height / 2;
    }

    update() {
        // Base update logic
    }

    render(ctx, camera, canvasWidth, canvasHeight) {
        const screenPos = camera.worldToScreen(this.x, this.y, canvasWidth, canvasHeight);
        const screenWidth = this.width * camera.zoom;
        const screenHeight = this.height * camera.zoom;

        // Don't render if off-screen
        if (screenPos.x + screenWidth / 2 < 0 || screenPos.x - screenWidth / 2 > canvasWidth ||
            screenPos.y + screenHeight / 2 < 0 || screenPos.y - screenHeight / 2 > canvasHeight) {
            return;
        }

        this.draw(ctx, screenPos.x, screenPos.y, screenWidth, screenHeight, camera.zoom);
    }

    draw(ctx, x, y, w, h, zoom) {
        // To be overridden by subclasses
        ctx.strokeStyle = this.selected ? '#00ffcc' : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2 * zoom;
        ctx.strokeRect(x - w / 2, y - h / 2, w, h);

        if (this.selected) {
            // Draw resize handle
            ctx.fillStyle = '#00ffcc';
            ctx.fillRect(x + w / 2 - 5 * zoom, y + h / 2 - 5 * zoom, 10 * zoom, 10 * zoom);
        }
    }

    isOverResizeHandle(worldX, worldY) {
        const handleSize = 20; // World units
        return worldX >= this.x + this.width / 2 - handleSize &&
               worldX <= this.x + this.width / 2 + handleSize &&
               worldY >= this.y + this.height / 2 - handleSize &&
               worldY <= this.y + this.height / 2 + handleSize;
    }
}
