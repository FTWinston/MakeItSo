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
            <Canvas ref="canvas" visible={this.props.visible}
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
    draw(ctx, width, height, time) {
        if (!this.props.visible)
            return;
        this.drawBackground(ctx, width, height);
        
        var minSize = Math.min(width, height) * 0.025;
        
        for (var target in this.state.targets)
            this.state.targets[target].draw(ctx, time, width, height, minSize);
        
        if (this.animateEndTime !== undefined)
            if (this.animateEndTime <= time)
                this.animateEndTime = undefined;
            else
                this.redraw();
    }
    drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
        let cx = width / 2, cy = height / 2;
        let minDimension = Math.min(width, height);

        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(cx, cy, minDimension / 2, 0, Math.PI * 2);
        ctx.fill();

        this.drawRing(ctx, '#990000', cx, cy, minDimension / 8);
        this.drawRing(ctx, '#996600', cx, cy, minDimension / 4);
        this.drawRing(ctx, '#009900', cx, cy, 3 * minDimension / 8);
        
        // draw ship indicator
        var shipRadius = minDimension * 0.015;
        ctx.fillStyle = '#cccccc';
        ctx.beginPath();
        ctx.arc(cx, cy, shipRadius, 0, Math.PI * 2);
        ctx.fill();
    }
    drawRing(ctx: CanvasRenderingContext2D, color: string, shipX: number, shipY: number, radius: number) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(shipX, shipY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
    addTarget(id: string, size: number, status: number, relPitch: number, relYaw: number, dist: number, pitch: number, yaw: number, roll: number) {
        if (size < 1 || size > 10) {
            console.error('invalid size');
            return false;
        }
        else if (status < 1 || status > TargetStatus.Unknown) {
            console.error('invalid status');
            return false;
        }
        else if (relPitch < -90 || relPitch >= 90) {
            console.error('invalid relative pitch');
            return false;
        }
        else if (relYaw < 0 || relYaw >= 360) {
            console.error('invalid relative yaw');
            return false;
        }
        else if (dist < 1 || dist > 100) {
            console.error('invalid dist');
            return false;
        }
        else if (pitch < -90 || pitch > 90) {
            console.error('invalid pitch');
            return false;
        }
        else if (yaw < 0 || yaw >= 360) {
            console.error('invalid yaw');
            return false;
        }
        else if (roll < -180 || roll > 180) {
            console.error('invalid roll');
            return false;
        }
        
        var target = new WeaponTarget(id, size, status, relPitch, relYaw, dist, pitch, yaw, roll)

        this.setState(function(previousState, currentProps) {
            var targets = previousState.targets;
            targets[id] = target;
            return {targets: targets};
        });

        this.redraw();
        return true;
    }
    removeTarget(id) {
        this.setState(function(previousState, currentProps) {
            var targets = previousState.targets;
            delete targets[id];
            return {targets: targets};
        });
        this.redraw();
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
    orientTarget(id, pitch, yaw, roll) {
        if (pitch < -180 || pitch > 180) {
            console.error('invalid pitch');
            return false;
        }
        else if (yaw < 0 || yaw >= 360) {
            console.error('invalid yaw');
            return false;
        }
        else if (roll < -180 || roll > 180) {
            console.error('invalid roll');
            return false;
        }

        var target = this.state.targets[id];
        if (target === undefined) {
            console.error('invalid target');
            return false;
        }

        target.updateOrientation(pitch, yaw, roll);
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
        this.redraw();
        return true;
    }
    clearAllTargets() {
        this.setState({ targets: {} });
        this.redraw();
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
        this.redraw();
    }
}