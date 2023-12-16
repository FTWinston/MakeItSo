import { Box, styled } from 'src/lib/mui';
import { itemHeight } from './ScanItem';

interface Props {
    row: number;
}

const Root = styled(Box)({
    border: 'solid red 0px',
    marginTop: '0.65em',
    borderTopWidth: '0.2em',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    pointerEvents: 'none',
    transition: 'height ease-in-out 1s',
});

export const MaxDepth: React.FC<Props> = props => {
    return (
        <Root sx={{ height: `calc(100% - (${props.row} * (${itemHeight} + 3em)) + 1.85em)` }} />
    );
}

