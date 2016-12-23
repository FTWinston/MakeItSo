interface IDamageControlProps extends ISystemProps {
    cellsTall?: number;
    cellsWide?: number;
    minSwipeDist?: number;
    maxTapDist?: number;
}

interface IDamageControlState {
    moveDir?: SwipeDir;
    stopped?: boolean;
}

class DamageControl extends React.Component<IDamageControlProps, IDamageControlState> implements ISystem {
    constructor(props) {
        super(props);
        this.state = { moveDir: SwipeDir.Right, stopped: true };
    }
    static defaultProps = {
        cellsTall: 36, cellsWide: 48, minSwipeDist: 20, maxTapDist: 10
    }
    componentDidMount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, this);
    }
    componentWillUnmount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, undefined);
    }

    private cellSize: number;
    private rotated: boolean;

    render() {
        return (
            <system style={{display: this.props.visible ? null : 'none'}}>
                <section className="toEdge fillMe">
                    <Canvas ref="canvas" visible={this.props.visible}
                        onTap={this.onTap.bind(this)} onSwipe={this.onSwipe.bind(this)} draw={this.draw.bind(this)} />        
                </section>
            </system>
        );
    }
    redraw() {
        (this.refs['canvas'] as Canvas).redraw();
    }
    draw(ctx, width, height) {
        this.updateSizeAndRotation(ctx, width, height);
        if (this.rotated) {
            let tmp = height;
            height = width;
            width = tmp;
        }
        
        let innerWidth = this.props.cellsWide * this.cellSize, innerHeight = this.props.cellsTall * this.cellSize;
        let innerX = (width - innerWidth) / 2, innerY = (height - innerHeight) / 2;
        this.drawBackground(ctx, width, height, innerWidth, innerHeight, innerX, innerY);

        /*
        for (var y = 0; y < this.props.cellsTall; y++)
            for (var x = 0; x < this.props.cellsWide; x++) {
                var block = this.data.getBlock(x, y);
                if (block !== undefined)
                    block.draw(ctx, x, y, this.cellSize, this.cellSize, this.props.colors);
            }
        
        this.cursor.draw(ctx);
        */
    }
    private drawBackground(ctx, width, height, innerWidth, innerHeight, innerX, innerY) {
        ctx.clearRect(0, 0, width, height);        

        ctx.fillStyle = '#333333';
        ctx.beginPath();
        ctx.rect(innerX, innerY, innerWidth, innerHeight);
        ctx.fill();

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();

        let innerXEnd = innerX + innerWidth, innerYEnd = innerY + innerHeight;

        for (let x=1; x<this.props.cellsWide; x++) {
            ctx.moveTo(innerX + x * this.cellSize, innerY);
            ctx.lineTo(innerX + x * this.cellSize, innerYEnd);
        }
        for (let y=1; y<this.props.cellsTall; y++) {
            ctx.moveTo(innerX, innerY + y * this.cellSize);
            ctx.lineTo(innerXEnd, innerY + y * this.cellSize);
        }
        ctx.stroke();

        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(innerX, innerY, innerWidth, innerHeight);
        ctx.stroke();
    }
    private updateSizeAndRotation(ctx, width, height) {
        this.rotated = width < height;

        if (this.rotated)
            this.cellSize = Math.min(height * 0.98 / this.props.cellsWide, width / this.props.cellsTall);
        else
            this.cellSize = Math.min(width / this.props.cellsWide, height * 0.98 / this.props.cellsTall);

        // if portrait, rotate everything
        if (this.rotated) {
            ctx.translate(width, 0);
            ctx.rotate(Math.PI / 2);
        }
    }
    receiveMessage(msg, data) {
        return false;
    }
    clearAllData() {
        this.setState({ moveDir: SwipeDir.Right, stopped: true });
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
            this.toggleMovement();
    }
    onTap(x, y) {
        this.toggleMovement();
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
    }
    private moveUp() {
        this.setMoveDir(this.rotated ? SwipeDir.Left : SwipeDir.Up);
    }
    private moveDown() {
        this.setMoveDir(this.rotated ? SwipeDir.Right : SwipeDir.Down);
    }
    private moveLeft() {
        this.setMoveDir(this.rotated ? SwipeDir.Down : SwipeDir.Left);
    }
    private moveRight() {
        this.setMoveDir(this.rotated ? SwipeDir.Up : SwipeDir.Right);
    }
    private toggleMovement() {
        let stop = !this.state.stopped;
        this.setState({ stopped: stop });
        gameClient.server.send(stop ? 'dctoggle 0' : 'dctoggle 1');
    }
    private setMoveDir(dir: SwipeDir) {
        this.setState({ moveDir: dir});
        
        switch (dir) {
            case SwipeDir.Up:
                gameClient.server.send('dcdir 0'); break;
            case SwipeDir.Down:
                gameClient.server.send('dcdir 1'); break;
            case SwipeDir.Left:
                gameClient.server.send('dcdir 2'); break;
            case SwipeDir.Right:
                gameClient.server.send('dcdir 3'); break;
        }
    }
}