/**
 * SpatialCamera - Handles the viewport, zoom, and coordinate transformations.
 */
export class SpatialCamera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.zoom = 1.0;
        this.minZoom = 0.01;
        this.maxZoom = 10.0;
        this.targetX = 0;
        this.targetY = 0;
        this.targetZoom = 1.0;
        this.rotation = 0;
        this.targetRotation = 0;
        this.lerpFactor = 0.1;
    }

    update() {
        this.x += (this.targetX - this.x) * this.lerpFactor;
        this.y += (this.targetY - this.y) * this.lerpFactor;
        this.zoom += (this.targetZoom - this.zoom) * this.lerpFactor;
        this.rotation += (this.targetRotation - this.rotation) * this.lerpFactor;
    }

    pan(dx, dy) {
        this.targetX += dx / this.zoom;
        this.targetY += dy / this.zoom;
    }

    zoomAt(delta, screenX, screenY, width, height) {
        const oldZoom = this.targetZoom;
        const zoomSpeed = 0.001;
        this.targetZoom *= Math.pow(1.1, -delta * zoomSpeed);
        this.targetZoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.targetZoom));

        // Adjust position to zoom towards the mouse cursor
        const worldX = (screenX - width / 2) / oldZoom + this.x;
        const worldY = (screenY - height / 2) / oldZoom + this.y;

        this.targetX = worldX - (screenX - width / 2) / this.targetZoom;
        this.targetY = worldY - (screenY - height / 2) / this.targetZoom;
    }

    worldToScreen(worldX, worldY, width, height) {
        // Apply rotation
        const dx = worldX - this.x;
        const dy = worldY - this.y;
        const cos = Math.cos(this.rotation);
        const sin = Math.sin(this.rotation);
        
        const rx = dx * cos - dy * sin;
        const ry = dx * sin + dy * cos;

        return {
            x: rx * this.zoom + width / 2,
            y: ry * this.zoom + height / 2
        };
    }

    screenToWorld(screenX, screenY, width, height) {
        return {
            x: (screenX - width / 2) / this.zoom + this.x,
            y: (screenY - height / 2) / this.zoom + this.y
        };
    }
}
