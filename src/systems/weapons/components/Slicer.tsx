import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { Vector2D } from '../../../common/data/Vector2D';
import { Polygon } from '../../../common/data/Polygon';
import { Canvas } from '../../../common/components/Canvas';
import { useGesture } from 'react-use-gesture';
import { UserHandlersPartial } from 'react-use-gesture/dist/types';
import { DisplayInfo, drawAll, screenToGrid, calculateDisplay } from './renderSlicer';
import { SliceResult } from '../data/SliceResult';

const useStyles = makeStyles(theme => ({
    canvas: {
        flexGrow: 1,
    },
}));

interface Props {
    requiredAccuracy: number;
    polygon?: Polygon;
    fire: (x1: number, y1: number, x2: number, y2: number) => void;
}

export const Slicer: React.FC<Props> = props => {
    const theme = useTheme();
    const classes = useStyles();

    // This seems to be in grid space, rather than screen space.
    const display = useRef<DisplayInfo>({
        pageOffset: { x: 0, y: 0 },
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
            display.current = calculateDisplay(canvas.current!, theme, props.polygon);
        },
        [props.polygon, theme]
    );

    const boundsChanged = () => {
        display.current = calculateDisplay(canvas.current!, theme, props.polygon);
    };

    const gestureConfig: UserHandlersPartial = {
        onDragStart: ({ initial: [x, y] }) => {
            // TODO: don't start again while still displaying slice results
            if (startPos !== undefined) {
                return;
            }

            const pos = screenToGrid(x, y, display.current!);
            
            setStartPos(pos);
            setEndPos(pos);
        },
        onDrag: ({ xy: [x, y] }) => {
            if (startPos !== undefined) {
                setEndPos(screenToGrid(x, y, display.current!));
            }
        },
        onDragEnd: ({ lastOffset: [x, y] }) => {
            // TODO: logic from sliceFinished();
            setStartPos(undefined);
            setEndPos(undefined);
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
            draw={ctx => drawAll(ctx, display.current, props.polygon, startPos, endPos, sliceResults)}
            boundsChanged={boundsChanged}
            {...bind()}
        />
    );
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