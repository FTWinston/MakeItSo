import * as React from 'react';
import { TouchArea } from './TouchArea';
import { CanvasBounds3D, Matrix, SensorTarget, Vector2, Vector3 } from '~/functionality';

interface SensorViewProps {
    className?: string;
    targets: SensorTarget[];
    autoRotate?: boolean;
}

interface SensorViewState {
    center: Vector3;
    zoom: number;
    xRotation: number;
    yRotation: number;
    zRotation: number;
}

interface TargetDrawInfo {
    target: SensorTarget;
    screenPos: Vector2;
    zDepth: number;
}

export class SensorView extends React.PureComponent<SensorViewProps, SensorViewState> {
    static defaultProps = {
        autoRotate: true,
    };

    private touch: TouchArea;
    private viewTransform: Matrix;

    constructor(props: SensorViewProps) {
        super(props);
        
        this.state = {
            center: props.targets.length > 0 ? new Vector3(props.targets[0].position.x, props.targets[0].position.y, 0) : new Vector3(0, 0, 0),
            zoom: 1,
            xRotation: 6 * Math.PI / 16,
            yRotation: 0,
            zRotation: Math.PI / 8,
        };

        this.updateTransform(this.state);
    }

    shouldComponentUpdate(nextProps: SensorViewProps, nextState: SensorViewState) {
        if (this.state.xRotation !== nextState.xRotation
         || this.state.yRotation !== nextState.yRotation
         || this.state.zRotation !== nextState.zRotation) {
            this.updateTransform(nextState);
        }

        if (this.props.className !== nextProps.className || this.props.autoRotate !== nextProps.autoRotate) {
            return true;
        }

        setTimeout(() => this.touch.redraw(), 0); // wait til state/props actually change
        return false;
    }

    componentDidMount() {
        if (this.props.autoRotate) {
            this.autoRotateStep();
        }
    }

    componentDidUpdate(prevProps: SensorViewProps, prevState: SensorViewState) {
        this.touch.redraw();
        
        if (this.props.autoRotate) {
            if (!prevProps.autoRotate && this.touches === 0) {
                this.startRotation();
            }
        }
        else if (prevProps.autoRotate) {
            this.stopRotation();
        }
    }

    render() {
        return <TouchArea
            className={this.props.className}
            draw={(ctx, w, h) => this.drawSensors(ctx, w, h)}
            setupTouch={a => this.setupTouch(a)}
            ref={t => { if (t !== null) { this.touch = t }}}
        />;
    }

    componentWillUnmount() {
        this.stopRotation();
    }

    private updateTransform(state: SensorViewState) {
        this.viewTransform = Matrix.yRotation(state.yRotation)
                   .multiply(Matrix.xRotation(state.xRotation))
                   .multiply(Matrix.zRotation(state.zRotation));
    }

    private drawSensors(ctx: CanvasRenderingContext2D, width: number, height: number) {
        let halfWidth = width / 2;
        let halfHeight = height / 2;
        ctx.clearRect(0, 0, width, height);

        ctx.save();
        ctx.translate(halfWidth, halfHeight);
        ctx.scale(this.state.zoom, this.state.zoom);

        let minZ = Number.MAX_VALUE;
        for (let target of this.props.targets) {
            minZ = Math.min(minZ, target.position.z);
        }
        if (minZ === Number.MAX_VALUE) {
            minZ = 0;
        }
        minZ -= 5;

        let display: CanvasBounds3D = {
            minX: this.state.center.x - halfWidth,
            minY: this.state.center.y - halfHeight,
            maxX: this.state.center.x + halfWidth,
            maxY: this.state.center.y + halfHeight,
            onePixel: 1 / this.state.zoom, // 1 pixel despite zoom
            transform: world => {
                let screen3d = this.viewTransform.multiplyVector(world.clone().subtract(this.state.center));
                return {
                    position: new Vector2(screen3d.x, screen3d.y),
                    zDepth: screen3d.z,
                };
            },
        };

        const gridSize = 50;
        let gridExtent = 600 / this.state.zoom;
        let worldMin = new Vector3(
            Math.round((this.state.center.x - gridExtent) / gridSize) * gridSize,
            Math.round((this.state.center.y - gridExtent) / gridSize) * gridSize,
            this.state.center.z - gridExtent,
        );
        let worldMax = new Vector3(
            Math.round((this.state.center.x + gridExtent) / gridSize) * gridSize,
            Math.round((this.state.center.y + gridExtent) / gridSize) * gridSize,
            this.state.center.z + gridExtent * 2,
        );

        this.drawBackground(ctx, display, worldMin, worldMax, gridSize, minZ);
        this.drawRotationMarker(ctx, display, minZ);

        let drawList: TargetDrawInfo[] = this.props.targets
            .filter(t => t.isBetween(worldMin, worldMax))
            .map(t => {
                let renderPos = display.transform(t.position);

                return {
                    target: t,
                    screenPos: renderPos.position,
                    zDepth: renderPos.zDepth,
                };
            });
        drawList.sort((a, b) => a.zDepth - b.zDepth);

        for (let drawTarget of drawList) {
            drawTarget.target.draw(ctx, display, drawTarget.screenPos, minZ);
        }

        ctx.restore();
    }

