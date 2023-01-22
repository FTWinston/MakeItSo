import { GestureHandlers, useGesture } from '@use-gesture/react';
import { useRef } from 'react';
import type { TouchEvents } from 'src/types/TouchEvents';
import type { Vector2D } from 'src/types/Vector2D';

interface Config {
    center: Vector2D,
    setCenter: (newCenter: Vector2D) => void,
    dragThreshold?: number;
    zoom: number,
    setZoom: (newZoomAmount: number) => void,
    minZoom?: number;
    maxZoom?: number;
    extraHandlers?: TouchEvents;
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

export function usePanAndZoom(config: Config) {
    const startScale = useRef<number>(config.zoom);

    const setZoom = (amount: number) => {
        if (config.minZoom !== undefined) {
            amount = Math.max(config.minZoom, amount);
        }
        
        if (config.maxZoom !== undefined) {
            amount = Math.min(config.maxZoom, amount);
        }

        config.setZoom(amount);
    }

    const gestureConfig: GestureHandlers = {
        onDrag: ({ delta: [dx, dy] }) => {
            config.setCenter({
                x: config.center.x - dx / config.zoom,
                y: config.center.y - dy / config.zoom,
            });
        },
        onPinchStart: ({ da: [distance] }) => {
            startScale.current = distance;
        },
        onPinch: ({ da: [distance] }) => {
            const scale = distance / startScale.current;
            setZoom(config.zoom * scale);
        },
        onWheel: ({ delta: [startVal, endVal] }) => {
            const distance = startVal - endVal;
            if (distance !== 0) {
                const scale = distance > 0
                    ? 75 / distance
                    : -133.33333333333333 / distance;

                setZoom(config.zoom / scale);
            }
        },
    };

    if (config.extraHandlers) {
        addExtraHandlers(gestureConfig, config.extraHandlers);
    }
    
    return useGesture(gestureConfig, {
        drag: {
            //from: () => [-config.center.x, -config.center.y],
            threshold: config.dragThreshold,
            enabled: !!config.setCenter,
        },
    });
};
