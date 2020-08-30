import React, { useRef, useEffect, forwardRef, useState, CSSProperties, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import ResizeObserver from 'resize-observer-polyfill';
import { TouchEvents } from './TouchEvents';

interface Props extends TouchEvents {
    className?: string;
    animate?: boolean;
    draw: (context: CanvasRenderingContext2D, bounds: DOMRect) => void;
}

const defaultBounds = new DOMRect(0, 0, 1, 1);

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
    
    const [bounds, setBounds] = useState<DOMRect>(defaultBounds);
    
    const [context, setContext] = useState<CanvasRenderingContext2D>();

    const { draw, animate } = props;

    useLayoutEffect(
        () => {    
            if (!context) {
                setContext(canvasRef.current?.getContext('2d') ?? undefined);
                return;
            }

            let identifier: number | undefined;

            const performDraw = () => {
                identifier = undefined;
                context.save();

                context.translate(-bounds.x, -bounds.y);
                context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);

                draw(context, bounds);
                
                context.restore();

                if (animate) {
                    identifier = requestAnimationFrame(performDraw);
                }
            };

            if (animate) {
                identifier = requestAnimationFrame(performDraw);
            }
            else {
                performDraw();
            }

            return () => {
                if (identifier !== undefined) {
                    cancelAnimationFrame(identifier);
                }
            };
        },
        [draw, animate, context, bounds]
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
                    
                    setBounds(bounds);
                }
            };

            updateCanvasSize();

            const resizeObserver = new ResizeObserver(() => updateCanvasSize());
            resizeObserver.observe(outerRef.current!);

            return () => resizeObserver.disconnect();
        },
        []
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
                onClick={props.onClick}
                onMouseDown={props.onMouseDown}
                onMouseUp={props.onMouseUp}
                onMouseMove={props.onMouseMove}
                onMouseLeave={props.onMouseLeave}
                onTouchStart={props.onTouchStart}
                onTouchEnd={props.onTouchEnd}
                onTouchMove={props.onTouchMove}
            />
        </div>
    );
})
