import { useState } from 'react';

export function useToggle(): [number, () => void] {
    const [value, setValue] = useState(false);
    return [value ? 1 : 0, () => setValue(val => !val)];
}