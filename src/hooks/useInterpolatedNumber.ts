import { useSpringValue } from '@react-spring/web';
import { useRef } from 'react';

export function useInterpolatedNumber(value: number, interpolate?: boolean): () => number {
    const params = {
        config: {
            mass: interpolate === false ? 0 : 1,
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