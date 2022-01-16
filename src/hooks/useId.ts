import { useRef } from 'react';
import { newid } from 'src/utils/newid';

/**
 * Generate a new random ID that is consistent between renders, by calling {@link newid}.
 */
export function useId(): string {
    const id = useRef<string>();

    let value = id.current;

    if (value === undefined) {
        value = id.current = newid();
    }

    return value;
}