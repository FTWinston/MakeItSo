import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { EffectIndicatorData, EffectIndicator, indicatorSize } from './EffectIndicator';

interface Props {
    className?: string;
    effects: EffectIndicatorData[];
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    item: {
        position: 'absolute',
        top: 0,
        transition: 'left 1s ease-in-out',
    },
}));

export const EffectIndicators: React.FC<Props> = props => {
    const classes = useStyles();
    
    const rootClass = props.className
        ? `${classes.root} ${props.className}`
        : classes.root;

    return (
        <Box position="relative" display="flex" className={rootClass}>
            {props.effects.map((effect, index) => {
                const style = {
                    left: `calc((100% - ${indicatorSize}px) * ${index} / ${props.effects.length})`,
                }
                return (
                    <div className={classes.item} key={index} style={style}>
                        <EffectIndicator {...effect} />
                    </div>
                )
            })}
        </Box>
    );
}