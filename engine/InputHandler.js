/**
 * InputHandler - Manages mouse, touch, and keyboard events.
 */
export class InputHandler {
    constructor(canvas, camera, entities) {
        this.canvas = canvas;
        this.camera = camera;
        this.entities = entities;
        this.isPanning = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.draggedEntity = null;
        this.resizingEntity = null;

        this.init();
    }

    init() {
        this.canvas.addEventListener('mousedown', e => this.handleMouseDown(e));
        window.addEventListener('mousemove', e => this.handleMouseMove(e));
        window.addEventListener('mouseup', e => this.handleMouseUp(e));
        this.canvas.addEventListener('wheel', e => this.handleWheel(e), { passive: false });
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        const worldPos = this.camera.screenToWorld(screenX, screenY, this.canvas.width, this.canvas.height);

        // Check for entity selection/drag/resize
        this.draggedEntity = null;
        this.resizingEntity = null;
        
        for (let i = this.entities.length - 1; i >= 0; i--) {
            const entity = this.entities[i];
            
            if (entity.selected && entity.isOverResizeHandle(worldPos.x, worldPos.y)) {
                this.resizingEntity = entity;
                break;
            }
            
            if (entity.contains(worldPos.x, worldPos.y)) {
                this.draggedEntity = entity;
                this.entities.forEach(ent => ent.selected = false);
                entity.selected = true;
                // Bring to front
                this.entities.splice(i, 1);
                this.entities.push(entity);
                break;
            }
        }

        if (!this.draggedEntity) {
            this.isPanning = true;
            this.entities.forEach(ent => ent.selected = false);
        }

        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
    }

    handleMouseMove(e) {
        const dx = e.clientX - this.lastMouseX;
        const dy = e.clientY - this.lastMouseY;

        if (this.isPanning) {
            this.camera.pan(-dx, -dy);
        } else if (this.resizingEntity) {
            this.resizingEntity.width += dx / this.camera.zoom;
            this.resizingEntity.height += dy / this.camera.zoom;
            this.resizingEntity.width = Math.max(50, this.resizingEntity.width);
            this.resizingEntity.height = Math.max(50, this.resizingEntity.height);
        } else if (this.draggedEntity) {
            this.draggedEntity.x += dx / this.camera.zoom;
            this.draggedEntity.y += dy / this.camera.zoom;
        }

        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
    }

    handleMouseUp() {
        this.isPanning = false;
        this.draggedEntity = null;
        this.resizingEntity = null;
    }

    handleWheel(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;
        this.camera.zoomAt(e.deltaY, screenX, screenY, this.canvas.width, this.canvas.height);
    }
}
