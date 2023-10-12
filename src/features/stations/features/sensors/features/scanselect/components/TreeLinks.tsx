import { ScanItemId, ShipScanItem } from '../types/ScanTreeState';
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
                        fromColumn={fromItem.column}
                        fromRow={fromItem.row}
                        toColumn={toItem.column}
                        toRow={toItem.row}
                    />
                );
            })}
        </>
    );
}

