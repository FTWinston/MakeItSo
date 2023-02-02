import { useSpringValue } from '@react-spring/web';
import { useRef } from 'react';
import { Vector2D } from 'src/types/Vector2D';

export function useInterpolatedVector2D(value: Vector2D): () => Vector2D {
    const prevValue = useRef(value);

    const springValueX = useSpringValue(value.x);
    const springValueY = useSpringValue(value.y);

    if (prevValue.current !== value) {
        springValueX.start(value.x);
        springValueY.start(value.y);
        prevValue.current = value;
    }

    return () => ({
        x: springValueX.get(),
        y: springValueY.get()
    });
}