import { Vector3 } from '../Vector3';
import { MoveableTarget } from './MoveableTarget';
import { Relationship } from './RelatableTarget';

export class Ship extends MoveableTarget {
    constructor(id: number, position: Vector3, velocity: Vector3, relationship: Relationship) {
        super(id, position, velocity, relationship);
    }
    
    protected drawTarget(ctx: CanvasRenderingContext2D, onePixel: number) {
        // TODO: better ship symbol, indicating direction of velocity
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y - 15 * onePixel);
        ctx.lineTo(this.position.x + 9 * onePixel, this.position.y + 15 * onePixel);
        ctx.lineTo(this.position.x - 9 * onePixel, this.position.y + 15 * onePixel);
        ctx.fill();
    }
}