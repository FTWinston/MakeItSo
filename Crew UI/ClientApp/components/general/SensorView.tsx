import * as React from 'react';
import { TouchArea } from './TouchArea';
import { drawFunc } from './Canvas';
import { SensorTarget, Vector3 } from '../../functionality';
import * as Hammer from 'hammerjs';

interface SensorViewProps {
    className?: string;
    targets: SensorTarget[];
}

interface SensorViewState {
    center: Vector3;
    zoom: number;
}

export class SensorView extends React.PureComponent<SensorViewProps, SensorViewState> {
    constructor(props: SensorViewProps) {
        super(props);

        this.state = {
            center: props.targets.length > 0 ? props.targets[0].position : new Vector3(0, 0, 0),
            zoom: 1,
        };
    }

    render() {
        return <TouchArea className={this.props.className} draw={(ctx, w, h) => this.drawSensors(ctx, w, h)} setupTouch={a => this.setupTouch(a)} />;
    }

    private drawSensors(ctx: CanvasRenderingContext2D, width: number, height: number) {
        ctx.clearRect(0, 0, width, height);

        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.scale(this.state.zoom, this.state.zoom);
        ctx.translate(this.state.center.x, this.state.center.y);

        this.drawBackground(ctx, width, height);

        for (let target of this.props.targets) {
            if (target.isOnScreen(this.state.center.x, this.state.center.y, width, height))
                target.draw(ctx);
        }

        ctx.restore();
    }

    private drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
        const gridSize = 25;

        let halfWidth = width / 2, halfHeight = height / 2;
        let startX = -Math.floor(halfWidth / gridSize) * gridSize;
        let startY = -Math.floor(halfHeight / gridSize) * gridSize;

        ctx.lineWidth = 1 / this.state.zoom; // 1 pixel despite zoom
        ctx.strokeStyle = 'rgba(255,255,255,48)';
        ctx.beginPath();

        for (let x = startX; x <= halfWidth; x += gridSize) {
            ctx.moveTo(x, -halfHeight);
            ctx.lineTo(x,  halfHeight);
        }

        for (let y = startY; y <= halfHeight; y += gridSize) {
            ctx.moveTo(-halfWidth, y);
            ctx.lineTo( halfWidth, y);
        }

        ctx.stroke();
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