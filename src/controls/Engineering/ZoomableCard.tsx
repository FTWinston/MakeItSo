import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { PowerCard } from './PowerCard';
import { PowerCardInfo } from '../../data/PowerCard';

interface Props extends Omit<PowerCardInfo, 'id'> {
    mainClassName?: string;
    zoomClassName?: string;
    forceZoom?: boolean;
    draggable?: boolean;
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

    const [{ dragX, dragY }, setDragPos] = useSpring(() => ({ dragX: 0, dragY: 0 }))
    const [mouseDown, setMouseDown] = useState(false);

    // Set the drag hook and define component movement based on gesture data
    const bind = useDrag(({ down, movement: [mx, my] }) => {
      setDragPos({ dragX: down ? mx : 0, dragY: down ? my : 0 });
      setMouseDown(down);
    })
    
    const forceZoom = props.draggable && mouseDown
        ? false
        : props.forceZoom;

    const zoomClasses = determineClasses(
        forceZoom,
        classes.zoom,
        classes.forceInZoom,
        classes.forceOutZoom,
        props.zoomClassName
    );

    const mainClasses = determineClasses(
        forceZoom,
        classes.main,
        classes.forceInMain,
        classes.forceOutMain,
        props.mainClassName
    );
    const mainCard = (
        <PowerCard
            type={props.type}
            name={props.name}
            className={mainClasses}
            description={props.description}
            rarity={props.rarity}
        />
    );

    const zoomCard = (
        <PowerCard
            type={props.type}
            name={props.name}
            className={zoomClasses}
            description={props.description}
            rarity={props.rarity}
        />
    )

    return props.draggable
        ? (
            <animated.div
                className={classes.root}
                {...bind()}
                style={{ x: dragX, y: dragY }}
            >
                {mainCard}
                {zoomCard}
            </animated.div>
        )
        : (
            <div className={classes.root}>
                {mainCard}
                {zoomCard}
            </div>
        );
}
