import { Box, styled } from 'src/lib/mui';
import { ScanItemId, ShipScanItem } from '../types/ScanTreeState';
import { ItemStatus, ScanItem, itemWidth } from './ScanItem';
import { ItemLink } from './ItemLink';

interface Props {
    items: ShipScanItem[];
    selectedItemIds: ScanItemId[];
    //hiddenItemIds: ScanItemId[];
    availableItemIds: ScanItemId[];
    unlocks: [ScanItemId, ScanItemId][];
    selectItem: (id: ScanItemId) => void;
}

const Root = styled(Box)({
    padding: '0.5em',
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

    return (
        <Root>
            {props.items.map((item) => {
                const status: ItemStatus = props.selectedItemIds.includes(item.id)
                    ? 'active'
                    : (
                        props.availableItemIds.includes(item.id)
                            ? (columnsWithSelections.has(item.column) ? 'inactive' : 'available')
                            : 'unavailable'
                    );

                return (
                    <ScanItem
                        key={item.id}
                        sx={{ gridRow: item.row, gridColumn: item.column * 2 - 1}}
                        title="Some scan item"
                        status={status}
                        clicked={() => props.selectItem(item.id)}
                    >
                        Active item content
                    </ScanItem>
                )
            })}

            {props.unlocks.map(([fromItemId, toItemId], index) => {
                const fromItem = props.items.find(item => item.id === fromItemId);
                const toItem = props.items.find(item => item.id === toItemId);
                if (!fromItem || !toItem) {
                    return;
                }

                return (
                    <ItemLink
                        key={index}
                        fromColumn={fromItem.column}
                        fromRow={fromItem.row}
                        toColumn={toItem.column}
                        toRow={toItem.row}
                    />
                );
            })}
        </Root>
    );
}

