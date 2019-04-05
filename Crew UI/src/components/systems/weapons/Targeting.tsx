import * as React from 'react';
import './Targeting.scss';
import { Polygon } from './Polygon';
import { TouchArea } from '~/components/general';

interface IProps {
    className?: string;
    polygon?: Polygon;
    fire: (x1: number, y1: number, x2: number, y2: number) => void;
}

interface IState {
    prevPolygon?: Polygon;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;

    minRequiredX: number;
    maxRequiredX: number;
    minRequiredY: number;
    maxRequiredY: number;

    sliceResultNumbers?: Array<{
        percent: number;
        x: number;
        y: number;
    }>
}

export class Targeting extends React.Component<IProps, IState> {
    private touch: TouchArea;
    private autoClear?: NodeJS.Timer;

    constructor(props: IProps) {
        super(props);

        const newState = this.determinePolygonBounds(props.polygon)
        newState.prevPolygon = props.polygon;

        this.state = newState;
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.polygon !== this.props.polygon) {
            const newState = this.determinePolygonBounds(this.props.polygon)
            newState.prevPolygon = this.props.polygon;

            this.setState(newState);
        }
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevState.x2 !== this.state.x2
            || prevState.y2 !== this.state.y2
            || prevState.x1 !== this.state.x1
            || prevState.y1 !== this.state.y1
            || prevState.sliceResultNumbers !== this.state.sliceResultNumbers
            || prevProps.polygon !== this.props.polygon
        ) {
            this.touch.redraw();
        }
    }

    componentWillUnmount() {
        this.clearResults();
    }

    private determinePolygonBounds(polygon: Polygon | undefined): IState {
        if (polygon === undefined) {
            return {
                minRequiredX: 0,
                maxRequiredX: 8,
                minRequiredY: 0,
                maxRequiredY: 8,
            };
        }

        // determine the extent of the polygon itself
        const polyBounds = polygon.bounds;

        return {
            minRequiredX: polyBounds.minX - Targeting.gridPadding,
            minRequiredY: polyBounds.minY - Targeting.gridPadding,
            maxRequiredX: polyBounds.maxX + Targeting.gridPadding,
            maxRequiredY: polyBounds.maxY + Targeting.gridPadding,
        };
    }

    render() {
        const classes = this.props.className === undefined
            ? 'targeting'
            : 'targeting ' + this.props.className;

        const draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => this.draw(ctx, w, h);
        const setupTouch = (a: TouchArea) => this.setupTouch(a);

        return <TouchArea
            className={classes}
            draw={draw}
            setupTouch={setupTouch}
            ref={t => { if (t !== null) { this.touch = t }}}
        />;
    }
    
    private static readonly gridPadding = 3;
    private unitSize: number;
    private minX: number;
    private minY: number;
    
    private updateScaleAndOffset(width: number, height: number) {
        // X or Y bounds will probably be larger than required so as to keep the polygon in the center
        const centerX = (this.state.maxRequiredX + this.state.minRequiredX) / 2;
        const centerY = (this.state.maxRequiredY + this.state.minRequiredY) / 2;

        let xExtent = this.state.maxRequiredX - this.state.minRequiredX;
        let yExtent = this.state.maxRequiredY - this.state.minRequiredY;

        const requiredRatio = xExtent / yExtent;
        const displayRatio = width / height;

        if (requiredRatio < displayRatio) {
            // fit to height, extend X space
            this.unitSize = height / yExtent;

            const requiredWidth = xExtent * this.unitSize;
            xExtent *= width / requiredWidth;
        }
        else {
            // fit to width, extend Y space
            this.unitSize = width / xExtent;

            const requiredHeight = yExtent * this.unitSize;
            yExtent *= height / requiredHeight;
        }

        this.minX = centerX - xExtent / 2;
        this.minY = centerY - yExtent / 2;
    }

    private draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.updateScaleAndOffset(width, height);

        this.drawBackground(ctx, this.unitSize, width, height);

        if (this.props.polygon !== undefined && this.props.polygon.points.length > 0) {
            this.drawPolygon(ctx, this.unitSize, width, height);
        }
        else {
            // TODO: some sort of message about facing the wrong face
        }

        if (this.state.sliceResultNumbers !== undefined) {
            this.drawResults(ctx, this.unitSize);
        }
    }

    private drawPolygon(ctx: CanvasRenderingContext2D, unitSize: number, width: number, height: number) {
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = unitSize * 0.1;

        if (this.state.x2 === undefined || this.state.y2 === undefined || (this.state.x2 === this.state.x1 && this.state.y2 === this.state.y1)) {
            ctx.fillStyle = '#c00';
            this.drawSinglePolygon(ctx, this.props.polygon!);

            if (this.state.x1 !== undefined && this.state.y1 !== undefined) {
                // draw "start point" for what will become the clipping line
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(this.gridToScreen(this.state.x1, this.minX), this.gridToScreen(this.state.y1, this.minY), unitSize * 0.2, 0, Math.PI * 2);
                ctx.fill();
            }
            return;
        }

        const clippingInfo = this.getClippingInfo(width, height);

        // clip on one side of the line and draw the polygon in one color
        ctx.save();
        this.clipPath(ctx, clippingInfo.bounds1);
        ctx.fillStyle = '#f90';
        this.drawSinglePolygon(ctx, this.props.polygon!);
        ctx.restore();

        // clip on the other side of line and draw the polygon in another color
        ctx.save();
        this.clipPath(ctx, clippingInfo.bounds2);
        ctx.fillStyle = '#0cf';
        this.drawSinglePolygon(ctx, this.props.polygon!);
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
            this.gridToScreen(this.state.x1!, this.minX),
            this.gridToScreen(this.state.y1!, this.minY)
        )
        ctx.lineTo(
            this.gridToScreen(this.state.x2!, this.minX),
            this.gridToScreen(this.state.y2!, this.minY)
        )
        ctx.stroke();
    }

    private drawBackground(ctx: CanvasRenderingContext2D, unitSize: number, width: number, height: number) {
        // first, fill the background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        if (unitSize <= 1) {
            return;
        }

        // determine where to draw the top left point
        const startX = this.gridToScreen(Math.ceil(this.minX), this.minX);
        const startY = this.gridToScreen(Math.ceil(this.minY), this.minY);

        // draw a grid of points
        ctx.fillStyle = '#999';
        const radius = unitSize * 0.1;
        const twoPi = Math.PI * 2;

        ctx.beginPath();

        for (let x = startX; x <= width; x += unitSize) {
            for (let y = startY; y <= height; y += unitSize) {
                ctx.moveTo(x, y);
                ctx.arc(x, y, radius, 0, twoPi);
            }
        }

        ctx.fill();
    }

    private drawSinglePolygon(ctx: CanvasRenderingContext2D, polygon: Polygon) {
        // assume color and clip already set; just fill then stroke the shape

        ctx.beginPath();

        const firstPoint = polygon.points[0];

        const startX = this.gridToScreen(firstPoint.x, this.minX);
        const startY = this.gridToScreen(firstPoint.y, this.minY);
        ctx.moveTo(startX, startY);

        for (const point of polygon.points) {
            const x = this.gridToScreen(point.x, this.minX);
            const y = this.gridToScreen(point.y, this.minY);
            ctx.lineTo(x, y);
        }

        ctx.lineTo(startX, startY);

        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.stroke();
    }

    private drawResults(ctx: CanvasRenderingContext2D, unitSize: number) {
        ctx.fillStyle = '#fff';
        ctx.font = `${Math.round(unitSize)}px Georgia`;
        ctx.globalAlpha = 0.75;
        ctx.textAlign = 'center';

        for (const result of this.state.sliceResultNumbers!) {
            ctx.fillText(result.percent.toString(), this.gridToScreen(result.x, this.minX), this.gridToScreen(result.y, this.minY));
        }

        ctx.globalAlpha = 1;
    }

    private screenToGrid(val: number, offset: number) {
        return Math.round(val / this.unitSize + offset);
    }

    private gridToScreen(val: number, offset: number) {
        return (val - offset) * this.unitSize;
    }

    private getClippingInfo(width: number, height: number) {
        // determine the "full length" version of the clipping line,
        // plus two clipping paths to use to separate each "half" of the polygon, based on that line
        
        let x1 = this.gridToScreen(this.state.x1!, this.minX);
        let y1 = this.gridToScreen(this.state.y1!, this.minY);
        let x2 = this.gridToScreen(this.state.x2!, this.minX);
        let y2 = this.gridToScreen(this.state.y2!, this.minY);

        let bounds1;
        let bounds2;

        if (x1 === x2) {
            y1 = 0;
            y2 = height

            bounds1 = [
                { x: 0, y: 0 },
                { x: x1, y: 0 },
                { x: x2, y: height },
                { x: 0, y: height },
            ];

            bounds2 = [
                { x: x1, y: 0 },
                { x: width, y: 0 },
                { x: width, y: height },
                { x: x2, y: height },
            ];
        }
        else {
            // ensure that 1 is left of 2
            if (x1 > x2) {
                [x1, x2] = [x2, x1];
                [y1, y2] = [y2, y1];
            }

            const gradient = (y2 - y1) / (x2 - x1);
            // y = mx + c
            // c = y - mx
            const yIntercept = y2 - gradient * x2;

            // x = (y - c) / m
            const xIntercept = (0 - yIntercept) / gradient;
            const xTopIntercept = (height - yIntercept) / gradient;

            if (gradient >= 0) {
                if (xIntercept >= 0) {
                    // left end touches y=0
                    x1 = xIntercept;
                    y1 = 0;

                    bounds1 = [ // anticlockwise
                        { x: x1, y: y1 },
                        { x: 0, y: 0 },
                        { x: 0, y: height },
                    ];

                    bounds2 = [ // clockwise
                        { x: x1, y: y1 },
                        { x: width, y: 0 },
                    ]
                }
                else {
                    // left end touches the left
                    x1 = 0;
                    y1 = yIntercept;

                    bounds1 = [ // anticlockwise
                        { x: x1, y: y1 },
                        { x: 0, y: height },
                    ];

                    bounds2 = [ // clockwise
                        { x: x1, y: y1 },
                        { x: 0, y: 0 },
                        { x: width, y: 0 },
                    ];
                }

                if (xTopIntercept <= width) {
                    // right end touches y = height
                    x2 = xTopIntercept;
                    y2 = height;

                    bounds1.push({ x: x2, y: y2 }); // anticlockwise

                    bounds2.push({ x: width, y: height }); // clockwise
                    bounds2.push({ x: x2, y: y2 });
                }
                else {
                    // right end touches the right
                    x2 = width;
                    y2 = gradient * width + yIntercept;

                    bounds1.push({ x: width, y: height }); // anticlockwise
                    bounds1.push({ x: x2, y: y2 });

                    bounds2.push({ x: x2, y: y2 }); // clockwise
                }
            }
            else {
                if (xTopIntercept >= 0) {
                    // left end touches y = height
                    x1 = xTopIntercept;
                    y1 = height;

                    bounds1 = [ // clockwise
                        { x: x1, y: y1 },
                        { x: 0, y: height },
                        { x: 0, y: 0 },
                    ];

                    bounds2 = [ // anticlockwise
                        { x: x1, y: y1 },
                        { x: width, y: height },
                    ];
                }
                else {
                    // left end touches the left
                    x1 = 0;
                    y1 = yIntercept;

                    bounds1 = [ // clockwise
                        { x: x1, y: y1 },
                        { x: 0, y: 0 },
                    ];

                    bounds2 = [ // anticlockwise
                        { x: x1, y: y1 },
                        { x: 0, y: height },
                        { x: width, y: height },
                    ];
                }

                if (xIntercept <= width) {
                    // right end touches y = 0
                    x2 = xIntercept;
                    y2 = 0;

                    bounds1.push({ x: x2, y: y2 }); // clockwise

                    bounds2.push({ x: width, y: 0 }); // anticlockwise
                    bounds2.push({ x: x2, y: y2 });
                }
                else {
                    // right end touches the right
                    x2 = width;
                    y2 = gradient * width + yIntercept;
                    bounds1.push({ x: width, y: 0 }); // clockwise
                    bounds1.push({ x: x2, y: y2 });

                    bounds2.push({ x: x2, y: y2 }); // anticlockwise
                }
            }
        }

        return {
            extendedLine: {
                x1,
                y1,
                x2,
                y2,
            },
            bounds1,
            bounds2,
        }
    }

    private clipPath(ctx: CanvasRenderingContext2D, bounds: Array<{ x: number; y: number; }>) {
        ctx.beginPath();

        const first = bounds.shift()!;

        ctx.moveTo(first.x, first.y);

        for (const point of bounds) {
            ctx.lineTo(point.x, point.y);
        }

        // ctx.lineTo(first.x, first.y);
        ctx.clip();
    }

    private setupTouch(area: TouchArea) {
        area.createPan2D(
            'pan',
            1,
            1,
            false,
            () => { }, // do nothing with the offset, we only care about the start & end
            (startX, startY, endX, endY) => this.updateSlice(startX, startY, endX, endY),
            undefined,
            () => this.sliceFinished()
        );
    }

    private updateSlice(startX: number, startY: number, endX: number, endY: number) {
        if (this.state.sliceResultNumbers !== undefined) {
            return; // no slicing while results are showing
        }

        this.setState({
            x1: this.screenToGrid(startX, this.minX),
            y1: this.screenToGrid(startY, this.minY),
            x2: this.screenToGrid(endX, this.minX),
            y2: this.screenToGrid(endY, this.minY),
        });
    }

    private sliceFinished() {
        if (this.state.x1 === undefined || this.state.y1 === undefined
            || this.state.x2 === undefined || this.state.y2 === undefined
            || this.props.polygon === undefined || this.state.sliceResultNumbers !== undefined
        ) {
            this.clearResults();
            return;
        }

        // Determine areas of bisected "halfs"
        const parts = this.props.polygon.bisect({ x: this.state.x1, y: this.state.y1 }, { x: this.state.x2, y: this.state.y2 });
        console.log('bisected', parts);
        
        const totArea = parts.reduce((accumulator, part) => accumulator + part.area, 0);

        const sliceResultNumbers = parts.map(part => {
            const labePosition = part.pointFurthestFromEdge;
            return {
                percent: Math.round(1000 * part.area / totArea) / 10,
                x: labePosition.x,
                y: labePosition.y,
            };
        })

        const firstPercent = sliceResultNumbers[0].percent;
        if (firstPercent < 0.01 || firstPercent > 99.99) {
            this.clearResults();
            return; // if slice was entirely outside the shape, do nothing
        }

        // TODO: the state values need scaled from screen to "grid" coordinates
        this.props.fire(this.state.x1, this.state.y1, this.state.x2, this.state.y2);

        this.setState({
            sliceResultNumbers,
        });

        this.autoClear = setTimeout(() => this.clearResults(), 2000);
    }

    private clearResults() {
        this.setState({
            x1: undefined,
            y1: undefined,
            x2: undefined,
            y2: undefined,
            sliceResultNumbers: undefined,
        })

        if (this.autoClear !== undefined) {
            clearTimeout(this.autoClear);
            this.autoClear = undefined;
        }
    }
}