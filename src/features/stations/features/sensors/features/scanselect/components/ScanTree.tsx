import { Box, styled } from 'src/lib/mui';
import { ScanItemId, ShipScanItem } from '../types/ScanTreeState';
import { ScanColumn } from './ScanColumn';
import { notUndefined } from 'src/utils/typeGuards';
import { itemWidth } from './ScanItem';
import { ItemLink } from './ItemLink';

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
    gridTemplateRows: 'repeat(8, 1fr)',
});

export const ScanTree: React.FC<Props> = props => {
    const availableItemIds = props.selectedItemIds
        .flatMap(item => props.unlocks[item])
        .filter(notUndefined);

    // Get pairs of [unlockingItemId, unlockedItemId]
    const unlockLinks = Object.entries(props.unlocks)
        .flatMap(([unlockingItemId, unlockedItemIds]) => unlockedItemIds!.map(unlockedItemId => [unlockingItemId, unlockedItemId] as [ScanItemId, ScanItemId]))

    // TODO: the column structure isn't exactly great for this...
    // TODO: memoise link GEOMETRY
    const allItems = props.columns.flat();

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
            {unlockLinks.map(([fromItem, toItem], index) => (
                <ItemLink /* TODO: simply the logic! */
                    fromColumn={props.columns.findIndex(column => column.find(item => item.id === fromItem))}
                    toColumn={props.columns.findIndex(column => column.find(item => item.id === toItem))}
                    fromRow={allItems.find(item => item.id === fromItem)!.row}
                    toRow={allItems.find(item => item.id === toItem)!.row}
                />
            ))}
        </Root>
    );
}