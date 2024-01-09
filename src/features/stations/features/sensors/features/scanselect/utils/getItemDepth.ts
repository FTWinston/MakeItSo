import { ScanItemId } from '../types/ScanItemId';
import { ShipScanItem } from '../types/ScanTreeState';

export function getItemDepth(
    id: ScanItemId,
    items: ShipScanItem[],
): number {
    for (const item of items) {
        if (item.id === id) {
            return item.row;
        }
    }

    return 0;
}
