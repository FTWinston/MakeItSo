import { CanvasBounds3D } from '~/functionality';
import { MoveableTarget } from './MoveableTarget';
import { Relationship } from './RelatableTarget';
import { Vector2, Vector3 } from '~/functionality/math';

export class Ship extends MoveableTarget {
    constructor(id: number, position: Vector3, velocity: Vector3, relationship: Relationship) {
        super(id, position, velocity, relationship);
    }
    
    protected getShadowRadius(display: CanvasBounds3D) { return display.onePixel * 10; }

    protected drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds3D) {
        // TODO: better ship symbol, indicating direction of velocity
        ctx.beginPath();
        ctx.moveTo(screenPos.x, screenPos.y - 15 * display.onePixel);
        ctx.lineTo(screenPos.x + 9 * display.onePixel, screenPos.y + 15 * display.onePixel);
        ctx.lineTo(screenPos.x - 9 * display.onePixel, screenPos.y + 15 * display.onePixel);
        ctx.fill();
    }
}