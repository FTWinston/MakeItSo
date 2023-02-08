import { GestureHandlers, useGesture } from '@use-gesture/react';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';
import { useRef, useState } from 'react';
import type { TouchEvents } from 'src/types/TouchEvents';
import type { Vector2D } from 'src/types/Vector2D';
import { useInterpolatedNumber } from './useInterpolatedNumber';
import { useInterpolatedVector2D } from './useInterpolatedVector2D';

interface Config {
    getInitialCenter: () => Vector2D,
    dragThreshold?: number;
    getInitialZoom: () => number,
    minZoom?: number;
    maxZoom?: number;
    allowPan?: boolean;
    allowZoom?: boolean;
    getExtraHandlers?: (center: Vector2D, zoom: number) => TouchEvents;
}

export type GestureBinding = () => ReactDOMAttributes;

interface Output {
    getCenter: () => Vector2D,
    setCenter: (newCenter: Vector2D) => void,
    getZoom: () => number;
    setZoom: (newZoom: number) => void;
    bindGestures: GestureBinding;
}

function addExtraHandlers(gestureConfig: GestureHandlers, extraHandlers: TouchEvents) {
    const {
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onMouseLeave,
        onTouchStart,
        onTouchEnd,
        onTouchMove,
    } = extraHandlers;

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
}

export function usePanAndZoom(config: Config): Output {
    const [center, setCenter] = useState<Vector2D>(config.getInitialCenter());
    const [zoom, setZoomUnbounded] = useState<number>(config.getInitialZoom());

    const getCenter = useInterpolatedVector2D(center);
    const getZoom = useInterpolatedNumber(zoom);

    const startScale = useRef<number>(zoom);

    const setZoomBounded = (amount: number) => {
        if (config.minZoom !== undefined) {
            amount = Math.max(config.minZoom, amount);
        }
        
        if (config.maxZoom !== undefined) {
            amount = Math.min(config.maxZoom, amount);
        }

        setZoomUnbounded(amount);
    }

    const gestureConfig: GestureHandlers = {
        onDrag: ({ delta: [dx, dy] }) => {
            setCenter({
                x: center.x - dx / zoom * 1.85,
                y: center.y - dy / zoom * 1.85,
            });
        },
        onPinchStart: ({ da: [distance] }) => {
            startScale.current = distance;
        },
        onPinch: ({ da: [distance] }) => {
            const scale = distance / startScale.current;
            setZoomUnbounded(zoom * scale);
        },
        onWheel: ({ delta: [startVal, endVal] }) => {
            const distance = startVal - endVal;
            if (distance !== 0) {
                const scale = distance > 0
                    ? 75 / distance
                    : -133.33333333333333 / distance;

                setZoomUnbounded(zoom / scale);
            }
        },
    };

    if (config.getExtraHandlers) {
        addExtraHandlers(gestureConfig, config.getExtraHandlers(center, zoom));
    }
    
    const bindGestures = useGesture(gestureConfig, {
        drag: {
            //from: () => [-center.x, -center.y],
            threshold: config.dragThreshold,
            enabled: config.allowPan !== false,
        },
    });

    return {
        getCenter,
        setCenter,
        getZoom,
        setZoom: setZoomBounded,
        bindGestures,
    };
};
