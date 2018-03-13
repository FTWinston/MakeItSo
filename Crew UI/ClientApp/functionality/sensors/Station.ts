import { CanvasBounds3D } from '~/functionality';
import { RelatableTarget, Relationship } from './RelatableTarget';
import { SensorTarget } from './SensorTarget';
import { Vector2, Vector3 } from '~/functionality/math';

export class Station extends RelatableTarget {
    constructor(id: number, position: Vector3, relationship: Relationship) {
        super(id, position, relationship);
    }

    protected getShadowRadius(display: CanvasBounds3D) { return display.onePixel * 14; }

    protected drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds3D) {
        // TODO: better station symbol
        let halfSize = display.onePixel * 14, size = halfSize + halfSize;
        ctx.fillRect(screenPos.x - halfSize, screenPos.y - halfSize, size, size);
    }
}