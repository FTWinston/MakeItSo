import { Box, styled } from 'src/lib/mui';
import { ScanItemId, ShipScanItem } from '../types/ScanTreeState';
import { ItemStatus, ScanItem, itemWidth } from './ScanItem';
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
    rowGap: '0.15em',
    gridAutoColumns: `${itemWidth} 3em`,
    gridTemplateRows: 'repeat(8, 1fr)',
});

function getColumnsWithSelections(items: ShipScanItem[], selectedItemIds: ScanItemId[]) {
    return selectedItemIds
        .reduce((accumulator, selectedItemId) => {
            const selectedItem = items.find(item => item.id === selectedItemId);
            if (selectedItem) {
                accumulator.add(selectedItem.column);
            }
            return accumulator;
        }, new Set<number>());
}

export const ScanTree: React.FC<Props> = props => {
    const columnsWithSelections = getColumnsWithSelections(props.items, props.selectedItemIds);

    let maxColumn = 0;

    return (
        <Root>
            {props.items.map((item) => {
                const tooDeep = props.maxScanDepth && props.maxScanDepth > item.column;
                const itemIsActive = !tooDeep && props.selectedItemIds.includes(item.id);
                const status: ItemStatus = itemIsActive
                    ? 'active'
                    : (
                        !tooDeep && props.availableItemIds.includes(item.id)
                            ? (columnsWithSelections.has(item.column) ? 'inactive' : 'available')
                            : 'unavailable'
                    );

                const info = itemIsActive
                    ? props.itemInfo[item.id]
                    : undefined;

                // TODO: use info

                let gridColumn = item.column * 2 - 1;
                maxColumn = Math.max(gridColumn, maxColumn);

                return (
                    <ScanItem
                        key={item.id}
                        sx={{ gridRow: item.row, gridColumn }}
                        title="Some scan item"
                        status={status}
                        itemType={item.type}
                        clicked={() => props.selectItem(item.id)}
                    >
                        Active item content
                    </ScanItem>
                )
            })}

            <TreeLinks items={props.items} unlocks={props.unlocks} />

            {props.maxScanDepth === undefined ? undefined : <MaxDepth column={props.maxScanDepth * 2} endColumn={maxColumn + 1} />}
        </Root>
    );
}

