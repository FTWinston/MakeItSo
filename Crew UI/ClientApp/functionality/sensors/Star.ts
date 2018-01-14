import { CanvasBounds } from '../CanvasBounds';
import { SensorTarget } from './SensorTarget';
import { Vector2, Vector3 } from '../math';

export class Star extends SensorTarget {
    constructor(id: number, position: Vector3, public color: string, public radius: number, public damageRadius?: number) {
        super(id, position);
    }

    isOnScreen(screenPos: Vector2, display: CanvasBounds) {
        let radius = this.damageRadius !== undefined && this.damageRadius > this.radius
            ? this.damageRadius : this.radius;

        return screenPos.x >= display.minX - radius
            && screenPos.x <= display.maxX + radius
            && screenPos.y >= display.minY - radius
            && screenPos.y <= display.maxY + radius;
    }

    protected getShadowRadius(display: CanvasBounds) { return this.radius * 0.85; }

    protected drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds) {
        // TODO: star texture
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(screenPos.x, screenPos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // TODO: draw coronal texture effect

        /*
        if (this.damageRadius !== undefined) {
            // draw "min safe distance indicator"
            ctx.strokeStyle = '#a00';
            ctx.lineWidth = display.onePixel * 2;
            ctx.beginPath();
            ctx.arc(screenPos.x, screenPos.y, this.damageRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
        */
    }
}