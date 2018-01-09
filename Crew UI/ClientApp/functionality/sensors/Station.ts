import { Vector3 } from '../Vector3';
import { RelatableTarget, Relationship } from './RelatableTarget';

export class Station extends RelatableTarget {
    constructor(id: number, position: Vector3, relationship: Relationship) {
        super(id, position, relationship);
    }

    protected drawTarget(ctx: CanvasRenderingContext2D) {
        // TODO: better station symbol
        ctx.fillRect(this.position.x - 10, this.position.y - 10, 10, 10);
    }
}