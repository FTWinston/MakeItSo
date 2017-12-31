import { Vector3 } from '../Vector3';
import { CubeFace } from './CubeFace';

type faceDrawer = (ctx: CanvasRenderingContext2D) => void;

export class Cube {
    private faces: [CubeFace, CubeFace, CubeFace, CubeFace, CubeFace, CubeFace];
    
    constructor(drawTop: faceDrawer,
                drawBottom: faceDrawer,
                drawLeft: faceDrawer,
                drawRight: faceDrawer,
                drawFront: faceDrawer,
                drawRear: faceDrawer
                ) {
        let vertices = [
            new Vector3(-1, 1,-1),
            new Vector3( 1, 1,-1),
            new Vector3( 1,-1,-1),
            new Vector3(-1,-1,-1),
            new Vector3(-1, 1, 1),
            new Vector3( 1, 1, 1),
            new Vector3( 1,-1, 1),
            new Vector3(-1,-1, 1)
        ];

        this.faces = [
            new CubeFace(new Vector3(0, 0, -1), [vertices[0], vertices[1], vertices[2], vertices[3]], drawBottom),
            new CubeFace(new Vector3(1, 0, 0), [vertices[2], vertices[1], vertices[5], vertices[6]], drawLeft),
            new CubeFace(new Vector3( 0, 0, 1), [vertices[5], vertices[4], vertices[7], vertices[6]], drawTop),
            new CubeFace(new Vector3(-1, 0, 0), [vertices[0], vertices[3], vertices[7], vertices[4]], drawRight),
            new CubeFace(new Vector3(0, 1, 0), [vertices[1], vertices[0], vertices[4], vertices[5]], drawRear),
            new CubeFace(new Vector3(0, -1, 0), [vertices[3], vertices[2], vertices[6], vertices[7]], drawFront)
        ];
    }

    private static towardsCamera = new Vector3(0, 0, 1);
    
    public draw(ctx: CanvasRenderingContext2D, radius: number, pitch: number, yaw: number, roll: number) {
        const deg2rad = Math.PI / 180;
        pitch = pitch * deg2rad;
        yaw = -yaw * deg2rad;
        roll = -roll * deg2rad;
        
        for (let face of this.faces) {
            face.reset();

            let dot = face.normal
                .rotateY(roll)
                .rotateX(pitch)
                .rotateZ(yaw)
                .dot(Cube.towardsCamera);

            if (dot <= 0)
                continue; // only draw faces visible from the camera
            ctx.beginPath();

            let faceVertex = 0;
            let point = face.vertices[faceVertex]
                .scale(radius)
                .rotateY(roll)
                .rotateX(pitch)
                .rotateZ(yaw);

            ctx.moveTo(point.x, point.y);

            for (faceVertex++; faceVertex < 4; faceVertex++) {
                let point = face.vertices[faceVertex]
                    .scale(radius)
                    .rotateY(roll)
                    .rotateX(pitch)
                    .rotateZ(yaw);

                ctx.lineTo(point.x, point.y);
            }
            
            ctx.closePath();

            ctx.save();
            ctx.globalAlpha = dot * 0.3 + 0.7;

            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.stroke();

            ctx.strokeStyle = '#000000';
            face.applyTransform(ctx, radius);
            face.drawSymbol(ctx);

            ctx.restore();
        }
    }
}