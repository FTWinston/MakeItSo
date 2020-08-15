import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, makeStyles, useTheme, Zoom } from '@material-ui/core';
import { ClientSystemStatusEffectInstance } from '../../data/SystemStatusEffect';
import { EffectIcon } from './EffectIcon';
import { getCompletedFraction } from '../../data/Countdown';

interface Props extends ClientSystemStatusEffectInstance {
    className?: string;
}

const useStyles = makeStyles(theme => ({
    progress: {
        color: theme.palette.text.hint,
    },
    iconPositive: {
        color: theme.palette.success.main,
    },
    iconNegative: {
        color: theme.palette.error.main,
    }
}));

export const indicatorSize = 32;

export const EffectIndicator: React.FC<Props> = props => {
    const classes = useStyles();

    const [value, setValue] = useState(100 * getCompletedFraction(props));

    useEffect(
        () => {
            const interval = setInterval(
                () => setValue(100 * getCompletedFraction(props)),
                200
            );

            return () => clearInterval(interval);
        },
        []
    );

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (
        <Zoom
            in={value < 100}
            timeout={transitionDuration}
            unmountOnExit
            >
            <Box position="relative" display="inline-flex" className={props.className}>
                <CircularProgress 
                    variant="static"
                    value={value}
                    className={classes.progress}
                    size={indicatorSize}
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
                    <EffectIcon effect={props.type} className={props.positive ? classes.iconPositive : classes.iconNegative} />
                </Box>
            </Box>
        </Zoom>
    );
}