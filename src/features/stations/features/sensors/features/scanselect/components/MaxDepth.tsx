import { Box, styled } from 'src/lib/mui';
import { itemWidth } from './ScanItem';

interface Props {
    column: number;
}

const Root = styled(Box)({
    border: 'solid red 0px',
    marginLeft: '0.65em',
    borderLeftWidth: '0.2em',
    gridRowStart: 1,
    gridRowEnd: 9,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    pointerEvents: 'none',
    transition: 'width ease-in-out 1s',
});

export const MaxDepth: React.FC<Props> = props => {
    return (
        <Root sx={{ width: `calc(100% - (${props.column} * (${itemWidth} + 3em)) + 1.85em)` }} />
    );
}

