import { UnexpectedValueError } from 'src/utils/UnexpectedValueError';
import { ScanTreeState, ScanTreeStateAction } from '../types/ScanTreeState';
import { adjustSelectedItems } from './adjustSelectedItems';
import { expandState } from './expandState';
import { getAvailableItems } from './getAvailableItems';

export function scanTreeReducer(state: ScanTreeState, action: ScanTreeStateAction): ScanTreeState | void {
    switch (action.type) {
        case 'set':
            return expandState(action);

        case 'select': {
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
        
        default:
            throw new UnexpectedValueError(action);
    }
}
