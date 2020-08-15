import React from 'react';
import { Box, makeStyles, useTheme, Zoom } from '@material-ui/core';
import { ClientSystemStatusEffectInstance } from '../../data/SystemStatusEffect';
import { EffectIcon } from './EffectIcon';
import { CircularProgression } from '../common/CircularProgression';

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

    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (
        <Zoom
            in={true}
            timeout={transitionDuration}
            unmountOnExit
            >
            <Box position="relative" display="inline-flex" className={props.className}>
                <CircularProgression
                    duration={props.duration}
                    endTime={props.endTime}
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