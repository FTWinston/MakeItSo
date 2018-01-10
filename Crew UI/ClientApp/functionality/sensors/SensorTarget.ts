import { Vector3 } from '../Vector3';

export abstract class SensorTarget {
    constructor(readonly id: number, public position: Vector3) {
    }

    interpolate(interval: number) {}

    isOnScreen(minX: number, minY: number, maxX: number, maxY: number) {
        return this.position.x >= minX
            && this.position.x <= maxX
            && this.position.y >= minY
            && this.position.y <= maxY;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.drawTarget(ctx);
        this.drawDepthIndicator(ctx);
    }

    protected abstract drawTarget(ctx: CanvasRenderingContext2D): void;

    protected drawDepthIndicator(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        
        const zScale = 1;
        let zY = this.position.y + this.position.z * zScale;

        ctx.lineTo(this.position.x, zY);
        ctx.lineTo(this.position.x - 5, zY);

        ctx.stroke();
    }
}