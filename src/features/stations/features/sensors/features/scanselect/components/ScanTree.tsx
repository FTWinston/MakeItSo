import { Box, styled } from 'src/lib/mui';
import { ScanItemId } from '../types/ScanItemId';
import { ShipScanItem } from '../types/ScanTreeState';
import { ItemStatus, ScanItem, itemHeight, itemWidth } from './ScanItem';
import { TreeLinks } from './TreeLinks';
import { MaxDepth } from './MaxDepth';
import { CSSProperties, forwardRef } from 'react';

interface Props {
    items: ShipScanItem[];
    unlocks: [ScanItemId, ScanItemId][];
    selectedItemIds: ScanItemId[];
    //hiddenItemIds: ScanItemId[];
    availableItemIds: ScanItemId[];
    selectItem: (id: ScanItemId) => void;
    maxScanDepth: number;
    style?: CSSProperties;
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

export const ScanTree = forwardRef<typeof Box, Props>((props, ref) => {
    const columnsWithSelections = getColumnsWithSelections(props.items, props.selectedItemIds);

    return (
        <Root ref={ref} style={props.style}>
            {props.items.map((item) => {
                const tooDeep = props.maxScanDepth && props.maxScanDepth < item.row;
                const itemIsActive = !tooDeep && props.selectedItemIds.includes(item.id);
                const itemIsAvailable = !tooDeep && props.availableItemIds.includes(item.id); 
                const status: ItemStatus = itemIsActive
                    ? 'active'
                    : (
                        itemIsAvailable
                            ? (columnsWithSelections.has(item.row) ? 'inactive' : 'available')
                            : 'unavailable'
                    );

                const clicked = itemIsActive || itemIsAvailable
                    ? () => props.selectItem(item.id)
                    : undefined;

                return (
                    <ScanItem
                        key={item.id}
                        sx={{ gridColumn: item.column, gridRow: item.row * 2 - 1 }}
                        status={status}
                        itemId={item.id}
                        itemType={item.type}
                        clicked={clicked}
                    />
                )
            })}

            <TreeLinks items={props.items} unlocks={props.unlocks} />

            <MaxDepth row={props.maxScanDepth} />
        </Root>
    );
})

