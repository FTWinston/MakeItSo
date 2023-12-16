import { ScanItemId } from '../types/ScanItemId';
import { ShipScanItem } from '../types/ScanTreeState';

/** An item can be selected if it's in row 1, or one of its prerequisites is selected. */
export function canBeSelected(selectedItems: Set<ScanItemId>, items: ShipScanItem[], unlocks: [ScanItemId, ScanItemId][], itemId: ScanItemId): boolean {
    return items.find(item => item.id === itemId)?.row === 1
        || unlocks.some(([prerequisite, unlock]) => unlock === itemId && selectedItems.has(prerequisite))
}
