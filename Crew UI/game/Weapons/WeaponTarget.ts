const enum TargetStatus {
    Friendly = 1,
    Hostile = 2,
    Unknown = 3
}

class Point3D {
    constructor(public x: number, public y: number, public z: number) { }

    rotateX(angle: number) {
        let cosa = Math.cos(angle);
        let sina = Math.sin(angle);
        let y = this.y * cosa - this.z * sina;
        let z = this.y * sina + this.z * cosa;
        return new Point3D(this.x, y, z);
    }

    rotateY(angle: number) {
        let cosa = Math.cos(angle);
        let sina = Math.sin(angle);
        let z = this.z * cosa - this.x * sina;
        let x = this.z * sina + this.x * cosa;
        return new Point3D(x, this.y, z)
    }

    rotateZ(angle: number) {
        let cosa = Math.cos(angle);
        let sina = Math.sin(angle);
        let x = this.x * cosa - this.y * sina;
        let y = this.x * sina + this.y * cosa;
        return new Point3D(x, y, this.z)
    }

    project(viewWidth: number, viewHeight: number, fov: number, viewDistance: number) {
        return new Point3D(this.x * viewWidth, this.y * viewWidth, this.z);
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
    private static vertices = [
        new Point3D(-1, 1, -1),
        new Point3D(1, 1, -1),
        new Point3D(1, -1, -1),
        new Point3D(-1, -1, -1),
        new Point3D(-1, 1, 1),
        new Point3D(1, 1, 1),
        new Point3D(1, -1, 1),
        new Point3D(-1, -1, 1)
    ];
    // Define the vertices that compose each of the 6 faces. Numbers are indices in vertices array
    private static faces = [[0, 1, 2, 3], [1, 5, 6, 2], [5, 4, 7, 6], [4, 0, 3, 7], [0, 4, 5, 1], [3, 2, 6, 7]];

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
            ctx.strokeStyle = ctx.fillStyle = '#00cc00';
        else if (this.status == TargetStatus.Hostile)
            ctx.strokeStyle = ctx.fillStyle = '#cc0000';
        else
            ctx.strokeStyle = ctx.fillStyle = '#aaaa00';

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
    private drawCube(ctx: CanvasRenderingContext2D) {
        let rotatedVertices: Point3D[] = [];

        for (let vertex of WeaponTarget.vertices) {
            let point = vertex
                .rotateX(this.yaw)
                .rotateY(this.pitch)
                .rotateZ(this.roll);

            rotatedVertices.push(point);
        }

        for (let face of WeaponTarget.faces) {
            ctx.beginPath();

            let faceVertex = 0;
            let point = rotatedVertices[face[faceVertex]];
            ctx.moveTo(point.x * this.radius, point.y * this.radius);

            for (; faceVertex < 4; faceVertex++) {
                let point = rotatedVertices[face[faceVertex]];
                ctx.lineTo(point.x * this.radius, point.y * this.radius);
            }
            
            ctx.closePath();
            ctx.stroke();
        }
    }
    intersects(x: number, y: number, padRadius: boolean) {
        var r = padRadius ? this.radius * 1.75 : this.radius;
        return x >= this.renderX - r && x <= this.renderX + r
            && y >= this.renderY - r && y <= this.renderY + r;
    }
};