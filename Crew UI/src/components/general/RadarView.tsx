import * as React from 'react';
import { TouchArea } from './TouchArea';
import { SensorTarget, Vector3, Rotator, CanvasBounds, Vector2 } from '~/functionality';

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
        const midR = r * 0.65;

        const display: CanvasBounds = {
            minX: centerX - r,
            maxX: centerX + r,
            minY: centerY - r,
            maxY: centerY + r,
            onePixel: 1,
        };

        ctx.clearRect(0, 0, width, height);

        this.drawBackground(ctx, centerX, centerY, r, midR);

        ctx.save();

        const forward = this.props.shipOrientation.toVector();

        for (let target of this.props.targets) {
            const drawPos = this.determineDrawPosition(target.position, forward, centerX, centerY, r, midR);
            target.drawTarget(ctx, drawPos, display);
        }

        ctx.restore();
    }

    private drawBackground(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, fullRadius: number, midRadius: number) {
        ctx.lineWidth = 1;

        // an outline
        ctx.strokeStyle = '#ccc';
        ctx.fillStyle = '#333';
        ctx.beginPath();

        ctx.arc(centerX, centerY, fullRadius, 0, Math.PI * 2);

        ctx.fill();
        ctx.stroke();

        // targetable area
        ctx.fillStyle = '#000';
        ctx.beginPath();

        const targetingRadius = this.props.maxTargetingAngleRadians / fullRadius / Math.PI;

        ctx.arc(centerX, centerY, targetingRadius, 0, Math.PI * 2);

        ctx.fill();
        ctx.stroke();


        // a "90 degree" ring
        ctx.globalAlpha = 0.333;
        ctx.beginPath();

        ctx.arc(centerX, centerY, midRadius, 0, Math.PI * 2);

        // crosshairs
        ctx.moveTo(centerX, centerY - fullRadius);
        ctx.lineTo(centerX, centerY + fullRadius);
        
        ctx.moveTo(centerX - fullRadius, centerY);
        ctx.lineTo(centerX + fullRadius, centerY);

        ctx.stroke();
        ctx.globalAlpha = 1;
    }
    
    private determineDrawPosition(targetPosition: Vector3, forward: Vector3, centerX: number, centerY: number, fullRadius: number, midRadius: number) {
        /*
        const toTarget = targetPosition.clone().normalize();
        const dot = forward.dot(toTarget);
        */
       
        return new Vector2(centerX, centerY);// TODO: calculate based on offset from ship and angle of ship
    }

    private setupTouch(area: TouchArea) {

    }
}