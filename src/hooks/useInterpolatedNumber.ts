import { useSpringValue } from '@react-spring/web';
import { useRef } from 'react';

export function useInterpolatedNumber(value: number, interpolate?: boolean): () => number {
    const params = {
        config: {
            tension: interpolate ? 170 : 10000,
            friction: interpolate ? 26 : 100,
        }
    };
    
    const prevValue = useRef(value);
    const springValue = useSpringValue(value, params);

    if (prevValue.current !== value) {
        springValue.start(value, params);
        prevValue.current = value;
    }

    return () => springValue.get();
}