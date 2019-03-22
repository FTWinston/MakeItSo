import * as React from 'react';
import './Targeting.scss';
import { Polygon } from './Polygon';
import { FlexibleCanvas, TouchArea } from '~/components/general';

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

        const draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => this.draw(ctx, w, h);
        const setupTouch = (a: TouchArea) => this.setupTouch(a);

        return <TouchArea
            className={classes}
            draw={draw}
            setupTouch={setupTouch}
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
        // determine the "full length" version of the clipping line,
        // plus two clipping paths to use to separate each "half" of the polygon, based on that line
        
        let x1 = this.state.x1!;
        let y1 = this.state.y1!;
        let x2 = this.state.x2!;
        let y2 = this.state.y2!;

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
                    x2 = xTopIntercept;
                    y2 = 0;

                    bounds1.push({ x: x2, y: y2 }); // clockwise

                    bounds2.push({ x: width, y: 0 }); // anticlockwise
                    bounds2.push({ x: x2, y: y2 });
                }
                else {
                    // right end touches the right
                    x2 = width;
                    y2 = gradient * width + yIntercept;

                    bounds2.push({ x: width, y: 0 }); // clockwise
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
        // TODO: these positions need rounded to the nearest grid values

        this.setState({
            x1: startX,
            y1: startY,
            x2: endX,
            y2: endY,
        });
    }

    private sliceFinished() {
        if (this.state.x1 === undefined || this.state.y1 === undefined || this.state.x2 === undefined || this.state.y2 === undefined) {
            return;
        }

        // TODO: the state values need scaled from screen to "grid" coordinates
        this.props.fire(this.state.x1, this.state.y1, this.state.x2, this.state.y2);

        // TODO: display results, temporarily ignore input
    }
}