interface IDamageControlProps extends ISystemProps {
    cellsTall?: number;
    cellsWide?: number;
    minSwipeDist?: number;
    maxTapDist?: number;
}

interface IDamageControlState {
    stopped?: boolean;
    cells?: number[];
}

const enum DamageCellType {
    Empty = 0,
    Wall,
    SnakeBodyLR,
    SnakeBodyUD,
    SnakeBodyUR,
    SnakeBodyDR,
    SnakeBodyDL,
    SnakeBodyUL,
    SnakeHead,
    Apple,
    Damage1,
    Damage2,
    Damage3,
}

class DamageControl extends React.Component<IDamageControlProps, IDamageControlState> implements ISystem {
    constructor(props) {
        super(props);
        this.state = { stopped: true, cells: new Array<number>(props.cellsTall * props.cellsWide) };
    }
    static defaultProps = {
        cellsTall: 36, cellsWide: 48, minSwipeDist: 20, maxTapDist: 10
    }
    componentDidMount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, this);

        Hotkeys.register(37, this);
        Hotkeys.register(38, this);
        Hotkeys.register(39, this);
        Hotkeys.register(40, this);
        Hotkeys.register(' ', this);
    }
    componentWillUnmount() {
        if (this.props.registerCallback != null)
            this.props.registerCallback(this.props.index, undefined);
    }
    isVisible() { return this.props.visible; }

    private cellSize: number;
    private inset: number;
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
        
        for (let x = 0; x < this.props.cellsWide; x++)
            for (let y = 0; y < this.props.cellsTall; y++) {
                let value = this.state.cells[y * this.props.cellsWide + x];
                if (value == DamageCellType.Empty)
                    continue;
            
                let drawX = innerX + this.cellSize * x, drawY = innerY + this.cellSize * y;

                switch (value) {
                    case DamageCellType.Wall:
                        ctx.fillStyle = '#a0a0a0'; break;
                    case DamageCellType.SnakeBodyLR:
                        ctx.fillStyle = '#009900';
                        ctx.fillRect(drawX, drawY + this.inset, this.cellSize, this.cellSize - 2 * this.inset);
                        continue;
                    case DamageCellType.SnakeBodyUD:
                        ctx.fillStyle = '#009900';
                        ctx.fillRect(drawX + this.inset, drawY, this.cellSize - 2 * this.inset, this.cellSize);
                        continue;
                    case DamageCellType.SnakeBodyUL:
                        ctx.fillStyle = '#009900';
                        ctx.fillRect(drawX, drawY + this.inset, this.cellSize - this.inset, this.cellSize - 2 * this.inset);
                        ctx.fillRect(drawX + this.inset, drawY, this.cellSize - 2 * this.inset, this.inset);
                        continue;
                    case DamageCellType.SnakeBodyUR:
                        ctx.fillStyle = '#009900';
                        ctx.fillRect(drawX + this.inset, drawY + this.inset, this.cellSize - this.inset, this.cellSize - 2 * this.inset);
                        ctx.fillRect(drawX + this.inset, drawY, this.cellSize - 2 * this.inset, this.inset);
                        continue;
                    case DamageCellType.SnakeBodyDL:
                        ctx.fillStyle = '#009900';
                        ctx.fillRect(drawX, drawY + this.inset, this.cellSize - this.inset, this.cellSize - 2 * this.inset);
                        ctx.fillRect(drawX + this.inset, drawY + this.cellSize - this.inset, this.cellSize - 2 * this.inset, this.inset);
                        continue;
                    case DamageCellType.SnakeBodyDR:
                        ctx.fillStyle = '#009900';
                        ctx.fillRect(drawX + this.inset, drawY + this.inset, this.cellSize - this.inset, this.cellSize - 2 * this.inset);
                        ctx.fillRect(drawX + this.inset, drawY + this.cellSize - this.inset, this.cellSize - 2 * this.inset, this.inset);
                        continue;
                    case DamageCellType.SnakeHead:
                        ctx.fillStyle = '#00cc00'; break;
                    case DamageCellType.Apple:
                        ctx.fillStyle = '#00cccc'; break;
                    case DamageCellType.Damage1:
                        ctx.fillStyle = '#cc0000'; break;
                    case DamageCellType.Damage2:
                        ctx.fillStyle = '#ff9900'; break;
                    case DamageCellType.Damage3:
                        ctx.fillStyle = '#ffff66'; break;
                    default:
                        continue;
                }

                ctx.fillRect(drawX, drawY, this.cellSize, this.cellSize);
            }
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
        this.inset = this.cellSize * 0.2;

        // if portrait, rotate everything
        if (this.rotated) {
            ctx.translate(width, 0);
            ctx.rotate(Math.PI / 2);
        }
    }
    receiveMessage(msg, data) {
        let a = 'a'.charCodeAt(0);
        switch (msg) {
            case "dmggrid":
                let cells: number[] = [];
                for (let i = 0; i < data.length; i++) {
                    let val = data.charCodeAt(i) - a;
                    cells.push(val);
                }
                this.setState({ cells: cells });
                this.redraw();
                return true;
            case "dmgcell":
                let changes = data.split(' ');
                let newCells = this.state.cells.slice();
                
                for (let i=0; i<changes.length; i++) {
                    let values = changes[i].split(':');
                    if (values.length != 2) {
                        console.error(language.errorParameterNumber.replace('@num@', '2'));
                        return false;
                    }
                    let cell = parseInt(values[0]), value = values[1].charCodeAt(0) - a;
                    if (isNaN(cell) || isNaN(cell)) {
                        console.error(language.errorParameterNotNumeric);
                        return false;
                    }

                    newCells[cell] = value;
                }

                this.setState({ cells: newCells });
                this.redraw();
                return true;
            default:
                return false;
        }
    }
    clearAllData() {
        this.setState({ stopped: true });
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
        switch (dir) {
            case SwipeDir.Up:
                gameClient.server.send('dcdir 1'); break;
            case SwipeDir.Down:
                gameClient.server.send('dcdir 2'); break;
            case SwipeDir.Left:
                gameClient.server.send('dcdir 3'); break;
            case SwipeDir.Right:
                gameClient.server.send('dcdir 4'); break;
        }
    }
}