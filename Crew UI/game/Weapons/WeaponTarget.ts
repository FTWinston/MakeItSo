const enum TargetStatus {
    Friendly = 1,
    Hostile = 2,
    Unknown = 3
}

class Vector3 {
    constructor(public x: number, public y: number, public z: number) { }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    scale(factor: number) {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
        return this;
    }
    rotateX(angle: number) {
        let cosa = Math.cos(angle);
        let sina = Math.sin(angle);
        let prevY = this.y;
        this.y = this.y * cosa - this.z * sina;
        this.z = prevY * sina + this.z * cosa;
        return this;
    }
    rotateY(angle: number) {
        let cosa = Math.cos(angle);
        let sina = Math.sin(angle);
        let prevZ = this.z;
        this.z = this.z * cosa - this.x * sina;
        this.x = prevZ * sina + this.x * cosa;
        return this;
    }
    rotateZ(angle: number) {
        let cosa = Math.cos(angle);
        let sina = Math.sin(angle);
        let prevX = this.x;
        this.x = this.x * cosa - this.y * sina;
        this.y = prevX * sina + this.y * cosa;
        return this;
    }
    dot(other: Vector3) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }
}

class CubeFace {
    public normal: Vector3;
    public vertices: [Vector3, Vector3, Vector3, Vector3];
    constructor(private origNormal: Vector3, private origVertices: [Vector3, Vector3, Vector3, Vector3], public drawSymbol: (ctx: CanvasRenderingContext2D) => void) { }

    public reset() {
        this.normal = this.origNormal.clone();
        let vertices = this.origVertices;
        this.vertices = [vertices[0].clone(), vertices[1].clone(), vertices[2].clone(), vertices[3].clone()];
    }

    public applyTransform(ctx: CanvasRenderingContext2D, size: number) {
        let tl = this.vertices[0], tr = this.vertices[1], br = this.vertices[2];
        //let oldMatrix = [[-1, 1, 1], [1, 1, -1], [1, 1, 1]];
        //let inverseOld = CubeFace.getMatrixInverse(oldMatrix);
        let inverseOld = [[-.5, 0, .5], [.5, .5, 0], [0,-.5, .5]];

        let newMatrix = [[tl.x, tr.x, br.x], [tl.y, tr.y, br.y]];
        let transform = CubeFace.matrixMultiply(newMatrix, inverseOld);

        ctx.transform(transform[0][0], transform[1][0], transform[0][1], transform[1][1], transform[0][2], transform[1][2]);
    }
    private static matrixMultiply(matrixA, matrixB) {
        let n = 2, m = 3, p = 3;
        let matrixC = [new Array(3), new Array(3)];

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < p; j++) {
                let sum = 0;
                for (let k = 0; k < m; k++) {
                    sum += matrixA[i][k] * matrixB[k][j];
                }
                matrixC[i][j] = sum;
            }
        }
        return matrixC;
    }
}

class WeaponTarget {
    constructor(id: string, size: number, status: TargetStatus, angle: number, dist: number, pitch: number, yaw: number, roll: number) {
        this.id = id;
        this.size = size;
        this.status = status;
        this.updatePosition(angle, dist);
        this.updateOrientation(pitch, yaw, roll);
        this.selected = false;
    }

    static lerpDuration: number = 1000;
    private static faces: CubeFace[];

    static init() {
        let vertices = [
            new Vector3(-1, 1, -1),
            new Vector3(1, 1, -1),
            new Vector3(1, -1, -1),
            new Vector3(-1, -1, -1),
            new Vector3(-1, 1, 1),
            new Vector3(1, 1, 1),
            new Vector3(1, -1, 1),
            new Vector3(-1, -1, 1)
        ];
        WeaponTarget.faces = [
            new CubeFace(new Vector3(0, 0, -1), [vertices[0], vertices[1], vertices[2], vertices[3]], WeaponTarget.drawBottomFace),
            new CubeFace(new Vector3(1, 0, 0),  [vertices[1], vertices[5], vertices[6], vertices[2]], WeaponTarget.drawFrontFace),
            new CubeFace(new Vector3(0, 0, 1),  [vertices[5], vertices[4], vertices[7], vertices[6]], WeaponTarget.drawTopFace),
            new CubeFace(new Vector3(-1, 0, 0), [vertices[4], vertices[0], vertices[3], vertices[7]], WeaponTarget.drawRearFace),
            new CubeFace(new Vector3(0, 1, 0),  [vertices[0], vertices[4], vertices[5], vertices[1]], WeaponTarget.drawRightFace),
            new CubeFace(new Vector3(0, -1, 0), [vertices[3], vertices[2], vertices[6], vertices[7]], WeaponTarget.drawLeftFace)
        ];
    }

    id: string;
    size: number;
    private radius: number;
    status: TargetStatus;
    selected: boolean;
    private lerpEndTime: number;

