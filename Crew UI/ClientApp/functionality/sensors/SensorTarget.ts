import { CanvasBounds, CanvasBounds3D } from '~/functionality';
import { Vector2, Vector3 } from '~/functionality/math';

export abstract class SensorTarget {
    constructor(readonly id: number, public position: Vector3) {
    }

    interpolate(interval: number) {}

    draw(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, screenPos: Vector2, markerZ: number) {
        let floorPos = display.transform(new Vector3(this.position.x, this.position.y, markerZ)).position;

        this.drawShadow(ctx, display, floorPos);
        this.drawIndicator(ctx, screenPos, display, floorPos);
        this.drawTarget(ctx, screenPos, display);
    }

    isBetween(min: Vector3, max: Vector3) {
        return this.position.isBetween(min, max);
    }

    protected abstract drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds3D): void;

    protected abstract getShadowRadius(display: CanvasBounds3D): number;

    protected drawShadow(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, floorPos: Vector2) {
        let radius = this.getShadowRadius(display);
        if (radius <= 0) {
            return;
        }
        
        ctx.save();

        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#000';
        (ctx as any).filter = 'blur(5px)';

        // skew so that shadow fits onto the "floor" plane
        ctx.translate(floorPos.x, floorPos.y);
        ctx.scale(1, 0.4);

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    protected drawIndicator(ctx: CanvasRenderingContext2D, targetPos: Vector2, display: CanvasBounds3D, floorPos: Vector2) {
        // draw a depth indicator, showing Z height against axis more clearly
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = display.onePixel;
        const zScale = 1;
        let dashSize = display.onePixel * 3;
        
        ctx.setLineDash([dashSize, dashSize]);
        ctx.beginPath();
        ctx.lineTo(floorPos.x, floorPos.y);
        ctx.lineTo(targetPos.x, targetPos.y);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(floorPos.x - dashSize, floorPos.y);
        ctx.lineTo(floorPos.x + dashSize, floorPos.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}