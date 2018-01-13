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

    draw(ctx: CanvasRenderingContext2D, onePixel: number) {
        this.drawTarget(ctx, onePixel);
        this.drawDepthIndicator(ctx, onePixel);
    }

    protected abstract drawTarget(ctx: CanvasRenderingContext2D, onePixel: number): void;

    protected drawDepthIndicator(ctx: CanvasRenderingContext2D, onePixel: number) {
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = onePixel;
        const zScale = 1;
        let zY = this.position.y + this.position.z * zScale;
        ctx.setLineDash([onePixel * 5, onePixel * 5]);

        ctx.beginPath();
        ctx.moveTo(this.position.x - onePixel * 5, zY);
        ctx.lineTo(this.position.x, zY);
        ctx.lineTo(this.position.x, this.position.y);

        ctx.stroke();
        ctx.setLineDash([]);
    }
}