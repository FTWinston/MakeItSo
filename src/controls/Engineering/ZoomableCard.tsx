import React from 'react';
import { makeStyles } from '@material-ui/core';
import { PowerCard } from './PowerCard';
import { PowerCardInfo } from '../../data/PowerCard';

interface Props extends Omit<PowerCardInfo, 'id'> {
    mainClassName?: string;
    zoomClassName?: string;
    forceZoom?: boolean;
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
    forceInMain: {
        opacity: 0,
        pointerEvents: 'initial',
    },
    forceInZoom: {
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
    },
    forceOutMain: {
        transform: `scale(${shrinkScale})`,
        pointerEvents: 'initial',
        borderWidth: 2,
    },
    forceOutZoom: {
        display: 'none',
    }
}));

function determineClasses(force: boolean | undefined, normal: string, forceIn: string, forceOut: string, customClass?: string) {
    let mainClass: string;

    if (force === true) {
        mainClass = forceIn;
    }
    else if (force === false) {
        mainClass = forceOut;
    }
    else {
        mainClass = normal;
    }

    return customClass
        ? `${mainClass} ${customClass}`
        : mainClass;
}

export const ZoomableCard: React.FC<Props> = props => {
    const classes = useStyles();

    const zoomClasses = determineClasses(
        props.forceZoom,
        classes.zoom,
        classes.forceInZoom,
        classes.forceOutZoom,
        props.zoomClassName
    );

    const mainClasses = determineClasses(
        props.forceZoom,
        classes.main,
        classes.forceInMain,
        classes.forceOutMain,
        props.mainClassName
    );

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
