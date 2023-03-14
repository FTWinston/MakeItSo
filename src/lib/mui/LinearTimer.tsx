import { useState, PropsWithChildren, forwardRef } from 'react';
import { LinearProgress } from './LinearProgress';
import { TimeSpan } from 'src/types/TimeSpan';
import { getCompletedFraction } from 'src/utils/timeSpans';
import { ColorName } from './Colors';
import { useInterval } from 'src/hooks/useInterval';

interface Props extends TimeSpan {
    className?: string;
    color?: ColorName;
}

export const LinearTimer = forwardRef<HTMLDivElement, PropsWithChildren<Props>>((props, ref) => {
    const { startTime, endTime } = props;
    const [value, setValue] = useState(() => 100 * getCompletedFraction(startTime, endTime));

    useInterval(
        () => setValue(100 * getCompletedFraction(startTime, endTime)),
        200, [startTime, endTime]
    );

    return (
        <LinearProgress
            ref={ref}
            variant="determinate"
            className={props.className}
            color={props.color}
            value={value}
        />
    );
});