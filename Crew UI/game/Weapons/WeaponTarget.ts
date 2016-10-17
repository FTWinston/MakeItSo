const enum TargetStatus {
    Friendly = 1,
    Hostile = 2,
    Unknown = 3
}

class WeaponTarget {
    constructor(id, size, status, angle, dist) {
        this.id = id;
        this.size = size;
        this.status = status;
        this.updatePosition(angle, dist);
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
        
        ctx.beginPath();
        ctx.arc(this.renderX, this.renderY, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        if (this.selected) {
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = minSize * 0.25;
            ctx.beginPath();
            ctx.arc(this.renderX, this.renderY, this.radius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        var size = minSize * 1.2;
        ctx.font = size + 'px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.id, this.renderX, this.renderY);
    }
    intersects(x, y, padRadius) {
        var r = padRadius ? this.radius * 1.75 : this.radius;
        return x >= this.renderX - r && x <= this.renderX + r
            && y >= this.renderY - r && y <= this.renderY + r;
    }
};