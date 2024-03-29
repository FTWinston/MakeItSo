import { useState, PropsWithChildren, forwardRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { TimeSpan } from 'src/types/TimeSpan';
import { getCompletedFraction } from 'src/utils/timeSpans';
import { ColorName } from './Colors';
import { useInterval } from 'src/hooks/useInterval';

interface Props extends TimeSpan {
    className?: string;
    color?: ColorName;
    'aria-label'?: string;
    size?: string | number;
}

export const CircularTimer = forwardRef<HTMLDivElement, PropsWithChildren<Props>>((props, ref) => {
    const { startTime, endTime } = props;
    const [value, setValue] = useState(() => 100 * getCompletedFraction(startTime, endTime));

    useInterval(
        () => setValue(100 * getCompletedFraction(startTime, endTime)),
        200, [startTime, endTime]
    );

    return (
        <CircularProgress
            ref={ref}
            variant="determinate"
            aria-label={props['aria-label']}
            className={props.className}
            color={props.color}
            value={value}
            size={props.size}
        />
    );
});