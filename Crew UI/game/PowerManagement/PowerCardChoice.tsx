interface IPowerCardChoiceProps {
    width?: number;
    height?: number;
    visible?: boolean;
}
    
class PowerCardChoice extends React.Component<IPowerCardChoiceProps, {}> {
    render() {
        return (
            <Canvas ref="canvas" width={this.props.width} height={this.props.height} draw={this.draw.bind(this)} visible={this.props.visible} />
        );
    }
    draw(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.rect(0, 0, width, height);
        ctx.fill();
    }
}