import styled from '@mui/material/styles/styled';
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { cardHeight, cardWidth, EngineeringCard } from './EngineeringCard';
import { EngineeringCardInfo } from '../types/EngineeringCard';

interface Props extends Omit<EngineeringCardInfo, 'id'> {
    forceZoom?: boolean;
    className?: string;
    dragStart?: () => void;
    dragEnd?: (x: number, y: number) => void;
}

const Root = styled('div')({
    position: 'relative',
    pointerEvents: 'none',
    width: cardWidth,
    height: cardHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const ZoomingCard = styled(EngineeringCard)({
    pointerEvents: 'initial',
    fontSize: '0.8em',
    '&:hover': {
        fontSize: '1em',
        zIndex: 1,
    },
});

const FixedCard = styled(EngineeringCard)({
    pointerEvents: 'initial',
    zIndex: 1,
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

    const Card = forceZoom === true
        ? FixedCard
        : ZoomingCard;
   
    const AnimatedRoot = animated(Root);

    return props.dragEnd
        ? (
            <AnimatedRoot
                {...bind()}
                className={props.className}
                style={{ x: dragX, y: dragY }}
            >
                <Card
                    type={props.type}
                    rarity={props.rarity}
                />
            </AnimatedRoot>
        )
        : (
            <Root className={props.className}>
                <Card
                    type={props.type}
                    rarity={props.rarity}
                />
            </Root>
        );
};
