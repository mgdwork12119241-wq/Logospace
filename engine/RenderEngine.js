/**
 * RenderEngine - Handles the drawing loop and canvas management.
 */
export class RenderEngine {
    constructor(canvas, camera) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.camera = camera;
        this.entities = [];
        this.showGrid = true;
    }

    setEntities(entities) {
        this.entities = entities;
    }

    start() {
        const loop = () => {
            this.update();
            this.render();
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    update() {
        this.camera.update();
        this.entities.forEach(entity => entity.update());
    }

    render() {
        const { ctx, canvas, camera, entities } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        // We don't rotate the whole context here because entities handle their own screen projection
        // but we could apply global effects if needed.

        if (this.showGrid) {
            this.drawGrid();
        }

        // Draw entities
        entities.forEach(entity => {
            entity.render(ctx, camera, canvas.width, canvas.height);
        });
        
        ctx.restore();
    }

    drawGrid() {
        const { ctx, canvas, camera } = this;
        const gridSize = 100 * camera.zoom;
        if (gridSize < 5) return; // Don't draw if too small

        const offsetX = ((-camera.x * camera.zoom) + canvas.width / 2) % gridSize;
        const offsetY = ((-camera.y * camera.zoom) + canvas.height / 2) % gridSize;

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;

        for (let x = offsetX; x < canvas.width; x += gridSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
        }
        for (let y = offsetY; y < canvas.height; y += gridSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
        }
        ctx.stroke();
    }
}
