import { ScanItemId } from '../types/ScanItemId';
import { ShipScanItem } from '../types/ScanTreeState';
import { ItemLink } from './ItemLink';

interface Props {
    items: ShipScanItem[];
    unlocks: [ScanItemId, ScanItemId][];
}

export const TreeLinks: React.FC<Props> = props => {
    return (
        <>
            {props.unlocks.map(([fromItemId, toItemId], index) => {
                const fromItem = props.items.find(item => item.id === fromItemId);
                const toItem = props.items.find(item => item.id === toItemId);
                if (!fromItem || !toItem) {
                    return;
                }

                return (
                    <ItemLink
                        key={index}
                        fromRow={fromItem.row}
                        fromColumn={fromItem.column}
                        toRow={toItem.row}
                        toColumn={toItem.column}
                    />
                );
            })}
        </>
    );
}

