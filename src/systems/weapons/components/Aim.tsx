import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { Vector2D } from '../../../common/data/Vector2D';
import { getBounds, Polygon } from '../../../common/data/Polygon';
import { Canvas } from '../../../common/components/Canvas';
import { useGesture } from 'react-use-gesture';
import { UserHandlersPartial } from 'react-use-gesture/dist/types';

const useStyles = makeStyles(theme => ({
    canvas: {
        flexGrow: 1,
    },
}));

const gridPadding = 3;

interface SliceResult {
    percent: number;
    x: number;
    y: number;
}

interface DisplayInfo {
    unitSize: number;
    viewWidth: number;
    viewHeight: number;
    gridMin: Vector2D;
    gridMax: Vector2D;
    theme: Theme;
}

interface Props {
    requiredAccuracy: number;
    polygon?: Polygon;
    fire: (x1: number, y1: number, x2: number, y2: number) => void;
}

export const Aim: React.FC<Props> = props => {
    const theme = useTheme();
    const classes = useStyles();

    // This seems to be in grid space, rather than screen space.
    const display = useRef<DisplayInfo>({
        unitSize: 1,
        viewWidth: 1,
        viewHeight: 1,
        gridMin: { x: 0, y: 0 },
        gridMax: { x: 1, y: 1 },
        theme,
    });
    
    const [startPos, setStartPos] = useState<Vector2D>();
    const [endPos, setEndPos] = useState<Vector2D>();
    const [sliceResults, setSliceResults] = useState<SliceResult[]>([]);

    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(
        () => {
            display.current = updateScaleAndOffset(canvas.current!.clientWidth, canvas.current!.clientHeight, theme, props.polygon);
        },
        [props.polygon, theme]
    );

    const boundsChanged = (bounds: DOMRect) => {
        display.current = updateScaleAndOffset(bounds.width, bounds.height, theme, props.polygon);
    };

    const draw = (ctx: CanvasRenderingContext2D) => {
        drawAll(ctx, display.current, props.polygon, startPos, endPos, sliceResults);
    };

    const gestureConfig: UserHandlersPartial = {
        onDrag: ({ movement: [mx, my] }) => {
            
        },
        onDragStart: ({ /*da: [distance]*/ }) => {
            
        },
        onDragEnd: ({ /*da: [distance]*/ }) => {
            
        },
    };

    const bind = useGesture(gestureConfig, {
        drag: {
            
        },
    });
    
    return (
        <Canvas
            ref={canvas}
            className={classes.canvas}
            animate={true}
            draw={draw}
            boundsChanged={boundsChanged}
            {...bind()}
        />
    );
}

function getPaddedBounds(polygon: Polygon | undefined) {
    if (polygon === undefined) {
        return {
            minX: 0,
            minY: 0,
            maxX: 8,
            maxY: 8,
        };
    }

    // determine the extent of the polygon itself
    const polyBounds = getBounds(polygon);

    polyBounds.minX -= gridPadding;
    polyBounds.minY -= gridPadding;

    polyBounds.maxX += gridPadding;
    polyBounds.maxY += gridPadding;

    return polyBounds;
}

function updateScaleAndOffset(viewWidth: number, viewHeight: number, theme: Theme, polygon?: Polygon): DisplayInfo {
    const gridSpaceBounds = getPaddedBounds(polygon);

    // X or Y bounds will probably be larger than required so as to keep the polygon in the center
    const gridCenterX = (gridSpaceBounds.maxX + gridSpaceBounds.minX) / 2;
    const gridCenterY = (gridSpaceBounds.maxY + gridSpaceBounds.minY) / 2;

    let gridExtentX = gridSpaceBounds.maxX - gridSpaceBounds.minX;
    let gridExtentY = gridSpaceBounds.maxY - gridSpaceBounds.minY;

    const requiredRatio = gridExtentX / gridExtentY;
    const displayRatio = viewWidth / viewHeight;
    let unitSize: number;

    if (requiredRatio < displayRatio) {
        // fit to height, extend X space
        unitSize = viewHeight / gridExtentY;

        const requiredWidth = gridExtentX * unitSize;
        gridExtentX *= viewWidth / requiredWidth;
    }
    else {
        // fit to width, extend Y space
        unitSize = viewWidth / gridExtentX;

        const requiredHeight = gridExtentY * unitSize;
        gridExtentY *= viewHeight / requiredHeight;
    }

    return {
        gridMin: {
            x: gridCenterX - gridExtentX / 2,
            y: gridCenterY - gridExtentY / 2,
        },
        gridMax: {
            x: gridSpaceBounds.maxX,
            y: gridSpaceBounds.maxY,
        },
        unitSize,
        viewWidth,
        viewHeight,
        theme,
    };
}

