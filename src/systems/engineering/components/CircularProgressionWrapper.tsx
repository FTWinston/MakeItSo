import React from 'react';
import { Box } from '@material-ui/core';
import { CircularProgression } from '../../../common/components/CircularProgression';
import { Progression } from '../../../common/data/Progression';
import { ColorName } from '../../../common/components/Colors';

interface Props extends Progression {
    className?: string;
    progressClassName?: string;
    color?: ColorName;
    size: number;
}

export const CircularProgressionWrapper: React.FC<Props> = props => {
    return (
        <Box position="relative" display="inline-flex" className={props.className}>
            <CircularProgression
                startTime={props.startTime}
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