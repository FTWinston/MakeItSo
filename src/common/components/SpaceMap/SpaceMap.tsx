import React, { forwardRef, useRef } from 'react';
import { useTheme } from '@material-ui/core';
import { useGesture } from 'react-use-gesture'
import { Canvas } from '../Canvas';
import { Vector2D } from '../../data/Vector2D';
import { ClientVessel } from '../../data/client/ClientVessel';
import { ColorName } from '../Colors';
import { clickMoveLimit } from '../../hooks/useLongPress';
import { TouchEvents } from '../TouchEvents';
import { UserHandlersPartial } from 'react-use-gesture/dist/types';
import { drawFunction, drawMap } from './drawMap';

interface Props extends TouchEvents {
    className?: string;
    gridColor: ColorName;
    dragEnabled: boolean;
    vessels: ClientVessel[];
    localVessel?: ClientVessel;
    cellRadius: number;
    setCellRadius: (radius: number) => void;
    center: Vector2D;
    setCenter: (center: Vector2D) => void;
    drawExtraForeground?: drawFunction;
    drawExtraBackground?: drawFunction;
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

    const gestureConfig: UserHandlersPartial = {
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
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onMouseLeave,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
    };

    const bind = useGesture(gestureConfig, {
        drag: {
            initial: () => [-center.x, -center.y],
            threshold: clickMoveLimit,
            enabled: dragEnabled,
        },
    });

    return (
        <Canvas
            ref={ref}
            className={props.className}
            animate={true}
            draw={draw}
            {...bind()}
        />
    )
});
