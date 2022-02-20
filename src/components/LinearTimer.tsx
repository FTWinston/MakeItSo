import React, { useState, useEffect, PropsWithChildren } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { TimeSpan } from 'src/types/TimeSpan';
import { getCompletedFraction } from 'src/utils/timeSpans';
import { ColorName } from 'src/types/Colors';
import { styled } from '@mui/material/styles';

interface Props extends TimeSpan {
    className?: string;
    color?: ColorName;
}

const Progress = styled(LinearProgress)({
    height: '0.25em',
});

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
        <Progress
            ref={ref}
            variant="determinate"
            className={props.className}
            color={props.color}
            value={value}
        />
    );
});