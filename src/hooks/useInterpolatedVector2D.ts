import { useSpringValue } from '@react-spring/web';
import { useRef } from 'react';
import { Vector2D } from 'src/types/Vector2D';

export function useInterpolatedVector2D(value: Vector2D, springMass?: number): () => Vector2D {
    const prevValue = useRef(value);

    const params = {
        config: {
            mass: springMass
        }
    };

    const springValueX = useSpringValue(value.x, params);
    const springValueY = useSpringValue(value.y, params);

    if (prevValue.current !== value) {
        springValueX.start(value.x, params);
        springValueY.start(value.y, params);
        prevValue.current = value;
    }

    return () => ({
        x: springValueX.get(),
        y: springValueY.get()
    });
}