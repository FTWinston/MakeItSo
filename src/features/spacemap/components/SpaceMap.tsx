import { forwardRef, useRef } from 'react';
import { GestureHandlers, useGesture } from '@use-gesture/react'
import { clickMoveLimit } from 'src/hooks/useLongPress';
import { drawFunction, drawMap } from '../utils/drawMap';
import { Canvas } from 'src/components/Canvas';
import { TouchEvents } from 'src/types/TouchEvents';
import { ColorName, SxProps, useTheme } from 'src/lib/mui';
import { Vector2D } from 'src/types/Vector2D';
import { VesselInfo } from 'src/types/VesselInfo';

interface Props extends TouchEvents {
    className?: string;
    gridColor: ColorName;
    dragEnabled: boolean;
    vessels: VesselInfo[];
    localVessel?: VesselInfo;
    cellRadius: number;
    setCellRadius: (radius: number) => void;
    center: Vector2D;
    setCenter: (center: Vector2D) => void;
    drawExtraForeground?: drawFunction;
    drawExtraBackground?: drawFunction;
    sx?: SxProps
}

export const SpaceMap = forwardRef<HTMLCanvasElement, Props>((props, ref) => {
    const theme = useTheme();

    const {
        gridColor,
        dragEnabled,
        cellRadius,
        setCellRadius,
        center,
        setCenter,
        drawExtraForeground,
        drawExtraBackground,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onMouseLeave,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
    } = props;

    const startDistance = useRef<number>(32);

    const draw = (ctx: CanvasRenderingContext2D, bounds: DOMRect) => {
        drawMap(ctx, bounds, theme, gridColor, cellRadius, center, props.vessels, props.localVessel, drawExtraBackground, drawExtraForeground);
    };

    const gestureConfig: GestureHandlers = {
        onDrag: ({ movement: [mx, my] }) => {
            if (dragEnabled) {
                setCenter({
                    x: -mx,
                    y: -my,
                });
            }
        },
        onPinchStart: ({ da: [distance] }) => {
            startDistance.current = distance;
        },
        onPinch: ({ da: [distance] }) => {
            const scale = distance / startDistance.current;
            setCellRadius(Math.max(16, cellRadius * scale));
        },
        onWheel: ({ delta: [startVal, endVal] }) => {
            const distance = startVal - endVal;
            if (distance !== 0) {
                const scale = distance > 0
                    ? 75 / distance
                    : -133.33333333333333 / distance;

                const newRadius = Math.min(192, Math.max(16, cellRadius / scale));
                setCellRadius(newRadius);
            }
        }
    };

    if (onMouseDown) {
        gestureConfig.onMouseDown = ({ event }) => onMouseDown(event as any);
    }
    if (onMouseUp) {
        gestureConfig.onMouseUp = ({ event }) => onMouseUp(event as any);
    }
    if (onMouseMove) {
        gestureConfig.onMouseMove = ({ event }) => onMouseMove(event as any);
    }
    if (onMouseLeave) {
        gestureConfig.onMouseLeave = ({ event }) => onMouseLeave(event as any);
    }
    if (onTouchStart) {
        gestureConfig.onTouchStart = ({ event }) => onTouchStart(event as any);
    }
    if (onTouchEnd) {
        gestureConfig.onTouchEnd = ({ event }) => onTouchEnd(event as any);
    }
    if (onTouchMove) {
        gestureConfig.onTouchMove = ({ event }) => onTouchMove(event as any);
    }
    
    const bind = useGesture(gestureConfig, {
        drag: {
            from: () => [-center.x, -center.y],
            threshold: clickMoveLimit,
            enabled: dragEnabled,
        },
    });

    return (
        <Canvas
            ref={ref}
            className={props.className}
            sx={props.sx}
            animate={true}
            draw={draw}
            {...bind()}
        />
    )
});
