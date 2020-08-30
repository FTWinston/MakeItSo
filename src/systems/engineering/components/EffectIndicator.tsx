import React from 'react';
import { makeStyles, useTheme, Zoom } from '@material-ui/core';
import { ClientSystemStatusEffectInstance } from '../../../common/data/SystemStatusEffect';
import { EffectIcon } from './EffectIcon';
import { CircularProgressionWrapper } from './CircularProgressionWrapper';

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
            <CircularProgressionWrapper
                size={indicatorSize}
                duration={props.duration}
                endTime={props.endTime}
                progressClassName={classes.progress}
            >
                <EffectIcon effect={props.type} className={props.positive ? classes.iconPositive : classes.iconNegative} />
            </CircularProgressionWrapper>
        </Zoom>
    );
}