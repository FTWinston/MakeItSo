import { CanvasBounds3D } from '~/functionality';
import { SensorTarget } from './SensorTarget';
import { Vector2, Vector3 } from '~/functionality/math'; 
import texture from './sphere_shade.png';

let image = new Image();
image.src = texture;

export class Celestial extends SensorTarget {
    constructor(id: number, position: Vector3, public color: string, public radius: number) {
        super(id, position);
    }

    protected getShadowRadius(display: CanvasBounds3D) { return this.radius * 0.85; }

    protected drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds3D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(screenPos.x, screenPos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        let imgRadius = this.radius - Math.min(1, Math.max(0.1, this.radius * 0.02));
        (ctx as any).filter = 'blur(2px)';
        ctx.drawImage(image, screenPos.x - imgRadius, screenPos.y - imgRadius, imgRadius + imgRadius, imgRadius + imgRadius);
        (ctx as any).filter = 'none';
    }
}