    x: number;
    y: number;
    z: number;
    pitch: number;
    yaw: number;
    roll: number;
    private renderX: number;
    private renderY: number;
    private fromX: number;
    private fromY: number;
    private nextX: number;
    private nextY: number;

    updatePosition(angle: number, dist: number) {
        angle = angle * Math.PI / 180; // 0 - 2pi
        dist = dist / 100; // 0 - 1

        var x = 0.5 + 0.5 * dist * Math.cos(angle);
        var y = 0.5 + 0.5 * dist * Math.sin(angle);

        if (this.x === undefined) {
            this.x = x;
            this.y = y;
            return;
        }

        this.fromX = this.x;
        this.fromY = this.y;

        this.nextX = x;
        this.nextY = y;
        this.lerpEndTime = performance.now() + WeaponTarget.lerpDuration;
    }
    updateOrientation(pitch: number, yaw: number, roll: number) {
        pitch = pitch * Math.PI / 180; // 0 - 2pi
        yaw = yaw * Math.PI / 180; // 0 - 2pi
        roll = roll * Math.PI / 180; // -pi - +pi

        //if (this.pitch === undefined) {
        this.pitch = pitch;
        this.yaw = yaw;
        this.roll = roll;
        //return;
        //}

        // TODO: lerp orientation?
    }
    draw(ctx: CanvasRenderingContext2D, time: number, panelWidth: number, panelHeight: number, minSize: number) {
        this.determineRenderPosition(time, panelWidth, panelHeight, minSize);

        ctx.save();
        if (this.status == TargetStatus.Friendly)
            ctx.fillStyle = '#00cc00';
        else if (this.status == TargetStatus.Hostile)
            ctx.fillStyle = '#cc0000';
        else
            ctx.fillStyle = '#aaaa00';

        ctx.strokeStyle = '#666666';

        let pitchScale = Math.cos(this.pitch);
        let rollScale = Math.cos(this.roll);

        ctx.translate(this.renderX, this.renderY);
        this.drawCube(ctx);
        
        if (this.selected) {
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = minSize * 0.25;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius * 1.5, 0, Math.PI * 2);
            ctx.stroke();
        }

        /*
        ctx.rotate(-this.yaw);

        var size = minSize * 1.2;
        ctx.font = size + 'px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.id, 0, 0);
        */

        ctx.restore();
    }
    private determineRenderPosition(time: number, panelWidth: number, panelHeight: number, minSize: number) {
        // lerp these variables if lerpEndTime is set
        if (this.lerpEndTime !== undefined) {
            if (this.lerpEndTime <= time) {
                this.lerpEndTime = undefined;

                this.x = this.nextX;
                this.y = this.nextY;
                this.nextX = undefined;
                this.nextY = undefined;
            }
            else {
                var fraction = 1 - (this.lerpEndTime - time) / WeaponTarget.lerpDuration;
                this.x = this.fromX + (this.nextX - this.fromX) * fraction;
                this.y = this.fromY + (this.nextY - this.fromY) * fraction;
            }
        }

        this.renderX = this.x * panelWidth;
        this.renderY = this.y * panelHeight;
        this.radius = minSize * (this.size * 0.1 + 1);
    }

    private static camera = new Vector3(0, 0, -1);
    private drawCube(ctx: CanvasRenderingContext2D) {
        for (let face of WeaponTarget.faces) {
            face.reset();

            let dot = face.normal
                .rotateX(this.yaw)
                .rotateY(this.pitch)
                .rotateZ(this.roll)
                .dot(WeaponTarget.camera);

            if (dot <= 0)
                continue; // only draw faces visible from "above"

            ctx.beginPath();

            let faceVertex = 0;
            let point = face.vertices[faceVertex]
                .scale(this.radius)
                .rotateX(this.yaw)
                .rotateY(this.pitch)
                .rotateZ(this.roll);

            ctx.moveTo(point.x, point.y);

            for (faceVertex++; faceVertex < 4; faceVertex++) {
                let point = face.vertices[faceVertex]
                    .scale(this.radius)
                    .rotateX(this.yaw)
                    .rotateY(this.pitch)
                    .rotateZ(this.roll);

                ctx.lineTo(point.x, point.y);
            }
            
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.save();

            face.applyTransform(ctx, this.radius);
            face.drawSymbol(ctx);

            ctx.restore();
        }
    }
    intersects(x: number, y: number, padRadius: boolean) {
        var r = padRadius ? this.radius * 1.75 : this.radius;
        return x >= this.renderX - r && x <= this.renderX + r
            && y >= this.renderY - r && y <= this.renderY + r;
    }
    private static drawFrontFace(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#ccc';
        ctx.fill();
    }
    private static drawRearFace(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#666';
        ctx.fill();
    }
    private static drawLeftFace(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#f00';
        ctx.fill();
    }
    private static drawRightFace(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#0c6';
        ctx.fill();
    }
    private static drawTopFace(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#c0c';
        ctx.fill();
    }
    private static drawBottomFace(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fillStyle = '#fc0';
        ctx.fill();
    }
};
WeaponTarget.init();