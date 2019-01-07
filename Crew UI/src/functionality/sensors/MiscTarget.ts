import { CanvasBounds } from '~/functionality';
import { SensorTarget, SensorTargetType } from './SensorTarget';
import { Vector2, Vector3 } from '~/functionality/math';

export class MiscTarget extends SensorTarget {
    constructor(id: number, position: Vector3) {
        super(id, SensorTargetType.Misc, position);
    }
    
    protected getShadowRadius(display: CanvasBounds) { return display.onePixel * 10; }

    drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds) {
        // TODO: better misc symbol
        ctx.fillStyle = '#999999';
        let halfSize = display.onePixel * 14, size = halfSize + halfSize;
        ctx.fillRect(screenPos.x - halfSize, screenPos.y - halfSize, size, size);
    }
}