interface IWeaponTargetSelectProps {
    width?: number;
    height?: number;
    visible?: boolean;
    targetSelected?: (target: WeaponTarget) => void;
}

interface IWeaponTargetSelectState {
    targets?: Object;
}

class WeaponTargetSelect extends React.Component<IWeaponTargetSelectProps, IWeaponTargetSelectState> {
    constructor(props) {
        super(props);
        this.state = { targets: {} };
    }
    animateEndTime: number;
    render() {
        return (
            <Canvas ref="canvas" width={this.props.width} height={this.props.height} visible={this.props.visible}
                onTap={this.onTap.bind(this)} onMouseDown={this.onMouseDown.bind(this)} draw={this.draw.bind(this)} />
        );
    }
    redraw() {
        (this.refs['canvas'] as Canvas).redraw();
    }
    onTap(x, y) {
        this.trySelectTarget(x, y, true);
    }
    onMouseDown(btn, x, y) {
        if (btn != 1)
            return;
        
        this.trySelectTarget(x, y, false);
    }
    draw(ctx, time) {
        if (!this.props.visible)
            return;
        this.drawBackground(ctx);
        
        var minSize = Math.min(this.props.width, this.props.height) * 0.025;
        
        for (var target in this.state.targets)
            this.state.targets[target].draw(ctx, time, this.props.width, this.props.height, minSize);
        
        if (this.animateEndTime !== undefined)
            if (this.animateEndTime <= time)
                this.animateEndTime = undefined;
            else
                this.redraw();
    }
    drawBackground(ctx) {
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.rect(0, 0, this.props.width, this.props.height);
        ctx.fill();
        
        // draw firing arc indicators
        var shipX = this.props.width / 2, shipY = this.props.height * 0.67;
        ctx.lineWidth = 1;
        this.drawFiringArc(ctx, '#990000', shipX, shipY, 0, 0.57735026919); // tan 30, for 120 degree arc
        this.drawFiringArc(ctx, '#996600', shipX, shipY, 0, 1); // tan 45, for 90 degree arc
        this.drawFiringArc(ctx, '#009900', shipX, shipY, 0, 1.73205080757); // tan 60, for 60 degree arc
        
        this.drawFiringArc(ctx, '#990000', shipX, shipY, this.props.height, 1.73205080757); // tan 60, for 60 degree arc
        
        // draw ship indicator
        var shipRadius = Math.min(this.props.width * 0.025, this.props.height * 0.025);
        ctx.fillStyle = '#cccccc';
        ctx.beginPath();
        ctx.arc(shipX, shipY, shipRadius, 0, Math.PI * 2);
        ctx.fill();
    }
    drawFiringArc(ctx, color, shipX, shipY, endY, tanAngle) {
        ctx.strokeStyle = color;
        var dx = Math.abs(shipY - endY) / tanAngle;
        
        ctx.beginPath();
        ctx.moveTo(shipX - dx, endY);
        ctx.lineTo(shipX, shipY);
        ctx.lineTo(shipX + dx, endY);
        ctx.stroke();
    }
    addTarget(id, size, status, angle, dist) {
        if (size < 1 || size > 10) {
            console.error('invalid size');
            return false;
        }
        else if (status < 1 || status > TargetStatus.Unknown) {
            console.error('invalid status');
            return false;
        }
        else if (angle < 0 || angle >= 360) {
            console.error('invalid angle');
            return false;
        }
        else if (dist < 1 || dist > 100) {
            console.error('invalid dist');
            return false;
        }
        
        var target = new WeaponTarget(id, size, status, angle, dist)

        this.setState(function(previousState, currentProps) {
            var targets = previousState.targets;
            targets[id] = target;
            return {targets: targets};
        });
        return true;
    }
    removeTarget(id) {
        this.setState(function(previousState, currentProps) {
            var targets = previousState.targets;
            delete targets[id];
            return {targets: targets};
        });
        return true;
    }
    moveTarget(id, angle, dist) {
        if (angle < 0 || angle >= 360) {
            console.error('invalid angle');
            return false;
        }
        else if (dist < 1 || dist > 100) {
            console.error('invalid dist');
            return false;
        }
        
        var target = this.state.targets[id];
        if (target === undefined) {
            console.error('invalid target');
            return false;
        }
        
        target.updatePosition(angle, dist);
        this.animateEndTime = performance.now() + WeaponTarget.lerpDuration;
        
        this.setState(function(previousState, currentProps) {
            var targets = previousState.targets;
            targets[id] = target;
            return {targets: targets};
        });
        this.redraw();
        return true;
    }
    changeTarget(id, status) {
        if (status < 1 || status > TargetStatus.Unknown) {
            console.error('invalid status');
            return false;
        }
        
        var target = this.state.targets[id];
        if (target === undefined) {
            console.error('invalid target');
            return false;
        }
        
        target.status = status;
        
        this.setState(function(previousState, currentProps) {
            var targets = previousState.targets;
            targets[id] = target;
            return {targets: targets};
        });
        return true;
    }
    clearAllTargets() {
        this.setState({targets: {}});
    }
    private trySelectTarget(x,y, padRadius) {
        var selected = null;
        
        var targets = this.state.targets;
        
        for (var id in targets) {
            var target = targets[id];
            target.selected = false;
            
            if (selected == null && target.intersects(x, y, false))
                selected = target;
        }
            
        if (selected == null && padRadius) {
            for (var id in targets) {
                var target = this.state.targets[id];
                if (target.intersects(x, y, true)) {
                    selected = target;
                    break;
                }            
            }
        }
        
        if (selected != null)
            selected.selected = true;
        
        this.setState({targets: targets});
        this.props.targetSelected(selected);
    }
}