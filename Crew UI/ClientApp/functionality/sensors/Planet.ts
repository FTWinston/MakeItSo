import { Vector3 } from '../Vector3';
import { SensorTarget } from './SensorTarget';

export class Planet extends SensorTarget {
    constructor(id: number, position: Vector3, public color: string, public radius: number) {
        super(id, position);
    }

    isOnScreen(minX: number, minY: number, maxX: number, maxY: number) {
        let radius = this.radius;

        return super.isOnScreen(minX - radius, minY - radius, maxX + radius, maxY + radius);
    }

    protected drawTarget(ctx: CanvasRenderingContext2D, onePixel: number) {
        // TODO: draw orbit

        // TODO: planet texture
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}