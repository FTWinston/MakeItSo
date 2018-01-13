import { Vector3 } from '../Vector3';
import { RelatableTarget, Relationship } from './RelatableTarget';

export class Station extends RelatableTarget {
    constructor(id: number, position: Vector3, relationship: Relationship) {
        super(id, position, relationship);
    }

    protected drawTarget(ctx: CanvasRenderingContext2D, onePixel: number) {
        // TODO: better station symbol
        let halfSize = onePixel * 14, size = halfSize + halfSize;
        ctx.fillRect(this.position.x - halfSize, this.position.y - halfSize, size, size);
    }
}