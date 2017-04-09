const enum TargetStatus {
    Friendly = 1,
    Hostile = 2,
    Unknown = 3
}

class WeaponTarget {
    constructor(id, size, status, angle, dist, pitch, yaw, roll) {
        this.id = id;
        this.size = size;
        this.status = status;
        this.updatePosition(angle, dist);
        this.updateOrientation(pitch, yaw, roll);
        this.selected = false;
    }

    static lerpDuration: number = 1000;

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

    updatePosition(angle, dist) {
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
    updateOrientation(pitch, yaw, roll) {
        pitch = pitch * Math.PI / 180; // 0 - 2pi
        yaw = yaw * Math.PI / 180; // 0 - 2pi
        roll = roll * Math.PI / 180; // 0 - 2pi

        //if (this.pitch === undefined) {
        this.pitch = pitch;
        this.yaw = yaw;
        this.roll = roll;
        //return;
        //}

        // TODO: lerp orientation?
    }
    draw(ctx, time, panelWidth, panelHeight, minSize) {
        this.determineRenderPosition(time, panelWidth, panelHeight, minSize);

        ctx.save();
        if (this.status == TargetStatus.Friendly)
            ctx.fillStyle = '#00cc00';
        else if (this.status == TargetStatus.Hostile)
            ctx.fillStyle = '#cc0000';
        else
            ctx.fillStyle = '#aaaa00';

        let lengthScale = Math.cos(this.pitch);
        let noseY = -this.radius * lengthScale, rearY = -noseY;
        
        ctx.translate(this.renderX + this.radius, this.renderY + this.radius);
        ctx.rotate(this.yaw);

        if (this.pitch > 0) {
            this.drawRear(ctx, rearY, lengthScale, false);
            this.drawRearDots(ctx, rearY, lengthScale);
        }

        this.drawSide(ctx, rearY, noseY);
        //this.drawSideLines(ctx, rearY, noseY, lengthScale, this.pitch >= 0);

        if (this.pitch < 0) {
            this.drawRear(ctx, rearY, lengthScale, true);
            this.drawRearLines(ctx, rearY, lengthScale);
            this.drawRearDots(ctx, rearY, lengthScale);
        }
        
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
    private determineRenderPosition(time, panelWidth, panelHeight, minSize) {
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
    private drawRear(ctx: CanvasRenderingContext2D, rearY: number, lengthScale: number, drawOutline: boolean) {
        ctx.save();
        ctx.translate(0, rearY);
        ctx.scale(1, 1 - lengthScale);

        ctx.beginPath();

        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        if (drawOutline) {
            ctx.strokeStyle = '#333333';
            ctx.stroke(); // called after restore(), so that the outline is always stroked at full width
        }
    }
    private drawRearLines(ctx: CanvasRenderingContext2D, rearY: number, lengthScale: number) {
        ctx.save();
        ctx.translate(0, rearY);
        ctx.scale(1, 1 - lengthScale);
        ctx.rotate(this.roll);

        ctx.beginPath();

        ctx.moveTo(-this.radius, 0);
        ctx.lineTo(this.radius, 0);
        ctx.moveTo(0, -this.radius);
        ctx.lineTo(0, 0);

        ctx.strokeStyle = '#333333';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
    }
    private drawRearDots(ctx: CanvasRenderingContext2D, rearY: number, lengthScale: number) {
        // draw red / green dots ... these need to be round, but still positioned by transform...
        // can't calculate right pos (sans scaling) myself, so using drawLine with round lineCaps to "set up" drawing before restore()
        this.drawRearDot(ctx, rearY, lengthScale, -this.radius, '#ff0000');
        this.drawRearDot(ctx, rearY, lengthScale,  this.radius, '#00cc66');
    }
    private drawRearDot(ctx: CanvasRenderingContext2D, rearY: number, lengthScale: number, xOffset: number, color: string) {
        ctx.save();

        ctx.translate(0, rearY);
        ctx.scale(1, 1 - lengthScale);
        ctx.rotate(this.roll);

        ctx.beginPath();
        ctx.moveTo(xOffset, 0);
        ctx.lineTo(xOffset, 0);

        ctx.restore();

        ctx.save();

        ctx.lineCap = 'round';
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#000000';
        ctx.stroke();

        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.restore();
    }
    private drawSide(ctx: CanvasRenderingContext2D, rearY: number, noseY: number) {
        ctx.beginPath();
        ctx.moveTo(-this.radius, rearY);
        ctx.lineTo(0, noseY);
        ctx.lineTo(this.radius, rearY);
        //ctx.closePath();
        ctx.fill();
        /*
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 1;
        ctx.stroke();
        */

        // draw the tip
        this.drawTip(ctx, noseY);
    }
    private drawSideLines(ctx: CanvasRenderingContext2D, rearY: number, noseY: number, lengthScale: number, pitchUp: boolean) {
        ctx.beginPath();

        // TODO: draw these accounting for roll?

        ctx.moveTo(0, noseY);
        let offset = this.radius * (1 - lengthScale);
        ctx.lineTo(0, pitchUp ? rearY + offset : rearY - offset);
        ctx.stroke();
    }
    private drawTip(ctx: CanvasRenderingContext2D, noseY: number) {
        ctx.save();
        
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.arc(0, noseY, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }
    intersects(x, y, padRadius) {
        var r = padRadius ? this.radius * 1.75 : this.radius;
        return x >= this.renderX - r && x <= this.renderX + r
            && y >= this.renderY - r && y <= this.renderY + r;
    }
};