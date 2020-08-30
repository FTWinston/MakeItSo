import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import { EngineeringCard } from './EngineeringCard';
import { EngineeringCardInfo } from '../data/EngineeringCard';

interface Props extends Omit<EngineeringCardInfo, 'id'> {
    mainClassName?: string;
    zoomClassName?: string;
    forceZoom?: boolean;
    dragStart?: () => void;
    dragEnd?: (x: number, y: number) => void;
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
    forceOutMainDragging: {
        transform: `scale(${shrinkScale})`,
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
    const [dragging, setDragging] = useState(false);

    // Set the drag hook and define component movement based on gesture data
    const bind = useGesture({
        onDrag: ({ down, movement: [mx, my] }) => {
            setDragPos({ dragX: down ? mx : 0, dragY: down ? my : 0 });
        },
        onDragStart: () => {
            setDragging(true);
            if (props.dragStart) {
                props.dragStart();
            }
        },
        onDragEnd: (e) => {
            setDragging(false);
            if (props.dragEnd) {
                props.dragEnd(e.xy[0], e.xy[1]);
            }
        },
    }, {
        drag: { threshold: 50 }
    });
    
    const forceZoom = props.dragEnd && dragging
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
        dragging ? classes.forceOutMainDragging : classes.forceOutMain,
        props.mainClassName
    );
    const mainCard = (
        <EngineeringCard
            type={props.type}
            name={props.name}
            className={mainClasses}
            description={props.description}
            rarity={props.rarity}
        />
    );

    const zoomCard = (
        <EngineeringCard
            type={props.type}
            name={props.name}
            className={zoomClasses}
            description={props.description}
            rarity={props.rarity}
        />
    )

    return props.dragEnd
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
