import * as React from 'react';
import './Targeting.scss';
import { Polygon } from './Polygon';
import { FlexibleCanvas } from '~/components/general';

interface IProps {
    polygon?: Polygon;
    fire: (x1: number, y1: number, x2: number, y2: number) => void;
}

interface IState {
    prevPolygon?: Polygon;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;

    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

export class Targeting extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const newState = this.determineBounds(props.polygon)
        newState.prevPolygon = props.polygon;

        this.state = newState;
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.polygon !== this.props.polygon) {
            const newState = this.determineBounds(this.props.polygon)
            newState.prevPolygon = this.props.polygon;

            this.setState(newState);
        }
    }

    private determineBounds(polygon: Polygon | undefined): IState {
        if (polygon === undefined) {
            return {
                minX: 0,
                maxX: 12,
                minY: 0,
                maxY: 12,
            };
        }

        // determine the extent of the polygon itself
        let minX = Number.MAX_SAFE_INTEGER;
        let minY = Number.MAX_SAFE_INTEGER;
        let maxX = Number.MIN_SAFE_INTEGER;
        let maxY = Number.MIN_SAFE_INTEGER;

        for (const point of polygon.points) {
            if (point.x < minX) {
                minX = point.x;
            }
            if (point.x > maxX) {
                maxX = point.x;
            }

            if (point.y < minY) {
                minY = point.y;
            }
            if (point.y > maxY) {
                maxY = point.y;
            }
        }

        // then add some padding
        const xRange = maxX - minX;
        const yRange = maxY - minY;

        // TODO: we ought to account for the aspect ratio of the display here
        minX -= xRange * 0.25;
        maxX += xRange * 0.25;
        minY -= yRange * 0.25;
        maxY += yRange * 0.25;

        return {
            minX,
            maxX,
            minY,
            maxY,
        };
    }

    render() {
        let classes = 'targeting';

        /*
        if (this.state.flashing === true) {
            classes += ' targeting--success';
        }
        else if (this.state.flashing === false) {
            classes += ' targeting--failure';
        }
        */

        // TODO: handle mouse interaction, animating intersection as mouse moves, calling fire
        const draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => this.draw(ctx, w, h);

        return <FlexibleCanvas
            className={classes}
            draw={draw}
        />;
    }

    private draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        const unitSize = Math.min(width / (this.state.maxX - this.state.minX), height / (this.state.maxY - this.state.minY));

        this.drawBackground(ctx, unitSize, width, height);

        if (this.props.polygon === undefined || this.props.polygon.points.length === 0) {
            // TODO: some sort of message about facing the wrong face
            return;
        }
        
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = unitSize * 0.1;

        if (this.state.x2 === undefined || this.state.y2 === undefined || (this.state.x2 === this.state.x1 && this.state.y2 === this.state.y1)) {
            ctx.fillStyle = '#c00';
            this.drawPolygon(ctx, unitSize, width, height, this.props.polygon);

            if (this.state.x1 !== undefined && this.state.y1 !== undefined) {
                // draw "start point" for what will become the clipping line
                ctx.strokeStyle = '#fff';
                ctx.beginPath();
                ctx.arc(this.state.x1, this.state.y1, unitSize * 0.2, 0, Math.PI * 2);
                ctx.fill();
            }
            return;
        }

        const clippingInfo = this.getClippingInfo(width, height);

        // clip on one side of the line and draw the polygon in one color
        ctx.save();
        this.clipPath(ctx, clippingInfo.bounds1);
        ctx.fillStyle = '#f90';
        this.drawPolygon(ctx, unitSize, width, height, this.props.polygon);
        ctx.restore();

        // clip on the other side of line and draw the polygon in another color
        ctx.save();
        this.clipPath(ctx, clippingInfo.bounds2);
        ctx.fillStyle = '#0cf';
        this.drawPolygon(ctx, unitSize, width, height, this.props.polygon);
        ctx.restore();
        
        // draw "extended" clipping line thinly
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(clippingInfo.extendedLine.x1, clippingInfo.extendedLine.y1);
        ctx.lineTo(clippingInfo.extendedLine.x2, clippingInfo.extendedLine.y2);
        ctx.stroke();

        // draw main clipping line thickly
        ctx.lineWidth = unitSize * 0.2;
        ctx.beginPath();
        ctx.moveTo(
            this.scaleCoord(this.state.x1!, unitSize, this.state.minX),
            this.scaleCoord(this.state.y1!, unitSize, this.state.minY)
        )
        ctx.lineTo(
            this.scaleCoord(this.state.x2!, unitSize, this.state.minX),
            this.scaleCoord(this.state.y2!, unitSize, this.state.minY)
        )
        ctx.stroke();
    }

    private drawBackground(ctx: CanvasRenderingContext2D, unitSize: number, width: number, height: number) {
        // first, fill the background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        // determine where to draw the top left point
        const startX = this.scaleCoord(Math.ceil(this.state.minX), unitSize, this.state.minX);
        const startY = this.scaleCoord(Math.ceil(this.state.minY), unitSize, this.state.minY);

        // draw a grid of points
        ctx.fillStyle = '#999';
        const radius = unitSize * 0.1;
        const twoPi = Math.PI * 2;

        ctx.beginPath();

        for (let x = startX; x < width; x += unitSize) {
            for (let y = startY; y < height; y += unitSize) {
                ctx.arc(x, y, radius, 0, twoPi);
            }
        }

        ctx.fill();
    }

    private drawPolygon(ctx: CanvasRenderingContext2D, unitSize: number, width: number, height: number, polygon: Polygon) {
        // assume color and clip already set; just fill then stroke the shape

        ctx.beginPath();

        const firstPoint = polygon.points[0];

        const startX = this.scaleCoord(firstPoint.x, unitSize, this.state.minX);
        const startY = this.scaleCoord(firstPoint.y, unitSize, this.state.minY);
        ctx.moveTo(startX, startY);

        for (const point of polygon.points) {
            const x = this.scaleCoord(point.x, unitSize, this.state.minX);
            const y = this.scaleCoord(point.y, unitSize, this.state.minY);
            ctx.lineTo(x, y);
        }

        ctx.lineTo(startX, startY);

        ctx.fill();
        ctx.stroke();
    }

    private scaleCoord(val: number, unitSize: number, offset: number) {
        return (val - offset) * unitSize;
    }

    private getClippingInfo(width: number, height: number) {
        // TODO: actually return proper data here

        return {
            extendedLine: {
                x1: 0,
                y1: 0,
                x2: 1,
                y2: 1,
            },
            bounds1: [
                { x: 0, y: 0 },
                { x: width, y: 0 },
                { x: 0, y: height },
            ],
            bounds2: [
                { x: width, y: 0 },
                { x: width, y: height },
                { x: 0, y: height },
            ]
        }
    }

    private clipPath(ctx: CanvasRenderingContext2D, bounds: { x: number; y: number; }[]) {
        ctx.beginPath();

        const first = bounds.shift()!;

        ctx.moveTo(first.x, first.y);

        for (const point of bounds) {
            ctx.lineTo(point.x, point.y);
        }

        // ctx.lineTo(first.x, first.y);
        ctx.clip();
    }
}