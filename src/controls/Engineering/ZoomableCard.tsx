import React, { CSSProperties } from 'react';
import { makeStyles } from '@material-ui/core';
import { PowerCard } from './PowerCard';
import { PowerCardInfo } from '../../data/PowerCard';

interface Props extends Omit<PowerCardInfo, 'id'> {
    className?: string;
    zoomClassName?: string;
    style?: CSSProperties;
}

export const shrinkScale = 0.8;

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        pointerEvents: 'none',
    },
    main: {
        transform: `scale(${shrinkScale})`,
        pointerEvents: 'initial',

        '&:hover': {
            opacity: 0,
        },
        '&:hover + $zoom': {
            display: 'block',
        },
    },
    zoom: {
        display: 'none',
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
    },
}));

export const ZoomableCard: React.FC<Props> = props => {
    const classes = useStyles();

    const zoomClasses = props.zoomClassName
        ? `${classes.zoom} ${props.zoomClassName}`
        : classes.zoom;

    return (
        <div className={classes.root}>
            <PowerCard
                name={props.name}
                className={classes.main}
                description={props.description}
                rarity={props.rarity}
                style={props.style}
            />
            <PowerCard
                name={props.name}
                className={zoomClasses}
                description={props.description}
                rarity={props.rarity}
            />
        </div>
    );
}
