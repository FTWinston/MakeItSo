import { Cube } from './Cube';

export class OrientationCube extends Cube {
    constructor() {
        super(OrientationCube.drawTopFace, OrientationCube.drawBottomFace, OrientationCube.drawLeftFace,
              OrientationCube.drawRightFace, OrientationCube.drawFrontFace, OrientationCube.drawRearFace);
    }

    private static thinLine = 0.1;
    private static thickLine = 0.2;
    private static thinDash = [OrientationCube.thinLine, OrientationCube.thinLine];
    private static thickDash = [0.15, 0.15];
    private static noDash: number[] = [];

    private static drawFrontFace(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = OrientationCube.thickLine;
        ctx.setLineDash(OrientationCube.noDash);
        ctx.beginPath();
        ctx.moveTo(-0.6, -0.6);
        ctx.lineTo(0, 0);
        ctx.lineTo(0.6, -0.6);
        ctx.stroke();

        ctx.setLineDash(OrientationCube.thickDash);
        ctx.beginPath();
        ctx.moveTo(-0.6, 0.6);
        ctx.lineTo(0, 0);
        ctx.lineTo(0.6, 0.6);
        ctx.stroke();

        ctx.lineWidth = OrientationCube.thinLine;
        ctx.setLineDash(OrientationCube.noDash);
        ctx.beginPath();
        ctx.moveTo(0, -1);
        ctx.lineTo(0, 0);
        ctx.stroke();

        ctx.setLineDash(OrientationCube.thinDash);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 1);
        ctx.stroke();
    }

    private static drawRearFace(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = OrientationCube.thickLine;
        ctx.setLineDash(OrientationCube.noDash);
        ctx.beginPath();
        ctx.moveTo(-0.6, -0.4);
        ctx.lineTo(0, -1);
        ctx.lineTo(0.6, -0.4);
        ctx.stroke();

        ctx.setLineDash(OrientationCube.thickDash);
        ctx.beginPath();
        ctx.moveTo(-0.6, 0.4);
        ctx.lineTo(0, 1);
        ctx.lineTo(0.6, 0.4);
        ctx.stroke();

        ctx.setLineDash(OrientationCube.noDash);
        ctx.lineWidth = OrientationCube.thinLine;
        ctx.beginPath();
        ctx.moveTo(0, -1);
        ctx.lineTo(0, 0);
        ctx.stroke();

        ctx.setLineDash(OrientationCube.thinDash);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 1);
        ctx.stroke();
    }
    
    private static drawLeftFace(ctx: CanvasRenderingContext2D) {
        ctx.setLineDash(OrientationCube.noDash);
        ctx.lineWidth = OrientationCube.thickLine;
        ctx.beginPath();
        ctx.moveTo(-0.3, -0.6);
        ctx.lineTo(-0.9, 0);
        ctx.stroke();

        ctx.setLineDash(OrientationCube.thickDash);
        ctx.moveTo(-0.9, 0);
        ctx.lineTo(-0.3, 0.6);
        ctx.stroke();

        ctx.setLineDash(OrientationCube.noDash);
        ctx.lineWidth = OrientationCube.thinLine;
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.lineTo(1, 0);
        ctx.stroke();
    }

    private static drawRightFace(ctx: CanvasRenderingContext2D) {
        ctx.setLineDash(OrientationCube.noDash);
        ctx.lineWidth = OrientationCube.thickLine;
        ctx.beginPath();
        ctx.moveTo(0.3, -0.6);
        ctx.lineTo(0.9, 0);
        ctx.stroke();

        ctx.setLineDash(OrientationCube.thickDash);
        ctx.moveTo(0.9, 0);
        ctx.lineTo(0.3, 0.6);
        ctx.stroke();

        ctx.setLineDash(OrientationCube.noDash);
        ctx.lineWidth = OrientationCube.thinLine;
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.lineTo(1, 0);
        ctx.stroke();
    }

    private static drawTopFace(ctx: CanvasRenderingContext2D) {
        ctx.setLineDash(OrientationCube.noDash);
        ctx.lineWidth = OrientationCube.thickLine;
        ctx.beginPath();
        ctx.moveTo(-0.6, -0.3);
        ctx.lineTo(0, -0.9);
        ctx.lineTo(0.6, -0.3);
        ctx.stroke();
        
        ctx.lineWidth = OrientationCube.thinLine;
        ctx.beginPath();
        ctx.moveTo(0, -1);
        ctx.lineTo(0, 1);
        ctx.stroke();
    }

    private static drawBottomFace(ctx: CanvasRenderingContext2D) {
        ctx.setLineDash(OrientationCube.thickDash);
        ctx.lineWidth = OrientationCube.thickLine;
        ctx.beginPath();
        ctx.moveTo(-0.6, -0.3);
        ctx.lineTo(0, -0.9);
        ctx.lineTo(0.6, -0.3);
        ctx.stroke();

        ctx.setLineDash(OrientationCube.thinDash);
        ctx.lineWidth = OrientationCube.thinLine;
        ctx.beginPath();
        ctx.moveTo(0, -1);
        ctx.lineTo(0, 1);
        ctx.stroke();
    }
}