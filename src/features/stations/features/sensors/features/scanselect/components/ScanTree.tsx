import { Box, styled } from 'src/lib/mui';
import { ScanItemId } from '../types/ScanItemId';
import { ShipScanItem } from '../types/ScanTreeState';
import { ItemStatus, ScanItem, itemHeight, itemWidth } from './ScanItem';
import { TreeLinks } from './TreeLinks';
import { MaxDepth } from './MaxDepth';

interface Props {
    items: ShipScanItem[];
    unlocks: [ScanItemId, ScanItemId][];
    selectedItemIds: ScanItemId[];
    //hiddenItemIds: ScanItemId[];
    availableItemIds: ScanItemId[];
    itemInfo: Partial<Record<ScanItemId, string>>;
    selectItem: (id: ScanItemId) => void;
    maxScanDepth?: number;
}

const Root = styled(Box)({
    margin: '0.5em',
    display: 'grid',
    columnGap: '0.5em',
    gridAutoRows: `${itemHeight} 3em`,
    gridAutoColumns: itemWidth,
    justifyContent: 'space-around',
});

function getColumnsWithSelections(items: ShipScanItem[], selectedItemIds: ScanItemId[]) {
    return selectedItemIds
        .reduce((accumulator, selectedItemId) => {
            const selectedItem = items.find(item => item.id === selectedItemId);
            if (selectedItem) {
                accumulator.add(selectedItem.row);
            }
            return accumulator;
        }, new Set<number>());
}

export const ScanTree: React.FC<Props> = props => {
    const columnsWithSelections = getColumnsWithSelections(props.items, props.selectedItemIds);

    return (
        <Root>
            {props.items.map((item) => {
                const tooDeep = props.maxScanDepth && props.maxScanDepth < item.row;
                const itemIsActive = !tooDeep && props.selectedItemIds.includes(item.id);
                const status: ItemStatus = itemIsActive
                    ? 'active'
                    : (
                        !tooDeep && props.availableItemIds.includes(item.id)
                            ? (columnsWithSelections.has(item.row) ? 'inactive' : 'available')
                            : 'unavailable'
                    );

                const info = itemIsActive
                    ? props.itemInfo[item.id]
                    : undefined;

                // TODO: ... well, not here. Track the open item and show it in a modal.

                return (
                    <ScanItem
                        key={item.id}
                        sx={{ gridColumn: item.column, gridRow: item.row * 2 - 1 }}
                        status={status}
                        itemId={item.id}
                        itemType={item.type}
                        clicked={() => props.selectItem(item.id)}
                    >
                        Active item content
                    </ScanItem>
                )
            })}

            <TreeLinks items={props.items} unlocks={props.unlocks} />

            {props.maxScanDepth === undefined ? undefined : <MaxDepth row={props.maxScanDepth} />}
        </Root>
    );
}

