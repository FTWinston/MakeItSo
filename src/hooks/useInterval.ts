import { DependencyList, useEffect } from 'react';

export function useInterval(
    callback: () => void,
    ms: number,
    deps?: DependencyList | undefined,
    setCondition?: boolean,
    runImmediately?: boolean
) {
    useEffect(() => {
        if (setCondition === false) {
            return;
        }

        if (runImmediately === true) {
            callback();
        }

        const interval = setInterval(callback, ms);
        return () => clearInterval(interval);
    }, deps);
};
