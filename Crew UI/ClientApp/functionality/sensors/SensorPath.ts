import { CanvasBounds, CanvasBounds3D } from '~/functionality';
import { SensorTarget } from './SensorTarget';
import { Vector2, Vector3 } from '~/functionality/math';

export class SensorPath extends SensorTarget {
    constructor(id: number, public points: Vector3[]) {
        super(id, points[0]);
    }

    isBetween(min: Vector3, max: Vector3) {
        for (let point of this.points) {
            if (this.position.isBetween(min, max)) {
                return true;
            }
        }

        return false;
    }

    protected getShadowRadius(display: CanvasBounds3D) { return 0; }

    protected drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds3D) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = display.onePixel * 3;

        ctx.beginPath();

        let first = true;
        let firstScreenPos = new Vector2(0, 0);
        let lastScreenPos = firstScreenPos;
        for (let point of this.points) {
            let screenPos = display.transform(point).position;
            lastScreenPos = screenPos;

            if (first) {
                firstScreenPos = screenPos;
                ctx.moveTo(screenPos.x, screenPos.y);
                first = false;
            } else {
                ctx.lineTo(screenPos.x, screenPos.y);
            }

            // TODO: should curve between these points
        }

        ctx.stroke();

        this.drawStartIndicator(ctx, display, firstScreenPos);
        this.drawEndIndicator(ctx, display, lastScreenPos);
    }

    private drawStartIndicator(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, screenPos: Vector2) {
        ctx.strokeStyle = '#0cf';
        ctx.lineWidth = display.onePixel;
        let radius = display.onePixel * 10;
        ctx.beginPath();
        ctx.arc(screenPos.x, screenPos.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    private drawEndIndicator(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, screenPos: Vector2) {
        ctx.strokeStyle = '#fc0';
        ctx.lineWidth = display.onePixel;
        let crossSize = display.onePixel * 10;
        ctx.beginPath();

        ctx.moveTo(screenPos.x - crossSize, screenPos.y - crossSize);
        ctx.lineTo(screenPos.x + crossSize, screenPos.y + crossSize);
        ctx.moveTo(screenPos.x + crossSize, screenPos.y - crossSize);
        ctx.lineTo(screenPos.x - crossSize, screenPos.y + crossSize);
        
        ctx.stroke();
    }

    protected drawIndicator(ctx: CanvasRenderingContext2D, targetPos: Vector2, display: CanvasBounds3D, floorPos: Vector2) {
        super.drawIndicator(ctx, targetPos, display, floorPos);
/*
        // TODO: uncomment once floorZ is available here

        if (this.points.length <= 1) {
            return;
        }

        let lastPoint = this.points[this.points.length - 1];
        let endScreenPos = display.transform(lastPoint).position;
        let endFloorPos = display.transform(new Vector3(lastPoint.x, lastPoint.y, floorZ)).position;

        super.drawIndicator(ctx, endScreenPos, display, endFloorPos);
*/
    }
}