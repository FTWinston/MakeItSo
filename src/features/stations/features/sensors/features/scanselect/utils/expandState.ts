import { ScanTreeState, ScanTreeMinimalState } from '../types/ScanTreeState';
import { getAvailableItems } from './getAvailableItems';

export function expandState(state: ScanTreeMinimalState): ScanTreeState {
    const selectedItemSet = new Set(state.selectedItemIds);

    return {
        ...state,
        availableItemIds: getAvailableItems(state.items, selectedItemSet, state.unlocks),
    }
}
