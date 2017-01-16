interface IWeaponDiceProps {
    value: number;
    locked: boolean;
    toggle: () => void;
}

class WeaponDice extends React.Component<IWeaponDiceProps, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Canvas ref="canvas" draw={this.draw.bind(this)}
                onTap={this.onTap.bind(this)} onMouseDown={this.onMouseDown.bind(this)} />
        );
    }
    redraw() {
        (this.refs['canvas'] as Canvas).redraw();
    }
    componentDidUpdate() {
        this.redraw();
    }
    draw(ctx, width, height) {
        ctx.fillStyle = '#ccc';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = this.props.locked ? '#d00' : '#000';
        let dotSize = Math.min(width, height) * 0.1;

        switch (this.props.value) {
            case 1:
                this.drawDot(ctx, 0.50 * width, 0.50 * height, dotSize);
                break;
            case 2:
                this.drawDot(ctx, 0.25 * width, 0.25 * height, dotSize);
                this.drawDot(ctx, 0.75 * width, 0.75 * height, dotSize);
                break;
            case 3:
                this.drawDot(ctx, 0.25 * width, 0.75 * height, dotSize);
                this.drawDot(ctx, 0.50 * width, 0.50 * height, dotSize);
                this.drawDot(ctx, 0.75 * width, 0.25 * height, dotSize);
                break;
            case 4:
                this.drawDot(ctx, 0.25 * width, 0.25 * height, dotSize);
                this.drawDot(ctx, 0.25 * width, 0.75 * height, dotSize);
                this.drawDot(ctx, 0.75 * width, 0.25 * height, dotSize);
                this.drawDot(ctx, 0.75 * width, 0.75 * height, dotSize);
                break;
            case 5:
                this.drawDot(ctx, 0.25 * width, 0.25 * height, dotSize);
                this.drawDot(ctx, 0.25 * width, 0.75 * height, dotSize);
                this.drawDot(ctx, 0.50 * width, 0.50 * height, dotSize);
                this.drawDot(ctx, 0.75 * width, 0.25 * height, dotSize);
                this.drawDot(ctx, 0.75 * width, 0.75 * height, dotSize);
                break;
            case 6:
                this.drawDot(ctx, 0.25 * width, 0.25 * height, dotSize);
                this.drawDot(ctx, 0.25 * width, 0.75 * height, dotSize);
                this.drawDot(ctx, 0.25 * width, 0.50 * height, dotSize);
                this.drawDot(ctx, 0.75 * width, 0.50 * height, dotSize);
                this.drawDot(ctx, 0.75 * width, 0.25 * height, dotSize);
                this.drawDot(ctx, 0.75 * width, 0.75 * height, dotSize);
                break;
        }
    }
    private drawDot(ctx, x, y, size) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    private onTap(x, y) {
        this.props.toggle();
    }
    private onMouseDown(btn, x, y) {
        if (btn != 1)
            return;

        this.props.toggle();
    }
}