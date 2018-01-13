import { Vector3 } from '../Vector3';
import { SensorTarget } from './SensorTarget';

export class Star extends SensorTarget {
    constructor(id: number, position: Vector3, public color: string, public radius: number, public damageRadius?: number) {
        super(id, position);
    }

    isOnScreen(minX: number, minY: number, maxX: number, maxY: number) {
        let radius = this.radius;
        if (this.damageRadius !== undefined && this.damageRadius > radius) {
            radius = this.damageRadius;
        }

        return super.isOnScreen(minX - radius, minY - radius, maxX + radius, maxY + radius);
    }

    protected drawTarget(ctx: CanvasRenderingContext2D, onePixel: number) {
        // TODO: star texture
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // TODO: draw coronal texture effect

        if (this.damageRadius !== undefined) {
            // draw "min safe distance indicator"
            ctx.strokeStyle = '#a00';
            ctx.lineWidth = onePixel * 2;
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.damageRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}