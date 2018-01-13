import { Vector3 } from '../Vector3';
import { RelatableTarget, Relationship } from './RelatableTarget';

export abstract class MoveableTarget extends RelatableTarget {
    constructor(id: number, position: Vector3, public velocity: Vector3, relationship: Relationship) {
        super(id, position, relationship);
    }

    interpolate(interval: number) {
        this.position.x += this.velocity.x * interval;
        this.position.y += this.velocity.y * interval;
        this.position.z += this.velocity.z * interval;
    }

    draw(ctx: CanvasRenderingContext2D, onePixel: number) {
        this.drawVelocity(ctx, onePixel);
        super.draw(ctx, onePixel);
    }

    private drawVelocity(ctx: CanvasRenderingContext2D, onePixel: number) {
        // TODO: draw velocity indicator
    }
}