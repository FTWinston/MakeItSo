import { CanvasBounds3D } from '~/functionality';
import { SensorTarget } from './SensorTarget';
import { Vector2, Vector3 } from '~/functionality/math';

export const enum JumpPathStatus { // matches enum in WarpSystem.h
    Calculating = 1,
    Invalid = 2,
    Plotted = 3,
    InRange = 4,
}

export class JumpPath extends SensorTarget {
    public highlighted = false;
    constructor(id: number, public power: number, public status: JumpPathStatus, public points: Vector3[]) {
        super(id, points[0]);
    }

    isBetween(min: Vector3, max: Vector3) {
        for (let point of this.points) {
            if (point.isBetween(min, max)) {
                return true;
            }
        }

        return false;
    }

    protected getShadowRadius(display: CanvasBounds3D) { return 0; }

    protected drawTarget(ctx: CanvasRenderingContext2D, screenPos: Vector2, display: CanvasBounds3D) {
        if (this.highlighted) {
            ctx.strokeStyle = '#fff';
        }
        else {
            switch (this.status) {
                case JumpPathStatus.InRange:
                    ctx.strokeStyle = '#cfc';
                    break;
                case JumpPathStatus.Invalid:
                    ctx.strokeStyle = '#f66';
                    break;
                case JumpPathStatus.Calculating:
                    ctx.setLineDash([5, 3]);
                    // break; NO BREAK SO THIS USES SAME COLOR AS default
                default:
                    ctx.strokeStyle = '#ccc';
                    break;
            }
        }

        ctx.lineWidth = display.onePixel * 3;

        ctx.beginPath();

        let first = true;
        let firstScreenPos = new Vector2(0, 0);
        let lastScreenPos = firstScreenPos;
        for (let point of this.points) {
            screenPos = display.transform(point).position;
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

        ctx.setLineDash([]);

        if (!this.highlighted) {
            ctx.globalAlpha = 0.8;
        }

        this.drawStartIndicator(ctx, display, firstScreenPos);

        if (this.status !== JumpPathStatus.Calculating) {
            this.drawEndIndicator(ctx, display, lastScreenPos);
        }

        ctx.globalAlpha = 1;
    }

    private drawStartIndicator(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, screenPos: Vector2) {
        ctx.strokeStyle = '#0cf';
        ctx.lineWidth = display.onePixel * 3;
        let radius = display.onePixel * 10;
        ctx.beginPath();
        ctx.arc(screenPos.x, screenPos.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    private drawEndIndicator(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, screenPos: Vector2) {
        ctx.strokeStyle = '#fc0';
        ctx.lineWidth = display.onePixel * 3;
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