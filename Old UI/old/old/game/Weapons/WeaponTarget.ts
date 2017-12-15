const enum TargetStatus {
    Friendly = 1,
    Hostile = 2,
    Unknown = 3
}

class WeaponTarget {
    constructor(id: string, size: number, status: TargetStatus, relPitch: number, relYaw: number, dist: number, pitch: number, yaw: number, roll: number) {
        this.id = id;
        this.size = size;
        this.status = status;
        this.updatePosition(relPitch, relYaw, dist);
        this.updateOrientation(pitch, yaw, roll);
        this.selected = false;
    }

    static lerpDuration: number = 1000;
    private static faces: CubeFace[];

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

    updatePosition(relPitch: number, relYaw: number, dist: number) {
        let inFront = Math.abs(relYaw) <= 90;

        relPitch = relPitch * Math.PI / 180; // -pi/2 - pi/2
        relYaw = (relYaw - 180) * Math.PI / 180; // -pi - pi
        dist = dist / 100; // 0 - 1

        let rFrontCircle = 0.75, rRearCircle = 1;
        // TODO: calculate position on a circle, not a square

        let x: number, y: number;
        if (inFront) {
            x = rFrontCircle * Math.sin(relYaw);
            y = rFrontCircle * Math.sin(relPitch);
        }
        else {
            // TODO: this just isn't right
            x = rFrontCircle * Math.sin(relYaw);
            y = rFrontCircle * Math.sin(relPitch);
        }
        
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

        let halfWidth = panelWidth * 0.5, halfHeight = panelHeight * 0.5;
        this.renderX = this.x * halfWidth + halfWidth;
        this.renderY = this.y * halfHeight + halfHeight;
        this.radius = minSize * (this.size * 0.1 + 1);
    }

    intersects(x: number, y: number, padRadius: boolean) {
        var r = padRadius ? this.radius * 1.75 : this.radius;
        return x >= this.renderX - r && x <= this.renderX + r
            && y >= this.renderY - r && y <= this.renderY + r;
    }
};
WeaponTarget.init();