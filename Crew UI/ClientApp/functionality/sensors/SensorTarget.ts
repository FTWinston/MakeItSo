import { Vector3 } from '../Vector3';

export abstract class SensorTarget {
    constructor(readonly id: number, public position: Vector3) {
    }

    isOnScreen(x: number, y: number, width: number, height: number) {
        return this.position.x >= x
            && this.position.x <= x + width
            && this.position.y >= y
            && this.position.y <= y + height;
    }

    interpolate(interval: number) {}

    draw(ctx: CanvasRenderingContext2D) {
        this.drawTarget(ctx);
        this.drawDepthIndicator(ctx);
    }

    abstract drawTarget(ctx: CanvasRenderingContext2D): void;

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