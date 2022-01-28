import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { TimeSpan } from 'src/types/TimeSpan';
import { getCompletedFraction } from 'src/utils/timeSpans';
import { ColorName } from 'src/types/Colors';

interface Props extends TimeSpan {
    className?: string;
    color?: ColorName;
    size?: number;
}

export const CircularProgression: React.FC<Props> = props => {
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
        <CircularProgress
            variant="determinate"
            className={props.className}
            color={props.color}
            value={value}
            size={props.size}
        />
    );
};