    private drawBackground(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, worldMin: Vector3, worldMax: Vector3, gridSize: number, gridZ: number) {
        ctx.lineWidth = display.onePixel;
        ctx.strokeStyle = '#fff';
        ctx.beginPath();

        let worldPos = new Vector3(0, 0, gridZ);
        let screenPos: Vector2;

        for (let x = worldMin.x; x <= worldMax.x; x += gridSize) {
            worldPos.x = x;
            
            worldPos.y = worldMin.y;
            screenPos = display.transform(worldPos).position;
            ctx.moveTo(screenPos.x, screenPos.y);
            
            worldPos.y = worldMax.y;
            screenPos = display.transform(worldPos).position;
            ctx.lineTo(screenPos.x, screenPos.y);
        }

        for (let y = worldMin.y; y <= worldMax.y; y += gridSize) {
            worldPos.y = y;
            
            worldPos.x = worldMin.x;
            screenPos = display.transform(worldPos).position;
            ctx.moveTo(screenPos.x, screenPos.y);
            
            worldPos.x = worldMax.x;
            screenPos = display.transform(worldPos).position;
            ctx.lineTo(screenPos.x, screenPos.y);
        }

        ctx.stroke();
        ctx.globalAlpha = 1;
    }

    private drawRotationMarker(ctx: CanvasRenderingContext2D, display: CanvasBounds3D, gridZ: number) {
        let worldPos = new Vector3(this.state.center.x, this.state.center.y, gridZ);
        let screenPos = display.transform(worldPos).position;
        
        ctx.globalAlpha = 0.4;
        ctx.strokeStyle = '#c00';
        ctx.lineWidth = display.onePixel * 4;
        let length = display.onePixel * 12;

        // TODO: skew this to fit perspective
        ctx.beginPath();
        ctx.moveTo(screenPos.x - length, screenPos.y - length);
        ctx.lineTo(screenPos.x + length, screenPos.y + length);
        ctx.moveTo(screenPos.x - length, screenPos.y + length);
        ctx.lineTo(screenPos.x + length, screenPos.y - length);
        ctx.stroke();

        ctx.globalAlpha = 1;
    }

    private touches: number = 0;
    private autoRotation?: NodeJS.Timer;

    public interactionStarted() {
        if (this.touches === 0) {
            this.stopRotation(); // stop auto-rotation immediately
        }

        this.touches++;
    }

    public interactionFinished() {
        if (this.touches > 0) {
            this.touches--;
        }

        if (this.touches === 0 && this.props.autoRotate) {
            this.startRotation(2000); // start auto-rotation after a delay
        }
    }

    private startRotation(delay: number = 30) {
        this.autoRotation = setTimeout(() => this.autoRotateStep(), delay);
    }

    private stopRotation() {
        if (this.autoRotation !== undefined) { 
            clearTimeout(this.autoRotation);
            this.autoRotation = undefined;
        }
    }

    private autoRotateStep() {
        this.rotate(0, 0.0025);
        if (this.props.autoRotate) {
            this.startRotation()
        }
    }

    private setupTouch(area: TouchArea) {
        // one-finger / left mouse rotation
        /*
        const rotScale = 0.002;
        let rotate = area.createPan2D('rotate', 1, 1, false, (dx, dy) => this.rotate(dy * rotScale, dx * rotScale)
            , undefined, () => this.interactionStarted(), () => this.interactionFinished());
        */
        // 2-finger panning for multitouch
        let pan = area.createPan2D('pan', 2, 1, false, (dx, dy) => this.pan(-dx, -dy)
            , () => this.interactionStarted(), () => this.interactionFinished());
        
        // right-mouse panning for where multitouch isn't an option
        let rightMouseDown = false;
        area.element.addEventListener('mousedown', ev => { if (ev.button !== 0) { rightMouseDown = true; this.interactionStarted(); } });
        area.element.addEventListener('mouseup', ev => { if (ev.button !== 0) { rightMouseDown = false; this.interactionFinished(); } });
        area.element.addEventListener('mouseout', () => { if (rightMouseDown) { rightMouseDown = false; this.interactionFinished(); } });
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
        }, () => { prevScale = 1; this.interactionStarted();}, () => this.interactionFinished());

        pan.requireFailure(zoom);
        zoom.requireFailure(pan);

        // mouse wheel zooming
        area.element.addEventListener('wheel', ev => {
            if (ev.deltaY === 0) {
                return;
            }
            ev.preventDefault();
            this.interactionStarted();
            this.interactionFinished();

            this.zoom(ev.deltaY < 0 ? 1.1 : 0.9);
        });
    }

    private pan(screenDx: number, screenDy: number) {
        screenDx /= this.state.zoom;
        screenDy /= this.state.zoom;

        let sinRot = Math.sin(this.state.zRotation);
        let cosRot = Math.cos(this.state.zRotation);
        let worldDx =  screenDx * cosRot + screenDy * sinRot;
        let worldDy = -screenDx * sinRot + screenDy * cosRot;

        this.setState(state => { return {
            center: new Vector3(state.center.x + worldDx, state.center.y + worldDy, state.center.z),
        }});
    }

    private rotate(dx: number, dz: number) {
        this.setState(state => { return {
            // xRotation: state.xRotation + dx,
            zRotation: state.zRotation + dz,
        }});
    }

    private zoom(scale: number) {
        this.setState(state => { return {
            zoom: state.zoom * scale,
        }});
    }
}