function drawAll(ctx: CanvasRenderingContext2D, display: DisplayInfo, polygon?: Polygon, startPos?: Vector2D, endPos?: Vector2D, sliceResults?: SliceResult[]) {
    drawBackground(ctx, display);

    if (polygon !== undefined && polygon.length > 0) {
        drawPolygon(ctx, polygon, display);
    }
    else {
        // TODO: some sort of message about no targeting solution
    }

    if (sliceResults) {
        drawResults(ctx, display, sliceResults);
    }
}

function drawPolygon(ctx: CanvasRenderingContext2D, polygon: Polygon, display: DisplayInfo, sliceStart?: Vector2D, sliceEnd?: Vector2D) {
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = display.unitSize * 0.1;

    if (sliceEnd === undefined || sliceStart === undefined || (sliceStart.x === sliceEnd.x && sliceStart.y === sliceEnd.y)) {
        ctx.fillStyle = display.theme.palette.primary.main;
        drawSinglePolygon(ctx, polygon, display);

        if (sliceStart) {
            // draw "start point" for what will become the clipping line
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(gridToScreen(sliceStart.x, display.gridMin.x, display.unitSize), gridToScreen(sliceStart.y, display.gridMin.y, display.unitSize), display.unitSize * 0.2, 0, Math.PI * 2);
            ctx.fill();
        }
        return;
    }

    const clippingInfo = getClippingInfo(display, sliceStart, sliceEnd);

    // clip on one side of the line and draw the polygon in one color
    ctx.save();
    clipPath(ctx, clippingInfo.bounds1);
    ctx.fillStyle = '#f90';
    drawSinglePolygon(ctx, polygon, display);
    ctx.restore();

    // clip on the other side of line and draw the polygon in another color
    ctx.save();
    clipPath(ctx, clippingInfo.bounds2);
    ctx.fillStyle = '#0cf';
    drawSinglePolygon(ctx, polygon, display);
    ctx.restore();
    
    // draw "extended" clipping line thinly
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(clippingInfo.extendedLine.x1, clippingInfo.extendedLine.y1);
    ctx.lineTo(clippingInfo.extendedLine.x2, clippingInfo.extendedLine.y2);
    ctx.stroke();

    // draw main clipping line thickly
    ctx.lineWidth = display.unitSize * 0.2;
    ctx.beginPath();
    ctx.moveTo(
        gridToScreen(sliceStart.x, display.gridMin.x, display.unitSize),
        gridToScreen(sliceStart.y, display.gridMin.y, display.unitSize)
    );
    ctx.lineTo(
        gridToScreen(sliceEnd.x, display.gridMin.x, display.unitSize),
        gridToScreen(sliceEnd.y, display.gridMin.y, display.unitSize)
    );
    ctx.stroke();
}

function drawBackground(ctx: CanvasRenderingContext2D, display: DisplayInfo) {
    // first, fill the background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, display.viewWidth, display.viewHeight);

    if (display.unitSize <= 1) {
        return;
    }

    // determine where to draw the top left point
    const startX = gridToScreen(Math.ceil(display.gridMin.x), display.gridMin.x, display.unitSize);
    const startY = gridToScreen(Math.ceil(display.gridMin.y), display.gridMin.y, display.unitSize);

    // draw a grid of points
    ctx.fillStyle = '#666';
    const radius = display.unitSize * 0.075;
    const twoPi = Math.PI * 2;

    ctx.beginPath();

    for (let x = startX; x <= display.viewWidth; x += display.unitSize) {
        for (let y = startY; y <= display.viewHeight; y += display.unitSize) {
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, 0, twoPi);
        }
    }

    ctx.fill();
}

