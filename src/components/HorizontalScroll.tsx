import { PropsWithChildren } from 'react';
import { Box, styled } from 'src/lib/mui';

const Outer = styled(Box)({
    overflowX: 'auto',
    flexGrow: 1,
})

const Inner = styled(Box)({
    display: 'inline-block',
    position: 'relative',
})

export const HorizontalScroll: React.FC<PropsWithChildren> = props => (
    <Outer>
        <Inner>
            {props.children}
        </Inner>
    </Outer>
);
