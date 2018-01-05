import { Vector3 } from '../Vector3';
import { SensorTarget } from './SensorTarget';

export class Star extends SensorTarget {
    constructor(id: number, position: Vector3, public color: string, public radius: number, public damageRadius?: number) {
        super(id, position);
    }

    drawTarget(ctx: CanvasRenderingContext2D) {
        // TODO: star texture
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // TODO: draw coronal texture effect

        if (this.damageRadius !== undefined) {
            // draw "min safe distance indicator"
            ctx.strokeStyle = '#a00';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.damageRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}