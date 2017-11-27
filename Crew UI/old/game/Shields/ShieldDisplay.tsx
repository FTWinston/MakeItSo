﻿interface IShieldDisplayProps {
    x?: number;
    y?: number;
    visible?: boolean;
    cellsTall?: number;
    cellsWide?: number;
    minSwipeDist?: number;
    maxTapDist?: number;
    colors?: string[];
}

class ShieldDisplay extends React.Component<IShieldDisplayProps, {}> {
    static defaultProps = {
        x: 0, y: 0, cellsTall: 24, cellsWide: 36, minSwipeDist: 20, maxTapDist: 10, colors: ['#cc0000', '#ff9900', '#cccc00', '#00cc00', '#0099ff', '#9900ff']
    }
    private cursor: ShieldCursor;
    private data: ShieldData;
    private interval: number;
    private cellWidth: number;
    private cellHeight: number;
    private rotated: boolean;

    componentDidMount() {
        var startX = Math.floor(this.props.cellsWide / 2), startY = Math.floor(this.props.cellsTall / 2);
        this.cursor = new ShieldCursor(startX, startY);
        this.data = new ShieldData(this.props.cellsWide, this.props.cellsTall);

        for (var x=0; x<this.props.cellsWide; x++)
            for (var y=2; y<this.props.cellsTall; y++) {
                var color = Math.floor(Math.random() * this.props.colors.length);
                var block = new ShieldBlock(color, ShieldBlockType.Normal);
                this.data.setBlock(block, x, y);
            }
        
        this.interval = setInterval(this.applyGravity.bind(this),400);
        
        Hotkeys.register(37, this);
        Hotkeys.register(38, this);
        Hotkeys.register(39, this);
        Hotkeys.register(40, this);
        Hotkeys.register(' ', this);

        this.rotated = false;
    }
    componentWillUnmount() {
        this.cursor = null;
        this.data = null;
        
        clearInterval(this.interval);
        
        Hotkeys.unregister(37, this);
        Hotkeys.unregister(38, this);
        Hotkeys.unregister(39, this);
        Hotkeys.unregister(40, this);
        Hotkeys.unregister(' ', this);
    }
    render() {
        return (
            <Canvas ref="canvas" visible={this.props.visible}
                onTap={this.onTap.bind(this)} onSwipe={this.onSwipe.bind(this)} draw={this.draw.bind(this)} />
        );
    }
    redraw() {
        (this.refs['canvas'] as Canvas).redraw();
    }
    onTap(x, y) {
        this.swap();
        this.redraw();
    }
    onSwipe(dir, x, y) {
        if (dir == SwipeDir.Up)
            this.moveUp();
        else if (dir == SwipeDir.Down)
            this.moveDown();
        else if (dir == SwipeDir.Left)
            this.moveLeft();
        else if (dir == SwipeDir.Right)
            this.moveRight();
        
        this.redraw();
    }
    draw(ctx, width, height) {
        this.updateSizeAndRotation(ctx, width, height);
        if (this.rotated) {
            let tmp = height;
            height = width;
            width = tmp;
        }

        this.drawBackground(ctx, width, height);
        
        for (var y = 0; y < this.props.cellsTall; y++)
            for (var x = 0; x < this.props.cellsWide; x++) {
                var block = this.data.getBlock(x, y);
                if (block !== undefined)
                    block.draw(ctx, x, y, this.cellWidth, this.cellHeight, this.props.colors);
            }
        
        this.cursor.draw(ctx);
    }
    private updateSizeAndRotation(ctx, width, height) {
        this.rotated = width < height;

        if (this.rotated) {
            this.cellWidth = height / this.props.cellsWide;
            this.cellHeight = width * 0.95 / this.props.cellsTall;
            this.cursor.xscale = height / this.props.cellsWide;
            this.cursor.yscale = width * 0.95 / this.props.cellsTall;
        }
        else {
            this.cellWidth = width / this.props.cellsWide;
            this.cellHeight = height * 0.95 / this.props.cellsTall;
            this.cursor.xscale = width / this.props.cellsWide;
            this.cursor.yscale = height * 0.95 / this.props.cellsTall;
        }

        // if portrait, rotate everything
        if (this.rotated) {
            ctx.translate(width, 0);
            ctx.rotate(Math.PI / 2);
        }
    }
    private drawBackground(ctx, width, height) {
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.rect(0, 0, width, height * 0.95);
        ctx.fill();
        
        ctx.clearRect(0, height * 0.95, width, height * 0.05);
        
        // write column labels
        var size = Math.min(height * 0.04, width / 50);
        ctx.font = size + 'px Arial';
        ctx.fillStyle = '#cccccc';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(language.directionLeft + ': ' + this.data.getFillPercentage(0, 5) + ' %', width / 12, height);
        ctx.fillText(language.directionRight + ': ' + this.data.getFillPercentage(6, 11) + '%', width * 3 / 12, height);
        ctx.fillText(language.directionForward + ': ' + this.data.getFillPercentage(12, 17) + ' % ', width * 5 / 12, height);
        ctx.fillText(language.directionBackward + ': ' + this.data.getFillPercentage(18, 23) + '%', width * 7 / 12, height);
        ctx.fillText(language.directionUp + ': ' + this.data.getFillPercentage(24, 29) + '%', width * 9 / 12, height);
        ctx.fillText(language.directionDown + ': ' + this.data.getFillPercentage(30, 35) + '%', width * 11 / 12, height);
        
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var x=6; x<this.props.cellsWide; x+=6) {
            ctx.moveTo(x * this.cellWidth, 0);
            ctx.lineTo(x * this.cellWidth, height);
        }
        ctx.stroke();
    }
    keyDown(e) {
        if (e.which == 38)
            this.moveUp();
        else if (e.which == 40)
            this.moveDown();
        else if (e.which == 37)
            this.moveLeft();
        else if (e.which == 39)
            this.moveRight();
        else if (e.which == 32)
            this.swap();
        else
            return;
        
        this.redraw();
    }
    applyGravity() {
        this.data.applyGravity();
        this.redraw();
    }
    isVisible() { return this.props.visible; }
    private moveUp() {
        if (this.rotated)
            this.cursor.x = Math.max(this.cursor.x - 1, 0);
        else
            this.cursor.y = Math.max(this.cursor.y - 1, 0);
    }
    private moveDown() {
        if (this.rotated)
            this.cursor.x = Math.min(this.cursor.x + 1, this.props.cellsWide - 2);
        else
            this.cursor.y = Math.min(this.cursor.y + 1, this.props.cellsTall - 1);
    }
    private moveLeft() {
        if (this.rotated)
            this.cursor.y = Math.min(this.cursor.y + 1, this.props.cellsTall - 1);
        else
            this.cursor.x = Math.max(this.cursor.x - 1, 0);
    }
    private moveRight() {
        if (this.rotated)
            this.cursor.y = Math.max(this.cursor.y - 1, 0);
        else
            this.cursor.x = Math.min(this.cursor.x + 1, this.props.cellsWide - 2);
    }
    private swap() {
        var combo = this.data.swapValues(this.cursor.x, this.cursor.y);
        if (combo > 0)
            console.log('removed ' + combo + ' blocks');
    }
    setBlock(index, type, color) {
        var block = new ShieldBlock(color, type);
        block.falling = true;
        this.data.data[index] = block;
    }
    clearBlocks() {
        this.data.clear();
    }
}