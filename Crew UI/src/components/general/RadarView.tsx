import * as React from 'react';
import { TouchArea } from './TouchArea';
import { SensorTarget, Vector3, Rotator, CanvasBounds, Vector2, Quaternion } from '~/functionality';

interface IProps {
    className?: string;
    targets: SensorTarget[];
    shipPosition: Vector3;
    shipOrientation: Rotator;
    maxTargetingAngleRadians: number;
}

export class RadarView extends React.Component<IProps, {}> {
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

    componentWillUnmount() {
        this.mounted = false;
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
        const toTarget = targetPosition.clone().subtract(this.props.shipPosition);
        const rotation = Quaternion.findBetween(forward, toTarget).toRotator();

        console.log(`forward is ${forward.x}, ${forward.y}, ${forward.z}`);
        console.log(`targetPosition is ${targetPosition.x}, ${targetPosition.y}, ${targetPosition.z}`);
        console.log(`toTarget is ${toTarget.x}, ${toTarget.y}, ${toTarget.z}`);
        console.log(`rotation is ${rotation.pitch}, ${rotation.yaw}, ${rotation.roll}`);

        const xoffset = fullRadius * rotation.yaw / 180;
        const yoffset = fullRadius * rotation.pitch / 180;

        console.log(`offsets are ${xoffset} and ${yoffset}`);

        // TODO: convert these from values that would fit on a square screen to ones that would fit on a circular screen
        

        const x = centerX + xoffset;
        const y = centerY + yoffset;


        console.log(`draw coordinates are ${x}, ${y}`);

        // TODO: if dot product is less than zero, scale to fit "outer" ring, otherwise scale to fit "inner" ring
       
        return new Vector2(x, y); // TODO: calculate based on offset from ship and angle of ship
    }

    private setupTouch(area: TouchArea) {

    }
}