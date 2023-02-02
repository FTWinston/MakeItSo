import { useSpringValue } from '@react-spring/web';
import { useRef } from 'react';

export function useInterpolatedNumber(value: number): () => number {
    const prevValue = useRef(value);

    const springValue = useSpringValue(value);

    if (prevValue.current !== value) {
        springValue.start(value);
        prevValue.current = value;
    }

    return () => springValue.get();
}