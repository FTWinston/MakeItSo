import { useSpringValue } from '@react-spring/web';
import { useRef } from 'react';

export function useInterpolatedNumber(value: number, interpolate?: boolean): () => number {
    const prevValue = useRef(value);

    const params = {
        config: {
            mass: interpolate === false ? 0 : 1,
        }
    };

    const springValue = useSpringValue(value, params);

    // TODO: also keep springMass in a ref, and update if it changes?! 
    if (prevValue.current !== value) {
        springValue.start(value, params);
        prevValue.current = value;
    }

    return () => springValue.get();
}