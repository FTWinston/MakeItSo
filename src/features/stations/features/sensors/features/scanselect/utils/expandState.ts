import { ScanItemId } from '../types/ScanItemId';
import { ScanTreeState, ScanTreeMinimalState, ScanTreeDefinition } from '../types/ScanTreeState';
import { getAvailableItems } from './getAvailableItems';

export function expandState(state: ScanTreeDefinition | ScanTreeMinimalState): ScanTreeState {
    const selectedItemIds: ScanItemId[] = Object.hasOwn(state, 'selectedItemIds')
        ? (state as ScanTreeMinimalState).selectedItemIds
        : [];

    const selectedItemSet = new Set(selectedItemIds);

    return {
        ...state,
        selectedItemIds,
        availableItemIds: getAvailableItems(state.items, selectedItemSet, state.unlocks),
        itemInfo: {},
    }
}
