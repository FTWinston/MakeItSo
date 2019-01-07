import * as React from 'react';
import { TouchArea } from './TouchArea';
import { SensorTarget, Vector3, Rotator, CanvasBounds, Vector2, CanvasBounds3D } from '~/functionality';

interface IProps {
    className?: string;
    targets: SensorTarget[];
    shipPosition: Vector3;
    shipOrientation: Rotator;
    maxTargetingAngleRadians: number;
}

export class RadarView extends React.PureComponent<IProps, {}> {
    private touch: TouchArea;
    private mounted: boolean = false;

    shouldComponentUpdate(nextProps: IProps, nextState: {}) {
        if (this.props.className !== nextProps.className) {
            return true;
        }

        setTimeout(() => { if (this.mounted) { this.touch.redraw() } }, 0); // wait til state/props actually change
        return false;
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentDidUpdate(prevProps: IProps, prevState: {}) {
        this.touch.redraw();
    }

    render() {
        return <TouchArea
            className={this.props.className}
            draw={(ctx, w, h) => this.drawRadar(ctx, w, h)}
            setupTouch={a => this.setupTouch(a)}
            ref={t => { if (t !== null) { this.touch = t }}}
        />;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    private drawRadar(ctx: CanvasRenderingContext2D, width: number, height: number) {
        const centerX = width / 2;
        const centerY = height / 2;
        const r = Math.min(centerX, centerY);
        /*
        const minX = centerX - r;
        const maxX = centerX + r;
        const minY = centerY - r;
        const maxY = centerY + r;
        */

        ctx.clearRect(0, 0, width, height);

        this.drawBackground(ctx, centerX, centerY, r);

        ctx.save();

        const display: CanvasBounds3D = undefined; // TODO: what is this?

        for (let target of this.props.targets) {
            const screenPos = new Vector2(0, 0); // TODO: calculate based on offset from ship and angle of ship
            target.draw(ctx, display, screenPos, 0); // TODO: disable marker drawing
        }

        ctx.restore();
    }

    private drawBackground(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) {
        ctx.lineWidth = 1;

        // an outline
        ctx.strokeStyle = '#ccc';
        ctx.fillStyle = '#333';
        ctx.beginPath();

        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

        ctx.fill();
        ctx.stroke();

        // targetable area
        ctx.fillStyle = '#000';
        ctx.beginPath();

        const targetingRadius = this.props.maxTargetingAngleRadians / radius / Math.PI;

        ctx.arc(centerX, centerY, targetingRadius, 0, Math.PI * 2);

        ctx.fill();
        ctx.stroke();


        // a "90 degree" ring
        ctx.globalAlpha = 0.333;
        ctx.beginPath();

        ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);

        // crosshairs
        ctx.moveTo(centerX, centerY - radius);
        ctx.lineTo(centerX, centerY + radius);
        
        ctx.moveTo(centerX - radius, centerY);
        ctx.lineTo(centerX + radius, centerY);

        ctx.stroke();
        ctx.globalAlpha = 1;
    }
    
/*
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
*/
    private setupTouch(area: TouchArea) {

    }
}