function drawSinglePolygon(ctx: CanvasRenderingContext2D, polygon: Polygon, display: DisplayInfo) {
    // assume color and clip already set; just fill then stroke the shape

    ctx.beginPath();

    const firstPoint = polygon[0];

    const startX = gridToScreen(firstPoint.x, display.gridMin.x, display.unitSize);
    const startY = gridToScreen(firstPoint.y, display.gridMin.y, display.unitSize);
    ctx.moveTo(startX, startY);

    for (const point of polygon) {
        const x = gridToScreen(point.x, display.gridMin.x, display.unitSize);
        const y = gridToScreen(point.y, display.gridMin.y, display.unitSize);
        ctx.lineTo(x, y);
    }

    ctx.lineTo(startX, startY);

    ctx.globalAlpha = 0.8;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.stroke();
}

function drawResults(ctx: CanvasRenderingContext2D, display: DisplayInfo, sliceResults: SliceResult[]) {
    ctx.fillStyle = '#fff';
    
    ctx.font = `${Math.round(display.unitSize)}px ${display.theme.typography.fontFamily}`;
    ctx.globalAlpha = 0.75;
    ctx.textAlign = 'center';

    for (const result of sliceResults) {
        ctx.fillText(result.percent.toString(), gridToScreen(result.x, display.gridMin.x, display.unitSize), gridToScreen(result.y, display.gridMin.y, display.unitSize));
    }

    ctx.globalAlpha = 1;
}

function screenToGrid(val: number, offset: number, unitSize: number) {
    return Math.round(val / unitSize + offset);
}

function gridToScreen(val: number, offset: number, unitSize: number) {
    return (val - offset) * unitSize;
}

