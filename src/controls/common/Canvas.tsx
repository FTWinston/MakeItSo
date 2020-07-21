import React, { useMemo, useRef, useEffect, forwardRef, useState, CSSProperties } from 'react';
import { makeStyles } from '@material-ui/core';
import ResizeObserver from 'resize-observer-polyfill';

interface Props {
    className?: string;
    boundsChanged: (bounds: DOMRect) => void;
    onClick?: (x: number, y: number) => void;
}

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
    },
    display: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
}));

export const Canvas = forwardRef<HTMLCanvasElement, Props>((props, ref) => {
    const classes = useStyles();

    const outerRef = useRef<HTMLDivElement>(null);
    let canvasRef = useRef<HTMLCanvasElement>(null);

    if (ref) {
        canvasRef = ref as React.RefObject<HTMLCanvasElement>;
    }

    const { onClick, boundsChanged } = props;

    // TODO: replicate this for onMouseDown etc?
    const onCanvasClick = useMemo(
        () => {
            if (!onClick || !outerRef.current) {
                return undefined;
            }

            const outer = outerRef.current;

            return (e: React.MouseEvent<HTMLCanvasElement>) => {
                const { x, y } = resolvePosition(e, outer);

                onClick(x, y);
            }
        },
        [onClick]
    );

    const [displaySizeStyle, setDisplaySizeStyle] = useState<CSSProperties>();

    useEffect(
        () => {
            const display = canvasRef.current;

            if (!display) {
                return;
            }

            const updateCanvasSize = () => {
                const displayWidth = outerRef.current!.clientWidth;
                const displayHeight = outerRef.current!.clientHeight;

                if (display.width !== displayWidth || display.height !== displayHeight) {
                    display.width = displayWidth;
                    display.height = displayHeight;

                    setDisplaySizeStyle({
                        width: `${displayWidth}px`,
                        height: `${displayHeight}px`,
                    });

                    const bounds = new DOMRect(
                        0,
                        0,
                        displayWidth,
                        displayHeight
                    );
                    
                    boundsChanged(bounds);
                }
            };

            updateCanvasSize();

            const resizeObserver = new ResizeObserver(() => updateCanvasSize());
            resizeObserver.observe(outerRef.current!);

            return () => resizeObserver.disconnect();
        },
        [boundsChanged]
    );

    const rootClasses = props.className
        ? `${classes.root} ${props.className}`
        : classes.root;

    return (
        <div className={rootClasses} ref={outerRef}>
            <canvas
                className={classes.display}
                style={displaySizeStyle}
                ref={ref}
                onClick={onCanvasClick}
            />
        </div>
    );
})

function resolvePosition(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>, outer: HTMLDivElement) {
    const scroller = e.currentTarget;
    const outerBounds = outer.getBoundingClientRect();
    
    return {
        x: e.clientX - outerBounds.left + scroller.scrollLeft,
        y: e.clientY - outerBounds.top + scroller.scrollTop,
    };
}
