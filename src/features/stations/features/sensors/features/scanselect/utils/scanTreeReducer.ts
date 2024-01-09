import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { ScanTreeState, ScanTreeStateAction } from '../types/ScanTreeState';
import { adjustSelectedItems } from './adjustSelectedItems';
import { getAvailableItems } from './getAvailableItems';
import { getItemDepth } from './getItemDepth';

export function scanTreeReducer(state: ScanTreeState, action: ScanTreeStateAction): ScanTreeState | void {
    switch (action.type) {
        case 'select': {
            // TODO: ensure action.item is in availableItems?

            // Ensure action.item's depth isn't beyond maxScanDepth.
            const itemDepth = getItemDepth(action.item, state.items);
            if (itemDepth > state.maxScanDepth) {
                break;
            }

            // Deselect any items in the same column.
            const selectedItemSet = new Set(state.selectedItemIds);
            adjustSelectedItems(selectedItemSet, state.items, state.unlocks, state.itemInfo, action.item);
            state.selectedItemIds = [...selectedItemSet];

            // Update item availability based on the selection change.
            state.availableItemIds = getAvailableItems(state.items, selectedItemSet, state.unlocks);
            break;
        }

        case 'reset': {
            state.selectedItemIds = [];
            state.availableItemIds = getAvailableItems(state.items, new Set(), state.unlocks);
            break;
        }

        case 'set info': {
            if (state.selectedItemIds.includes(action.item)) {
                state.itemInfo[action.item] = action.info;
            }
            break;
        }
        
        case 'max depth': {
            const oldMax = state.maxScanDepth;
            state.maxScanDepth = action.depth;
            
            if (oldMax > state.maxScanDepth) {
                // Any selected items beyond the max depth must be deselected.
                const selectedItemSet = new Set(state.selectedItemIds);

                let anyChange = false;
                for (let depth = state.maxScanDepth + 1; depth <= oldMax; depth++) {
                    for (const itemId of state.itemsByDepth[depth]) {
                        if (selectedItemSet.delete(itemId)) {
                            anyChange = true;
                        }
                    }
                }

                if (anyChange) {
                    state.selectedItemIds = [...selectedItemSet];

                    // Update item availability based on the selection change.
                    state.availableItemIds = getAvailableItems(state.items, selectedItemSet, state.unlocks);
                }
            }
            break;
        }

        default:
            throw new UnexpectedValueError(action);
    }
}
