import { CanvasBounds3D } from '../CanvasBounds';
import { Celestial } from './Celestial';
import { Vector2, Vector3 } from '../math';

export class Star extends Celestial {
    constructor(id: number, position: Vector3, color: string, radius: number, public damageRadius?: number) {
        super(id, position, color, radius);
    }

    protected drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds3D) {
        (ctx as any).filter = 'blur(8px)';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(screenPos.x, screenPos.y, this.radius * 1.05, 0, Math.PI * 2);
        ctx.fill();
        (ctx as any).filter = 'none';
        
        super.drawTarget(ctx, screenPos, display);
    }
}