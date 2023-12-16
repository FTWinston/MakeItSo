import { PropsWithChildren, useRef } from 'react';
import { Box, styled } from 'src/lib/mui';

const Outer = styled(Box)({
    display: 'flex',
    overflowX: 'auto',
    flexGrow: 1,
})

const Inner = styled(Box)({
    display: 'inline-flex',
    position: 'relative',
})

export const HorizontalScroll: React.FC<PropsWithChildren> = props => {
    const outerRef = useRef<HTMLDivElement>();

    return (
        <Outer
            ref={outerRef}
            onWheelCapture={e => {    
                if (outerRef.current && e.deltaY !== 0) {
                    e.preventDefault();
                    outerRef.current.scrollLeft += e.deltaY;
                }
            }}
        >
            <Inner>
                {props.children}
            </Inner>
        </Outer>
    );
};
