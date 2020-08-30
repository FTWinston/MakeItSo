import { useCallback, useRef } from 'react';
import { Vector2D, distanceSq } from '../data/Vector2D';
import { TouchEvents } from '../components/TouchEvents';

const delay = 400;

export const clickMoveLimit = 20;

const maxDistSq = clickMoveLimit * clickMoveLimit;

export function useLongPress(
    onLongPress?: (clientPosition: Vector2D) => void,
    onClick?: (clientPosition: Vector2D) => void,
): TouchEvents {
    const timeout = useRef<number>();
    const startPos = useRef<Vector2D>();
    const latestPos = useRef<Vector2D>();

    const start = useCallback(
        (event, x: number, y: number) => {
            event.persist();

            startPos.current = latestPos.current = { x, y };

            timeout.current = setTimeout(() => {
                if (onLongPress && distanceSq(latestPos.current!, startPos.current!) < maxDistSq) {
                    window.navigator.vibrate?.(50);
                    onLongPress(startPos.current!);
                }
                
                startPos.current = latestPos.current = undefined;
                timeout.current = undefined;
            }, delay) as unknown as number;
        },
        [onLongPress, startPos, latestPos]
    );

    const clear = useCallback(
        (shouldTriggerClick: boolean = true) => {
            if (timeout.current) {
                clearTimeout(timeout.current);
                timeout.current = undefined;
                
                if (shouldTriggerClick && onClick && distanceSq(latestPos.current!, startPos.current!) < maxDistSq) {
                    onClick(startPos.current!);
                }
                
                timeout.current = undefined;
            }

            startPos.current = latestPos.current = undefined;
        },
        [onClick, startPos, latestPos]
    );

    const move = useCallback(
        (x: number, y: number) => {
            if (startPos.current) {
                latestPos.current = {
                    x,
                    y,
                };
            }
        },
        []
    );

    return {
        onMouseDown: (e: React.MouseEvent<Element, MouseEvent>) => {
            start(e, e.pageX, e.pageY)
        },
        onTouchStart: (e: React.TouchEvent<Element>) => {
            if (e.touches.length < 2) {
                const touch = e.touches[0];
                start(e, touch.pageX, touch.pageY);
            }
        },
        onMouseUp: (e: React.MouseEvent<Element, MouseEvent>) => {
            clear();
        },
        onMouseLeave: (e: React.MouseEvent<Element, MouseEvent>) => clear(false),
        onTouchEnd: (e: React.TouchEvent<Element>) => {
            clear();
            e.preventDefault();
        },
        onMouseMove: (e: React.MouseEvent<Element>) => move(e.pageX, e.pageY),
        onTouchMove: (e: React.TouchEvent<Element>) => e.touches.length < 2
            ? move(e.touches[0].pageX, e.touches[0].pageY)
            : undefined,
    };
};
