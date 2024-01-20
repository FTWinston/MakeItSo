import { CSSProperties, forwardRef } from 'react';
import { Box, styled } from 'src/lib/mui';
import { AppBarHeight } from '../../appbar';
import { CellBoard, InteractiveCells } from '../features/hexcells';

interface Props {
    scanCellBoard: CellBoard;
    flagCell: (index: number) => void;
    revealCell: (index: number) => void;
    style?: CSSProperties;
}

const actionBarHeight = '3em';

const Root = styled(Box)({
    display: 'grid',
    gridTemplateRows: `1fr ${actionBarHeight}`,
});

const ActionBar = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    height: actionBarHeight,
})

export const Scanning = forwardRef<typeof Box, Props>((props, ref) => {
    return (
        <Root ref={ref} style={props.style}>
            <InteractiveCells
                {...props.scanCellBoard}
                revealCell={props.revealCell}
                flagCell={props.flagCell}
            />

            <ActionBar>
                bombs remaining: {props.scanCellBoard.numBombs}
            </ActionBar>
        </Root>
    );
});
