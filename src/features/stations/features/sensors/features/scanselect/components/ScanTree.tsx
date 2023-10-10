import { Box, styled } from 'src/lib/mui';
import { ScanItemId, ShipScanItem } from '../types/ScanTreeState';
import { ScanColumn } from './ScanColumn';
import { notUndefined } from 'src/utils/typeGuards';
import { itemWidth } from './ScanItem';

interface Props {
    columns: ShipScanItem[][];
    selectedItemIds: ScanItemId[];
    hiddenItemIds: ScanItemId[];
    unlocks: Partial<Record<ScanItemId, ScanItemId[]>>;
    selectItem: (id: ScanItemId) => void;
}

const Root = styled(Box)({
    padding: '0.5em',
    display: 'grid',
    gridAutoColumns: `${itemWidth} 3em`,
    gridTemplateRows: '1fr',
});

export const ScanTree: React.FC<Props> = props => {
    const availableItemIds = props.selectedItemIds
        .map(item => props.unlocks[item])
        .flat()
        .filter(notUndefined);

    return (
        <Root>
            {props.columns.map((column, index) => (
                <ScanColumn
                    items={column}
                    selectedItemId={column.find(item => props.selectedItemIds.includes(item.id))?.id}
                    availableItemIds={availableItemIds}
                    key={index}
                    sx={{gridColumn: 1 + index * 2}}
                    selectItem={props.selectItem}
                />
            ))}
            {props.columns.slice(0, props.columns.length - 1).map((column, index) => (
                <Box sx={{
                    gridRow: 1,
                    gridColumn: 2 + index * 2,
                    justifySelf: 'center',
                    alignSelf: 'center',
                }}>
                    links
                </Box>
            ))}
        </Root>
    );
}