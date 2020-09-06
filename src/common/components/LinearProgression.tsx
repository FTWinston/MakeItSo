import React, { useState, useEffect } from 'react';
import { Progression, getCompletedFraction } from '../data/Progression';
import { LinearProgress } from '@material-ui/core';
import { ColorName } from './Colors';

interface Props extends Progression {
    className?: string;
    color?: ColorName;
}

export const LinearProgression: React.FC<Props> = props => {
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
            variant="determinate"
            className={props.className}
            color={props.color}
            value={value}
        />
    );
}