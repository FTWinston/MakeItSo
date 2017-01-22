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
        if (this.status == TargetStatus.Friendly)
            ctx.fillStyle = '#00cc00';
        else if (this.status == TargetStatus.Hostile)
            ctx.fillStyle = '#cc0000';
        else
            ctx.fillStyle = '#aaaa00';
        
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

        let lengthScale = Math.cos(this.pitch);
        let noseY = -this.radius * lengthScale, rearY = -noseY;

        // offest to this.renderX / this.renderY, then rotate to this.yaw
        // and scale to this.radius? hmm, no that would affect line width
        ctx.translate(this.renderX + this.radius, this.renderY + this.radius);
        ctx.rotate(this.yaw);

        if (this.pitch > 0) {
            // angle up, draw rear oval
            
            ctx.translate(0, rearY);
            ctx.scale(1, 1 - lengthScale);

            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);

            ctx.scale(1, 1 / (1 - lengthScale));
            ctx.translate(0, -rearY);

            ctx.fill();
        }

        // draw side
        ctx.beginPath();
        ctx.moveTo(-this.radius, rearY);
        ctx.lineTo(0, noseY);
        ctx.lineTo(this.radius, rearY);
        //ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 1;
        ctx.stroke();

        // draw tip
        ctx.beginPath();
        let oldFillStyle = ctx.fillStyle;
        ctx.fillStyle = '#000000';
        ctx.arc(0, noseY, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = oldFillStyle;

        if (this.pitch > 0) {
            // draw middle side line
            ctx.beginPath();
            ctx.moveTo(0, noseY);
            ctx.lineTo(0, rearY + this.radius * (1 - lengthScale));
            ctx.stroke();
        }
        
        if (this.pitch < 0) {
            // draw middle side line
            ctx.beginPath();
            ctx.moveTo(0, noseY);
            ctx.lineTo(0, rearY - this.radius * (1 - lengthScale));
            ctx.stroke();


            // angle down, draw rear
            ctx.translate(0, rearY);
            ctx.scale(1, 1 - lengthScale);

            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.fill();

            // draw rear lines
            ctx.moveTo(-this.radius, 0);
            ctx.lineTo(this.radius, 0);
            ctx.moveTo(0, -this.radius);
            ctx.lineTo(0, this.radius);

            ctx.scale(1, 1 / (1 - lengthScale));
            ctx.translate(0, -rearY);

            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        

        

        // TODO: roll markings

        if (this.selected) {
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = minSize * 0.25;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.rotate(-this.yaw);

        /*
        var size = minSize * 1.2;
        ctx.font = size + 'px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.id, 0, 0);
        */

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    intersects(x, y, padRadius) {
        var r = padRadius ? this.radius * 1.75 : this.radius;
        return x >= this.renderX - r && x <= this.renderX + r
            && y >= this.renderY - r && y <= this.renderY + r;
    }
};