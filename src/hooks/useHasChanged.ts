import { useRef } from 'react';

export function useHasChanged<T>(
    value: T
): boolean {
    const ref = useRef<T>();

    const returnVal = ref.current === value;

    ref.current = value;

    return returnVal;
};
