import { PowerLevel } from 'src/types/ShipSystem';
import { ScanItemId } from '../types/ScanItemId';
import { ScanTreeState, ScanTreeMinimalState, ScanTreeDefinition } from '../types/ScanTreeState';
import { getAvailableItems } from './getAvailableItems';
import { getMaxDepth } from './getMaxDepth';

export function expandState(state: ScanTreeDefinition | ScanTreeMinimalState, powerLevel: PowerLevel): ScanTreeState {
    const selectedItemIds: ScanItemId[] = Object.hasOwn(state, 'selectedItemIds')
        ? (state as ScanTreeMinimalState).selectedItemIds
        : [];

    const selectedItemSet = new Set(selectedItemIds);

    // Compute the item IDs at each row (depth), for ease of use later.
    const itemsByDepth: Record<number, ScanItemId[]> = {};
    for (const item of state.items) {
        const depth = item.row;
        let itemsAtDepth = itemsByDepth[depth];
        if (!itemsAtDepth) {
            itemsAtDepth = [];
            itemsByDepth[depth] = itemsAtDepth;
        }

        itemsAtDepth.push(item.id);
    }

    const maxScanDepth = getMaxDepth(powerLevel);

    return {
        ...state,
        selectedItemIds,
        availableItemIds: getAvailableItems(state.items, selectedItemSet, state.unlocks),
        itemInfo: {},
        maxScanDepth,
        itemsByDepth,
    }
}
