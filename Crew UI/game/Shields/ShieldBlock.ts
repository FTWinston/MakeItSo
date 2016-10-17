const enum ShieldBlockType {
    Normal = 1,
    ActiveCombo = 2,
    Damage = 3
}

class ShieldBlock {
    constructor (color, type) {
        this.color = color;
        this.type = type;
        this.falling = false;
    }
    color: number;
    type: ShieldBlockType;
    falling: boolean;
    
    isMatch(b) {
        return b !== undefined && this.color == b.color && this.type == b.type;
    }
    isDamage() {
        return this.type == ShieldBlockType.Damage;
    }
    canMove() {
        return this.type != ShieldBlockType.Damage;
    }
    draw(ctx, x, y, width, height, colors) {        
        if (this.type == ShieldBlockType.ActiveCombo)
            ctx.fillStyle = '#ffffff';
        else
            ctx.fillStyle = colors[this.color];
        ctx.beginPath();
        ctx.rect(width * x + width * 0.05, height * y + height * 0.05, width * 0.9, height * 0.9);
        ctx.fill();
        
        if (this.type == ShieldBlockType.Damage) {
            ctx.strokeStyle = '#999999';
            ctx.lineWidth = width * 0.15;
            
            ctx.beginPath();
            ctx.moveTo(width * x, height * y);
            ctx.lineTo(width * (x + 1), height * (y + 1));
            ctx.moveTo(width * (x + 1), height * y);
            ctx.lineTo(width * x, height * (y + 1));
            ctx.stroke();
        }
    }
}