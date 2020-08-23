import React, { useState, useEffect } from 'react';
import { Progression, getCompletedFraction } from '../../data/Progression';
import { CircularProgress } from '@material-ui/core';
import { ColorName } from './Colors';

interface Props extends Progression {
    className?: string;
    color?: ColorName;
    size?: number;
}

export const CircularProgression: React.FC<Props> = props => {
    const [value, setValue] = useState(() => 100 * getCompletedFraction(props));

    useEffect(
        () => {
            const interval = setInterval(
                () => setValue(100 * getCompletedFraction(props)),
                200
            );

            return () => clearInterval(interval);
        },
        [props.duration, props.endTime]
    );

    return (
        <CircularProgress
            variant="static"
            className={props.className}
            color={props.color}
            value={value}
            size={props.size}
        />
    );
}