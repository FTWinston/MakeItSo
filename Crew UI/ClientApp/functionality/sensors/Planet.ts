import { Vector3 } from '../Vector3';
import { SensorTarget } from './SensorTarget';

export class Planet extends SensorTarget {
    constructor(id: number, position: Vector3, public color: string, public radius: number) {
        super(id, position);
    }

    drawTarget(ctx: CanvasRenderingContext2D) {
        // TODO: draw orbit

        // TODO: planet texture
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}