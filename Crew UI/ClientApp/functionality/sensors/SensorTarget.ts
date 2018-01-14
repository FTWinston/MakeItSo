import { CanvasBounds, CanvasBounds3D } from '../CanvasBounds';
import { Vector2, Vector3 } from '../math';

export abstract class SensorTarget {
    constructor(readonly id: number, public position: Vector3) {
    }

    interpolate(interval: number) {}

    protected isOnScreen(screenPos: Vector2, display: CanvasBounds) {
        return screenPos.x >= display.minX
            && screenPos.x <= display.maxX
            && screenPos.y >= display.minY
            && screenPos.y <= display.maxY;
    }

    draw(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, markerZ: number) {
        let screenPos = display.transform(this.position);

        if (this.isOnScreen(screenPos, display)) {
            let floorPos = display.transform(new Vector3(this.position.x, this.position.y, markerZ));

            this.drawShadow(ctx, display, floorPos);
            this.drawIndicator(ctx, screenPos, display, floorPos);
            this.drawTarget(ctx, screenPos, display);
        }
    }

    protected abstract drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds): void;

    protected abstract getShadowRadius(display: CanvasBounds): number;

    protected drawShadow(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, floorPos: Vector2) {
        let prevFill = ctx.fillStyle;
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = '#000';
        let prevFilter = (ctx as any).filter;
        (ctx as any).filter = 'blur(5px)';

        // TODO: skew so that shadow fits onto the "floor" plane
        ctx.beginPath();
        ctx.arc(floorPos.x, floorPos.y, this.getShadowRadius(display), 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
        ctx.fillStyle = prevFill;
        (ctx as any).filter = prevFilter;
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