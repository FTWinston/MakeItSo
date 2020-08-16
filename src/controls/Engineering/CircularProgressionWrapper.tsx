import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { CircularProgression } from '../common/CircularProgression';
import { Progression } from '../../data/Progression';

interface Props extends Progression {
    className?: string;
    progressClassName?: string;
    color?: 'primary' | 'secondary';
    size: number;
}

export const CircularProgressionWrapper: React.FC<Props> = props => {
    return (
        <Box position="relative" display="inline-flex" className={props.className}>
            <CircularProgression
                duration={props.duration}
                endTime={props.endTime}
                className={props.progressClassName}
                size={props.size}
            />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {props.children}
            </Box>
        </Box>
    );
}