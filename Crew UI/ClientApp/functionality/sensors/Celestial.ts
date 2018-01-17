import { CanvasBounds } from '../CanvasBounds';
import { SensorTarget } from './SensorTarget';
import { Vector2, Vector3 } from '../math'; 
import texture from './sphere_shade.png';

let image = new Image();
image.src = texture;

export class Celestial extends SensorTarget {
    constructor(id: number, position: Vector3, public color: string, public radius: number) {
        super(id, position);
    }

    isOnScreen(screenPos: Vector2, display: CanvasBounds) {
        return this.isRadiusOnScreen(screenPos, this.radius, display);
    }

    protected isRadiusOnScreen(screenPos: Vector2, radius: number, display: CanvasBounds) {
        return screenPos.x >= display.minX - radius
            && screenPos.x <= display.maxX + radius
            && screenPos.y >= display.minY - radius
            && screenPos.y <= display.maxY + radius;
    }
    
    protected getShadowRadius(display: CanvasBounds) { return this.radius * 0.85; }

    protected drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds) {
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