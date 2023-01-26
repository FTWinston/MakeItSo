import { useRef, useEffect, forwardRef, useState, CSSProperties, useLayoutEffect } from 'react';
import { styled, SxProps } from 'src/lib/mui';
import { TouchEvents } from 'src/types/TouchEvents';

interface Props extends TouchEvents<HTMLCanvasElement> {
    className?: string;
    sx?: SxProps;
    'aria-label'?: string;
    animate?: boolean;
    boundsChanged?: (bounds: DOMRect) => void;
    draw: (context: CanvasRenderingContext2D, bounds: DOMRect) => void;
}

const defaultBounds = new DOMRect(0, 0, 1, 1);

const Root = styled('div')({
    position: 'relative',
});

const Display = styled('canvas')({
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    touchAction: 'none', // This is wanted for a pannable canvas, but do we want it on all of them?
});

export const Canvas = forwardRef<HTMLCanvasElement, Props>((props, ref) => {
    const outerRef = useRef<HTMLDivElement>(null);
    let canvasRef = useRef<HTMLCanvasElement>(null);

    if (ref) {
        canvasRef = ref as React.RefObject<HTMLCanvasElement>;
    }
    
    const [bounds, setBounds] = useState<DOMRect>(defaultBounds);
    
    const [context, setContext] = useState<CanvasRenderingContext2D>();

    const {
        className,
        sx,
        animate,
        boundsChanged,
        draw,
        'aria-label': label,
        ...interactionProps
    } = props;

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
                    
                    if (boundsChanged) {
                        boundsChanged(bounds);
                    }

                    setBounds(bounds);
                }
            };

            updateCanvasSize();

            const resizeObserver = new ResizeObserver(() => updateCanvasSize());
            resizeObserver.observe(outerRef.current!);

            return () => resizeObserver.disconnect();
        },
        [boundsChanged]
    );

    return (
        <Root
            className={className}
            sx={sx}
            ref={outerRef}
            aria-label={label}
        >
            <Display
                style={displaySizeStyle}
                ref={ref}
                {...interactionProps}
            />
        </Root>
    );
})
