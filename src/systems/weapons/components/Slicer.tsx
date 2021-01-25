import React, { useState, useRef, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { Vector2D } from '../../../common/data/Vector2D';
import { Polygon } from '../../../common/data/Polygon';
import { Canvas } from '../../../common/components/Canvas';
import { useGesture } from 'react-use-gesture';
import { UserHandlersPartial } from 'react-use-gesture/dist/types';
import { DisplayInfo, drawAll, screenToGrid, calculateDisplay, determineResultDisplay } from '../logic/renderSlicer';
import { SliceResult } from '../data/SliceResult';

const useStyles = makeStyles(theme => ({
    canvas: {
        flexGrow: 1,
    },
}));

interface Props {
    requiredAccuracy: number;
    polygon?: Polygon;
    slice: (x1: number, y1: number, x2: number, y2: number) => void;
    done: () => void;
}

export const Slicer: React.FC<Props> = props => {
    const theme = useTheme();
    const classes = useStyles();

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
    const [results, setResults] = useState<SliceResult[]>([]);

    useEffect(() => {
        if (results.length === 0) {
            return;
        }

        const timeout = setTimeout(() => {
            props.done();
            setStartPos(undefined);
            setEndPos(undefined);
            setResults([]);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [results])

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
            if (startPos !== undefined || results.length > 0) {
                return;
            }

            const pos = screenToGrid(x, y, display.current!);
            
            setStartPos(pos);
            setEndPos(pos);
        },
        onDrag: ({ xy: [x, y] }) => {
            if (startPos !== undefined || results.length > 0) {
                setEndPos(screenToGrid(x, y, display.current!));
            }
        },
        onDragEnd: ({ xy: [x, y] }) => {
            if (results.length > 0) {
                return;
            }
            if (startPos === undefined || endPos === undefined || props.polygon === undefined) {
                setStartPos(undefined);
                setEndPos(undefined);
                return;
            }

            // Determine areas of bisected "halfs"
            const sliceResults = determineResultDisplay(props.polygon, startPos, endPos);

            const firstPercent = sliceResults[0].percent;
            if (firstPercent < 0.01 || firstPercent > 99.99) {
                setStartPos(undefined);
                setEndPos(undefined);
                return; // if slice was entirely outside the shape, do nothing
            }

            props.slice(startPos.x, startPos.y, endPos.x, endPos.y);
            setResults(sliceResults);
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
            draw={ctx => drawAll(ctx, display.current, props.polygon, startPos, endPos, results)}
            boundsChanged={boundsChanged}
            {...bind()}
        />
    );
}
