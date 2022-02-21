import { styled } from '@mui/material/styles';
import { forwardRef, PropsWithChildren } from 'react';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { EngineeringCardInfo } from '../types/EngineeringCard';
import { EngineeringCardStub } from './CardStub';

interface Props extends Omit<EngineeringCardInfo, 'id' | 'description'> {
    className?: string;
    style?: React.CSSProperties;
    dragStart?: () => void;
    dragEnd?: (x: number, y: number) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const stubPadding = '0.1em';

const Root = styled('div')({
    padding: `0 ${stubPadding}`,
    position: 'absolute',
    transition: 'left 0.5s ease-in-out',
    '&:hover > *': {
        color: 'transparent',
    },
});

const AnimatedRoot = animated(Root);

export const DraggableCardStub = forwardRef<HTMLDivElement, PropsWithChildren<Props>>((props, ref) => {
    const [{ dragX, dragY }, setDragPos] = useSpring(() => ({ dragX: 0, dragY: 0 }));
    
    // Set the drag hook and define component movement based on gesture data
    const bind = useGesture({
        onDrag: ({ down, movement: [mx, my] }) => {
            setDragPos({ dragX: down ? mx : 0, dragY: down ? my : 0 });
        },
        onDragStart: () => {
            props.dragStart?.();
        },
        onDragEnd: (e) => {
            props.dragEnd?.(e.xy[0], e.xy[1]);
        },
    }, {
        drag: { threshold: 50 },
    });

    if (props.dragEnd) {
        return (
            <AnimatedRoot
                {...bind()}
                ref={ref}
                style={{ ...props.style, x: dragX, y: dragY }}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
            >
                <EngineeringCardStub
                    type={props.type}
                    rarity={props.rarity}
                />
            </AnimatedRoot>
        );
    }
    
    return (
        <Root
            ref={ref}
            style={props.style}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            <EngineeringCardStub
                type={props.type}
                rarity={props.rarity}
            />
        </Root>
    );
});
