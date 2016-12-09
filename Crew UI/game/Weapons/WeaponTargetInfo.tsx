interface IWeaponTargetInfoProps {
    width: number;
    height: number;
    visible: boolean;
    target?: WeaponTarget;
}

interface IWeaponTargetInfoState {
    pressedSegment: number;
}

class WeaponTargetInfo extends React.Component<IWeaponTargetInfoProps, IWeaponTargetInfoState> {
    constructor(props) {
        super(props);
        this.state = {pressedSegment: null};
    }
    render() {
        return (
            /*
            <Canvas ref="canvas" width={this.props.width} height={this.props.height} visible={this.props.visible}
                onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}
                onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)} draw={this.draw.bind(this)} />
            */
            <div />
        );
    }
    redraw() {
        (this.refs['canvas'] as Canvas).redraw();
    }
    onTouchStart (x, y) {
        this.checkClick(x, y);
    }
    onTouchEnd (x, y) {
        this.setState({pressedSegment: null});
    }
    onMouseDown(btn, x, y) {
        if (btn != 1)
            return;
        this.checkClick(x, y);
    }
    onMouseUp(btn, x, y) {
        if (btn != 1)
            return;
        this.setState({pressedSegment: null});
    }
    draw(ctx, width, height) {
        ctx.clearRect(0, 0, width, height);
        
        if (this.props.target != null)
            this.drawTarget(ctx, width, height);
    }
    drawTarget(ctx, width, height) {
        var numSegments = this.props.target.size + 1, segmentSize = Math.PI * 2 / numSegments, startAngle = 0;
        var cx = width / 2, cy = height / 2
        var outerRadius = Math.min(cx, cy) * 0.99, innerRadius = outerRadius * 0.3, symbolRadius = (outerRadius + innerRadius) / 2;
        var colors = ['#ff0000', '#00ccff', '#00cc00', '#cccc00', '#cc00ff', '#ccff00', '#ff00cc', '#ffcccc', '#ccffcc', '#ccccff', '#cccccc'];
        var labels = ['α', 'β', 'γ', 'δ', 'ε', 'θ', 'λ', 'μ', 'π', 'ψ', 'ω'];
        
        ctx.lineWidth = innerRadius * 0.05;
        
        var size = (height * 0.05);
        ctx.font = size + 'px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        for (var i=0; i<numSegments; i++) {
            if (this.state.pressedSegment == i) {
                var gradient = ctx.createRadialGradient(cx, cy, innerRadius, cx, cy, outerRadius);
                gradient.addColorStop(0.2, 'white');
                gradient.addColorStop(1, colors[i]);
                ctx.fillStyle = gradient;
            }
            else
                ctx.fillStyle = colors[i];
            ctx.beginPath();
            
            ctx.moveTo(
                cx + Math.cos(startAngle) * outerRadius,
                cy + Math.sin(startAngle) * outerRadius
            )
            
            var endAngle = startAngle + segmentSize, midAngle = (startAngle + endAngle) / 2;
            
            ctx.lineTo(
                cx + Math.cos(midAngle) * outerRadius,
                cy + Math.sin(midAngle) * outerRadius
            );
            
            ctx.lineTo(
                cx + Math.cos(endAngle) * outerRadius,
                cy + Math.sin(endAngle) * outerRadius
            );
            
            ctx.lineTo(
                cx + Math.cos(endAngle) * innerRadius,
                cy + Math.sin(endAngle) * innerRadius
            );

            ctx.arc(cx, cy, innerRadius, endAngle, startAngle, true);
            
            ctx.lineTo(
                cx + Math.cos(startAngle) * outerRadius,
                cy + Math.sin(startAngle) * outerRadius
            );
            
            ctx.fill();
            
            ctx.fillStyle = 'black';
            ctx.fillText(labels[i],
                cx + Math.cos(midAngle) * symbolRadius,
                cy + Math.sin(midAngle) * symbolRadius
            );
            
            startAngle = endAngle;
        }

        // draw target identifier
        var size = (height * 0.05);
        ctx.font = size + 'px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(this.props.target.id, size * 0.15, 0);
        
        // draw "fire"
        var size = (height * 0.1);
        ctx.font = size + 'px Arial';
        ctx.fillStyle = this.state.pressedSegment == -1 ? 'red' : 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('fire', cx, cy);
    }
    private checkClick(x, y) {
        var cx = this.props.width / 2, cy = this.props.height / 2;
        var outerRadius = Math.min(cx, cy) * 0.99, innerRadius = outerRadius * 0.3;
        
        var dist = Math.sqrt((cx - x)*(cx - x) + (cy - y)*(cy - y));
        if (dist > outerRadius)
            return;
        if (dist < innerRadius) {
            this.firePressed();
            return;
        }
        
        var numSegments = this.props.target.size + 1, segmentSize = Math.PI * 2 / numSegments;
        var angle = Math.atan2(y - cy, x - cx);
        if (angle < 0)
            angle += Math.PI * 2;
        
        var segment = Math.floor(angle / segmentSize);
        this.segmentPressed(segment);
    }
    private firePressed() {
        this.setState({pressedSegment: -1});
        this.queueClearHighlight();
    }
    private segmentPressed(segment) {
        this.setState({pressedSegment: segment});
        this.queueClearHighlight();
    }
    highlightTimer: number;
    private queueClearHighlight() {
        if (this.highlightTimer != null)
            clearTimeout(this.highlightTimer);
        
        var self = this;
        this.highlightTimer = setTimeout(function () { self.setState({pressedSegment: null}) }, 600);
    }
}