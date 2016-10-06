class ShieldCursor {
    constructor(x, y) {
	    this.x = x; this.y = y;
    }

    x: number; 
    y: number;
    xscale: number;
    yscale: number;

    draw(ctx) {
	    ctx.strokeStyle = '#FFFFFF';
	    ctx.lineWidth = this.xscale * 0.15;
	    ctx.beginPath();
	    ctx.rect(this.x * this.xscale, this.y * this.yscale, 2 * this.xscale, this.yscale);
	    ctx.stroke();
    }
}