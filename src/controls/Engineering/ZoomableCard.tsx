import React, { CSSProperties } from 'react';
import { makeStyles } from '@material-ui/core';
import { PowerCard } from './PowerCard';
import { PowerCardInfo } from '../../data/PowerCard';

interface Props extends Omit<PowerCardInfo, 'id'> {
    mainClassName?: string;
    zoomClassName?: string;
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
        borderWidth: 2,

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

    const mainClasses = props.mainClassName
        ? `${classes.main} ${props.mainClassName}`
        : classes.main;

    return (
        <div className={classes.root}>
            <PowerCard
                name={props.name}
                className={mainClasses}
                description={props.description}
                rarity={props.rarity}
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
