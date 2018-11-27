import { CanvasBounds3D } from '~/functionality';
import { SensorTarget } from './SensorTarget';
import { Vector2, Vector3 } from '~/functionality/math';

export class MiscTarget extends SensorTarget {
    constructor(id: number, position: Vector3) {
        super(id, position);
    }
    
    protected getShadowRadius(display: CanvasBounds3D) { return display.onePixel * 10; }

    protected drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds3D) {
        // TODO: better misc symbol
        ctx.fillStyle = '#999999';
        let halfSize = display.onePixel * 14, size = halfSize + halfSize;
        ctx.fillRect(screenPos.x - halfSize, screenPos.y - halfSize, size, size);
    }
}