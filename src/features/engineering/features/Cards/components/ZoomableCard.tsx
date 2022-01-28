/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styled from '@mui/material/styles/styled';
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { EngineeringCard, shrinkScale } from './EngineeringCard';
import { EngineeringCardInfo } from '../types/EngineeringCard';

interface Props extends Omit<EngineeringCardInfo, 'id'> {
    forceZoom?: boolean;
    style?: React.CSSProperties;
    zoomStyle?: React.CSSProperties;
    dragStart?: () => void;
    dragEnd?: (x: number, y: number) => void;
}

const Root = styled('div')({
    position: 'relative',
    pointerEvents: 'none',
});

const MainCard = styled(EngineeringCard)({
    transform: `scale(${shrinkScale})`,
    pointerEvents: 'initial',
    borderWidth: 2,

    '&:hover': {
        opacity: 0,
    },
    '&:hover + div': {
        display: 'block',
    },
});

const ForceInMainCard = styled(EngineeringCard)({
    opacity: 0,
    pointerEvents: 'initial',
});

const ForceOutMainCard = styled(EngineeringCard)({
    transform: `scale(${shrinkScale})`,
    pointerEvents: 'initial',
    borderWidth: 2,
});

const ForceOutMainDragging = styled(EngineeringCard)({
    transform: `scale(${shrinkScale})`,
    borderWidth: 2,
});

const ZoomCard = styled(EngineeringCard)({
    display: 'none',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
});

const ForceInZoomCard = styled(EngineeringCard)({
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
});

const ForceOutZoomCard = styled(EngineeringCard)({
    display: 'none',
});

export const ZoomableCard: React.FC<Props> = props => {
    const [{ dragX, dragY }, setDragPos] = useSpring(() => ({ dragX: 0, dragY: 0 }));
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
        drag: { threshold: 50 },
    });
    
    const forceZoom = props.dragEnd && dragging
        ? false
        : props.forceZoom;

    const ZoomCardComponent = forceZoom === true
        ? ForceInZoomCard
        : forceZoom === false
            ? ForceOutZoomCard
            : ZoomCard;

    const MainCardComponent = forceZoom === true
        ? ForceInMainCard
        : forceZoom === false
            ? (dragging ? ForceOutMainDragging : ForceOutMainCard)
            : MainCard;
   
    const AnimatedRoot = animated(Root);

    return props.dragEnd
        ? (
            <AnimatedRoot
                {...bind()}
                style={{ x: dragX, y: dragY }}
            >
                <MainCardComponent
                    type={props.type}
                    rarity={props.rarity}
                    style={props.style}
                />
                <ZoomCardComponent
                    type={props.type}
                    rarity={props.rarity}
                    style={props.zoomStyle}
                />
            </AnimatedRoot>
        )
        : (
            <Root>
                <MainCardComponent
                    type={props.type}
                    rarity={props.rarity}
                    style={props.style}
                />
                <ZoomCardComponent
                    type={props.type}
                    rarity={props.rarity}
                    style={props.zoomStyle}
                />
            </Root>
        );
};
