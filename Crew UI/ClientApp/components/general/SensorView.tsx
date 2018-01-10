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
    private touch: TouchArea;

    constructor(props: SensorViewProps) {
        super(props);

        this.state = {
            center: props.targets.length > 0 ? props.targets[0].position : new Vector3(0, 0, 0),
            zoom: 1,
        };
    }

    shouldComponentUpdate(nextProps: SensorViewProps, nextState: SensorViewState) {
        setTimeout(() => this.touch.redraw(), 0); // wait til state/props actually change
        return this.props.className !== nextProps.className;
    }

    render() {
        return <TouchArea
            className={this.props.className}
            draw={(ctx, w, h) => this.drawSensors(ctx, w, h)}
            setupTouch={a => this.setupTouch(a)}
            ref={t => { if (t !== null) { this.touch = t }}}
        />;
    }

    private drawSensors(ctx: CanvasRenderingContext2D, width: number, height: number) {
        let halfWidth = width / 2, halfHeight = height / 2;
        ctx.clearRect(0, 0, width, height);

        ctx.save();
        ctx.translate(halfWidth, halfHeight);
        ctx.scale(this.state.zoom, this.state.zoom);
        ctx.translate(-this.state.center.x, -this.state.center.y);

        let minX = this.state.center.x - halfWidth / this.state.zoom;
        let minY = this.state.center.y - halfHeight / this.state.zoom;
        let maxX = minX + width / this.state.zoom, maxY = minY + height / this.state.zoom;

        this.drawBackground(ctx, minX, minY, maxX, maxY);

        for (let target of this.props.targets) {
            if (target.isOnScreen(minX, minY, maxX, maxY)) {
                target.draw(ctx);
            }
        }

        ctx.restore();
    }

    private drawBackground(ctx: CanvasRenderingContext2D, minX: number, minY: number, maxX: number, maxY: number) {
        const gridSize = 50;
        let firstLineX = Math.floor(minX / gridSize) * gridSize;
        let firstLineY = Math.floor(minY / gridSize) * gridSize;

        ctx.lineWidth = 1 / this.state.zoom; // 1 pixel despite zoom
        ctx.strokeStyle = 'rgba(255,255,255,24)';
        ctx.beginPath();

        for (let x = firstLineX; x <= maxX; x += gridSize) {
            ctx.moveTo(x, minY);
            ctx.lineTo(x, maxY);
        }

        for (let y = firstLineY; y <= maxY; y += gridSize) {
            ctx.moveTo(minX, y);
            ctx.lineTo(maxX, y);
        }

        ctx.stroke();
    }

    private setupTouch(area: TouchArea) {
        // 2-finger panning for multitouch
        let pan = area.createPan2D('pan', 2, 1, false, (dx, dy) => this.pan(-dx, -dy));
        
        // right-mouse panning for where multitouch isn't an option
        let rightMouseDown = false;
        area.element.addEventListener('mousedown', ev => { if (ev.button !== 0) { rightMouseDown = true; } });
        area.element.addEventListener('mouseup', ev => { if (ev.button !== 0) { rightMouseDown = false; } });
        area.element.addEventListener('mouseout', () => rightMouseDown = false);
        area.element.addEventListener('mousemove', ev => { if (rightMouseDown) { this.pan(-ev.movementX, -ev.movementY); } });

        // pinch zooming
        let prevScale = 1;
        let zoom = area.createPinch('zoom', 0.1, scale => {
            let touchZoomScale = scale / prevScale;
            if (touchZoomScale > 0.9 && touchZoomScale < 1.1) {
                return;
            }

            prevScale = scale;
            this.zoom(touchZoomScale);
        }, () => prevScale = 1);

        pan.requireFailure(zoom);
        zoom.requireFailure(pan);

        // mouse wheel zooming
        area.element.addEventListener('wheel', ev => {
            if (ev.deltaY == 0) {
                return;
            }
            ev.preventDefault();
            this.zoom(ev.deltaY < 0 ? 1.1 : 0.9);
        });
    }

    private pan(dx: number, dy: number) {
        dx /= this.state.zoom;
        dy /= this.state.zoom;

        this.setState(state => { return {
            center: new Vector3(state.center.x + dx, state.center.y + dy, state.center.z),
        }});
    }

    private zoom(scale: number) {
        this.setState(state => { return {
            zoom: state.zoom * scale,
        }});
    }
}