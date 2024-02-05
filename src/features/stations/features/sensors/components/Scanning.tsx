import { CSSProperties, forwardRef } from 'react';
import { Box, styled } from 'src/lib/mui';
import { CellBoard, InteractiveCells } from '../features/hexcells';
import { ScanBoosts } from './ScanBoosts';
import { SensorBoostInfo } from '../types/SensorBoost';

interface Props {
    scanCellBoard: CellBoard;
    boosts: SensorBoostInfo[];
    flagCell: (index: number) => void;
    revealCell: (index: number) => void;
    style?: CSSProperties;
}

const actionBarHeight = '3em';

const Root = styled(Box)({
    display: 'grid',
    gridTemplateRows: `1fr ${actionBarHeight}`,
});

export const Scanning = forwardRef<typeof Box, Props>((props, ref) => {
    return (
        <Root ref={ref} style={props.style}>
            <InteractiveCells
                {...props.scanCellBoard}
                revealCell={props.revealCell}
                flagCell={props.flagCell}
            />

            <ScanBoosts
                bombsLeft={props.scanCellBoard.numBombsLeft}
                boosts={props.boosts}
            />
        </Root>
    );
});
