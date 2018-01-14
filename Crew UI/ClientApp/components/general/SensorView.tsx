import * as React from 'react';
import { TouchArea } from './TouchArea';
import { drawFunc } from './Canvas';
import { CanvasBounds3D, Matrix, SensorTarget, Vector2, Vector3 } from '../../functionality';
import * as Hammer from 'hammerjs';

interface SensorViewProps {
    className?: string;
    targets: SensorTarget[];
}

interface SensorViewState {
    center: Vector3;
    zoom: number;
    xRotation: number;
    yRotation: number;
    zRotation: number;
}

export class SensorView extends React.PureComponent<SensorViewProps, SensorViewState> {
    private touch: TouchArea;
    private viewTransform: Matrix;

    constructor(props: SensorViewProps) {
        super(props);

        this.state = {
            center: props.targets.length > 0 ? props.targets[0].position : new Vector3(0, 0, 0),
            zoom: 1,
            xRotation: 6 * Math.PI / 16,
            yRotation: 0,
            zRotation: Math.PI / 8,
        };

        this.updateTransform();
    }

    shouldComponentUpdate(nextProps: SensorViewProps, nextState: SensorViewState) {
        if (this.state.xRotation !== nextState.xRotation
         || this.state.yRotation !== nextState.yRotation
         || this.state.zRotation !== nextState.zRotation) {
            this.updateTransform();
        }

        if (this.props.className !== nextProps.className) {
            return true;
        }

        setTimeout(() => this.touch.redraw(), 0); // wait til state/props actually change
        return false;
    }

    componentDidUpdate() {
        this.touch.redraw();
    }

    render() {
        return <TouchArea
            className={this.props.className}
            draw={(ctx, w, h) => this.drawSensors(ctx, w, h)}
            setupTouch={a => this.setupTouch(a)}
            ref={t => { if (t !== null) { this.touch = t }}}
        />;
    }

    private updateTransform() {
        //console.log(`transform ${this.state.xRotation / Math.PI}, ${this.state.yRotation / Math.PI}, ${this.state.zRotation / Math.PI}`);
        this.viewTransform = Matrix.yRotation(this.state.yRotation)
               .multiply(Matrix.xRotation(this.state.xRotation))
               .multiply(Matrix.zRotation(this.state.zRotation))
    }

    private drawSensors(ctx: CanvasRenderingContext2D, width: number, height: number) {
        let halfWidth = width / 2, halfHeight = height / 2;
        ctx.clearRect(0, 0, width, height);

        ctx.save();
        ctx.translate(halfWidth, halfHeight);
        ctx.scale(this.state.zoom, this.state.zoom);
        ctx.translate(-this.state.center.x, -this.state.center.y);

        let display: CanvasBounds3D = {
            minX: this.state.center.x - halfWidth,
            minY: this.state.center.y - halfHeight,
            maxX: this.state.center.x + halfWidth,
            maxY: this.state.center.y + halfHeight,
            onePixel: 1 / this.state.zoom, // 1 pixel despite zoom
            transform: world => {
                let transformed = this.viewTransform.multiplyVector(world);
                // TODO: should use Z here for sort order?
                return new Vector2(transformed.x, transformed.y);
            },
        };

        let minZ = Number.MAX_VALUE;
        for (let target of this.props.targets) {
            minZ = Math.min(minZ, target.position.z);
        }
        if (minZ === Number.MAX_VALUE) {
            minZ = 0;
        }
        minZ -= 5;

        this.drawBackground(ctx, display, minZ);

        for (let target of this.props.targets) {
            target.draw(ctx, display, minZ);
        }

        ctx.restore();
    }

    private drawBackground(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, gridZ: number) {
        const gridSize = 50;
        let firstLineX = Math.floor(display.minX / gridSize) * gridSize;
        let firstLineY = Math.floor(display.minY / gridSize) * gridSize;

        ctx.globalAlpha = 0.2;
        ctx.lineWidth = display.onePixel;
        ctx.strokeStyle = '#fff';
        ctx.beginPath();

        let worldPos = new Vector3(0, 0, gridZ);
        let screenPos: Vector2;

        // TODO: bounds shouldn't directly come from screen size

        for (let x = firstLineX; x <= display.maxX; x += gridSize) {
            worldPos.x = x;
            
            worldPos.y = display.minY;
            screenPos = display.transform(worldPos);
            ctx.moveTo(screenPos.x, screenPos.y);
            
            worldPos.y = display.maxY;
            screenPos = display.transform(worldPos);
            ctx.lineTo(screenPos.x, screenPos.y);
        }

        for (let y = firstLineY; y <= display.maxY; y += gridSize) {
            worldPos.y = y;
            
            worldPos.x = display.minX;
            screenPos = display.transform(worldPos);
            ctx.moveTo(screenPos.x, screenPos.y);
            
            worldPos.x = display.maxX;
            screenPos = display.transform(worldPos);
            ctx.lineTo(screenPos.x, screenPos.y);
        }

        ctx.stroke();
        ctx.globalAlpha = 1;
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

        area.createPress('tempRotate', 250, () => this.setState({ zRotation: this.state.zRotation + Math.PI / 32 }));
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