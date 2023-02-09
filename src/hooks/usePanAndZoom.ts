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

type Interpolated<T> = {
    val: T;
    interp: boolean;
}

export function usePanAndZoom(config: Config): Output {
    const [center, setCenter] = useState<Interpolated<Vector2D>>(() => ({
        val: config.getInitialCenter(),
        interp: false,
    }));

    const [zoom, setZoom] = useState<Interpolated<number>>(() => ({
        val: config.getInitialZoom(),
        interp: false,
    }));

    const getCenterValue = useInterpolatedVector2D(center.val, center.interp);
    const getZoomValue = useInterpolatedNumber(zoom.val, zoom.interp);

    const startScale = useRef<number>(zoom.val);

    const setCenterInterpolate = (center: Vector2D) => {
        setCenter({
            val: center,
            interp: true, 
        });
    }

    const setZoomInterpolate = (amount: number) => {
        if (config.minZoom !== undefined) {
            amount = Math.max(config.minZoom, amount);
        }
        
        if (config.maxZoom !== undefined) {
            amount = Math.min(config.maxZoom, amount);
        }

        setZoom({
            val: amount,
            interp: true,
        });
    }

    const gestureConfig: GestureHandlers = {
        onDrag: ({ delta: [dx, dy] }) => {
            setCenter(current => ({
                val: {
                    x: current.val.x - dx / zoom.val,
                    y: current.val.y - dy / zoom.val,
                },
                interp: false,
            }));
        },
        onPinchStart: ({ da: [distance] }) => {
            startScale.current = distance;
        },
        onPinch: ({ da: [distance] }) => {
            const scale = distance / startScale.current;
            setZoom(current => ({
                val: current.val * scale,
                interp: false,
            }));
        },
        onWheel: ({ delta: [startVal, endVal] }) => {
            const distance = startVal - endVal;
            if (distance !== 0) {
                const scale = distance > 0
                    ? 75 / distance
                    : -133.33333333333333 / distance;

                setZoom(current => ({
                    val: current.val / scale,
                    interp: true,
                }));
            }
        },
    };

    if (config.getExtraHandlers) {
        addExtraHandlers(gestureConfig, config.getExtraHandlers(center.val, zoom.val));
    }
    
    const bindGestures = useGesture(gestureConfig, {
        drag: {
            threshold: config.dragThreshold,
            enabled: config.allowPan !== false,
        },
    });

    return {
        getCenter: getCenterValue,
        setCenter: setCenterInterpolate,
        getZoom: getZoomValue,
        setZoom: setZoomInterpolate,
        bindGestures,
    };
};
