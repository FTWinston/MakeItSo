import { CanvasBounds } from '../CanvasBounds';
import { Celestial } from './Celestial';
import { Vector2, Vector3 } from '../math';

export class Star extends Celestial {
    constructor(id: number, position: Vector3, color: string, radius: number, public damageRadius?: number) {
        super(id, position, color, radius);
    }

    isOnScreen(screenPos: Vector2, display: CanvasBounds) {
        let radius = this.damageRadius !== undefined && this.damageRadius > this.radius
            ? this.damageRadius : this.radius;

        return this.isRadiusOnScreen(screenPos, radius, display);
    }

    protected drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds) {
        (ctx as any).filter = 'blur(8px)';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(screenPos.x, screenPos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        (ctx as any).filter = 'none';
        
        super.drawTarget(ctx, screenPos, display);
    }
}