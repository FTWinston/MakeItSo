import * as React from 'react';
import { TouchArea } from './TouchArea';
import { drawFunc } from './Canvas';
import { SensorTarget, Vector3 } from '../../functionality';
import * as Hammer from 'hammerjs';

interface SensorViewProps {
    targets: SensorTarget[];
}

interface SensorViewState {
    center: Vector3;
    zoom: number;
}

class SensorView extends React.Component<SensorViewProps, SensorViewState> {
    constructor(props: SensorViewProps) {
        super(props);

        this.state = {
            center: props.targets.length > 0 ? props.targets[0].position : new Vector3(0, 0, 0),
            zoom: 1,
        };
    }

    render() {
        return <TouchArea draw={(ctx, w, h) => this.drawSensors(ctx, w, h)} setupTouch={(a) => this.setupTouch(a)} />;
    }

    private drawSensors(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.clearRect(0, 0, width, height);

        ctx.save();
        ctx.scale(this.state.zoom, this.state.zoom);
        ctx.translate(-this.state.center.x, -this.state.center.y);

        for (let target of this.props.targets) {
            if (target.isOnScreen(this.state.center.x, this.state.center.y, width, height))
                target.draw(ctx);
        }

        ctx.restore();
    }

    private setupTouch(area: TouchArea) {
        area.createPan2D('view', 2, 1, (dx, dy) => this.pan(dx, dy));
    }

    private pan(dx: number, dy: number) {
        this.setState(state => { return {
            center: new Vector3(state.center.x + dx, state.center.y + dy, state.center.z),
        }});
    }
}