function getClippingInfo(display: DisplayInfo, sliceStart: Vector2D, sliceEnd: Vector2D) {
    // determine the "full length" version of the clipping line,
    // plus two clipping paths to use to separate each "half" of the polygon, based on that line
    
    let x1 = gridToScreen(sliceStart.x, display.gridMin.x, display.unitSize);
    let y1 = gridToScreen(sliceStart.y!, display.gridMin.y, display.unitSize);
    let x2 = gridToScreen(sliceEnd.x!, display.gridMin.x, display.unitSize);
    let y2 = gridToScreen(sliceEnd.y!, display.gridMin.y, display.unitSize);

    let bounds1;
    let bounds2;

    if (x1 === x2) {
        y1 = 0;
        y2 = display.viewHeight

        bounds1 = [
            { x: 0, y: 0 },
            { x: x1, y: 0 },
            { x: x2, y: display.viewHeight },
            { x: 0, y: display.viewHeight },
        ];

        bounds2 = [
            { x: x1, y: 0 },
            { x: display.viewWidth, y: 0 },
            { x: display.viewWidth, y: display.viewHeight },
            { x: x2, y: display.viewHeight },
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
        const xTopIntercept = (display.viewHeight - yIntercept) / gradient;

        if (gradient >= 0) {
            if (xIntercept >= 0) {
                // left end touches y=0
                x1 = xIntercept;
                y1 = 0;

                bounds1 = [ // anticlockwise
                    { x: x1, y: y1 },
                    { x: 0, y: 0 },
                    { x: 0, y: display.viewHeight },
                ];

                bounds2 = [ // clockwise
                    { x: x1, y: y1 },
                    { x: display.viewWidth, y: 0 },
                ]
            }
            else {
                // left end touches the left
                x1 = 0;
                y1 = yIntercept;

                bounds1 = [ // anticlockwise
                    { x: x1, y: y1 },
                    { x: 0, y: display.viewHeight },
                ];

                bounds2 = [ // clockwise
                    { x: x1, y: y1 },
                    { x: 0, y: 0 },
                    { x: display.viewWidth, y: 0 },
                ];
            }

            if (xTopIntercept <= display.viewWidth) {
                // right end touches y = display.viewHeight
                x2 = xTopIntercept;
                y2 = display.viewHeight;

                bounds1.push({ x: x2, y: y2 }); // anticlockwise

                bounds2.push({ x: display.viewWidth, y: display.viewHeight }); // clockwise
                bounds2.push({ x: x2, y: y2 });
            }
            else {
                // right end touches the right
                x2 = display.viewWidth;
                y2 = gradient * display.viewWidth + yIntercept;

                bounds1.push({ x: display.viewWidth, y: display.viewHeight }); // anticlockwise
                bounds1.push({ x: x2, y: y2 });

                bounds2.push({ x: x2, y: y2 }); // clockwise
            }
        }
        else {
            if (xTopIntercept >= 0) {
                // left end touches y = display.viewHeight
                x1 = xTopIntercept;
                y1 = display.viewHeight;

                bounds1 = [ // clockwise
                    { x: x1, y: y1 },
                    { x: 0, y: display.viewHeight },
                    { x: 0, y: 0 },
                ];

                bounds2 = [ // anticlockwise
                    { x: x1, y: y1 },
                    { x: display.viewWidth, y: display.viewHeight },
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
                    { x: 0, y: display.viewHeight },
                    { x: display.viewWidth, y: display.viewHeight },
                ];
            }

            if (xIntercept <= display.viewWidth) {
                // right end touches y = 0
                x2 = xIntercept;
                y2 = 0;

                bounds1.push({ x: x2, y: y2 }); // clockwise

                bounds2.push({ x: display.viewWidth, y: 0 }); // anticlockwise
                bounds2.push({ x: x2, y: y2 });
            }
            else {
                // right end touches the right
                x2 = display.viewWidth;
                y2 = gradient * display.viewWidth + yIntercept;
                bounds1.push({ x: display.viewWidth, y: 0 }); // clockwise
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

function clipPath(ctx: CanvasRenderingContext2D, bounds: Vector2D[]) {
    ctx.beginPath();

    const first = bounds.shift()!;

    ctx.moveTo(first.x, first.y);

    for (const point of bounds) {
        ctx.lineTo(point.x, point.y);
    }

    ctx.clip();
}


/*
interface IState {
    displayPolygon?: Polygon;
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
        newState.displayPolygon = props.polygon;

        this.state = newState;
    }

    componentWillReceiveProps(nextProps: IProps) {
        // Only update the polygon being displayed if we're not displaying results, otherwise hold the old one
        if (nextProps.polygon !== this.state.displayPolygon && this.state.sliceResultNumbers === undefined) {
            const newState = this.determinePolygonBounds(nextProps.polygon)
            newState.displayPolygon = nextProps.polygon;

            this.setState(newState);
        }
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevState.x2 !== this.state.x2
            || prevState.y2 !== this.state.y2
            || prevState.x1 !== this.state.x1
            || prevState.y1 !== this.state.y1
            || prevState.sliceResultNumbers !== this.state.sliceResultNumbers
            || prevState.displayPolygon !== this.state.displayPolygon
        ) {
            this.touch.redraw();
        }
    }

    componentWillUnmount() {
        this.clearResults();
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
    
    private unitSize: number;
    private minX: number;
    private minY: number;

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
            x1: this.screenToGrid(startX, display.boundsMin.x),
            y1: this.screenToGrid(startY, display.boundsMin.y),
            x2: this.screenToGrid(endX, display.boundsMin.x),
            y2: this.screenToGrid(endY, display.boundsMin.y),
        });
    }

    private sliceFinished() {
        if (this.state.x1 === undefined || this.state.y1 === undefined
            || this.state.x2 === undefined || this.state.y2 === undefined
            || this.state.displayPolygon === undefined || this.state.sliceResultNumbers !== undefined
        ) {
            this.clearResults();
            return;
        }

        // Determine areas of bisected "halfs"
        const parts = this.state.displayPolygon.bisect({ x: this.state.x1, y: this.state.y1 }, { x: this.state.x2, y: this.state.y2 });
        
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

        // Hold on to the polygon being displayed until the results are cleared, then switch it
        if (this.props.polygon !== this.state.displayPolygon) {
            const newState = this.determinePolygonBounds(this.props.polygon)
            newState.displayPolygon = this.props.polygon;

            this.setState(newState);
        }

        if (this.autoClear !== undefined) {
            clearTimeout(this.autoClear);
            this.autoClear = undefined;
        }
    }
}
*/