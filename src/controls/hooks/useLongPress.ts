import { useCallback, useRef, useState } from 'react';
import { Vector2D, distanceSq } from '../../data/Vector2D';

const delay = 400;

export const clickMoveLimit = 20;

const maxDistSq = clickMoveLimit * clickMoveLimit;

export function useLongPress(
    onLongPress?: (clientPosition: Vector2D) => void,
    onClick?: (clientPosition: Vector2D) => void,
) {
    const timeout = useRef<number>();
    const startPos = useRef<Vector2D>();
    const latestPos = useRef<Vector2D>();
    //const target = useRef<Element>();

    const start = useCallback(
        (event, x: number, y: number) => {
            event.persist();

            startPos.current = latestPos.current = { x, y };

            /*
            if (shouldPreventDefault && event.target) {
                event.target.addEventListener('touchend', preventDefault, { passive: false });
                target.current = event.target;
            }
            */

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
            /*
            if (shouldPreventDefault && target.current) {
                target.current.removeEventListener('touchend', preventDefault);
            }
            */
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
            // on laptop at least, touch events trigger mouse events,
            // so cells are added twice. But the touch version always does 0,0...
            if (e.changedTouches.length > 0) {
                const touch = e.changedTouches[0];
                clear();
                e.preventDefault();
            }
        },
        onMouseMove: (e: React.MouseEvent<Element>) => move(e.pageX, e.pageY),
        onTouchMove: (e: React.TouchEvent<Element>) => e.touches.length < 2
            ? move(e.touches[0].pageX, e.touches[0].pageY)
            : undefined,
    };
};

/*
function isTouchEvent(event: Event): event is TouchEvent {
    return 'touches' in event;
};

const preventDefault = (event: Event) => {
    if (isTouchEvent(event) && event.touches.length < 2 && event.preventDefault) {
        event.preventDefault();
    }
};
*/