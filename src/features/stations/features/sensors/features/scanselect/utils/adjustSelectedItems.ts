import { ScanItemId } from '../types/ScanItemId';
import { ShipScanItem } from '../types/ScanTreeState';
import { canBeSelected } from './canBeSelected';

export function adjustSelectedItems(
    selectedItems: Set<ScanItemId>,
    items: ShipScanItem[],
    unlocks: [ScanItemId, ScanItemId][],
    itemInfo: Partial<Record<ScanItemId, string>>,
    itemIdToSelect: ScanItemId
) {
    // Ensure item exists and isn't already selected.
    const itemToSelect = items.find(item => item.id === itemIdToSelect);
    if (!itemToSelect || selectedItems.has(itemIdToSelect)) {
        return;
    }

    // Deselect any other items in the same column.
    for (const itemId of selectedItems) {
        const item = items.find(item => item.id === itemId);

        if (!item || item.row === itemToSelect.row) {
            selectedItems.delete(itemId);
            delete itemInfo[itemId];
        }
    }
    
    // Select the new item.
    selectedItems.add(itemIdToSelect);

    // Find any selected items that have no prerequisites selected, and deselect them.
    // Repeat until nothing has changed.
    let deselectedAny: boolean;
    do {
        deselectedAny = false;

        for (const itemId of selectedItems) {
            if (!canBeSelected(selectedItems, items, unlocks, itemId)) {
                selectedItems.delete(itemId);
                delete itemInfo[itemId];
                deselectedAny = true;
            }
        }
    } while (deselectedAny);

    return [...selectedItems];
}
