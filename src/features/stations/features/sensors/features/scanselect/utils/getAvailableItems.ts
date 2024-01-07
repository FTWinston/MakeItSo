import { ScanItemId } from '../types/ScanItemId';
import { ShipScanItem } from '../types/ScanTreeState';
import { canBeSelected } from './canBeSelected';

/** Items are available if they're not selected, and they're in column 1, or one of their prerequisites is selected. */
export function getAvailableItems(
    items: ShipScanItem[],
    selectedItems: Set<ScanItemId>,
    unlocks: [ScanItemId, ScanItemId][]
): ScanItemId[] {
    return items
        .filter(item => !selectedItems.has(item.id) && canBeSelected(selectedItems, items, unlocks, item.id))
        .map(item => item.id);
}
