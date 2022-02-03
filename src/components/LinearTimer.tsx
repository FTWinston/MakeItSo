import React, { useState, useEffect, PropsWithChildren } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { TimeSpan } from 'src/types/TimeSpan';
import { getCompletedFraction } from 'src/utils/timeSpans';
import { ColorName } from 'src/types/Colors';

interface Props extends TimeSpan {
    className?: string;
    color?: ColorName;
}

export const LinearTimer = React.forwardRef<HTMLDivElement, PropsWithChildren<Props>>((props, ref) => {
    const { startTime, endTime } = props;
    const [value, setValue] = useState(() => 100 * getCompletedFraction(startTime, endTime));

    useEffect(
        () => {
            const interval = setInterval(
                () => setValue(100 * getCompletedFraction(startTime, endTime)),
                200
            );

            return () => clearInterval(interval);
        },
        [startTime, endTime]
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