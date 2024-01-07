import { ScanItemDetail } from './ScanItemDetail';
import { ScanItemId } from './ScanItemId';

export type ScanType = 'info' | 'action';

// An item to be scanned. Will need more info added.
export interface ShipScanItem {
    id: ScanItemId;
    column: number;
    row: number;
    type: ScanType;
}

// Tree definition for all ships of a type. Doesn't include the links between items.
export interface ScanTreeLayout {
    items: ShipScanItem[];
}

// Template for all ships of a type. Adds options for sets of links between items.
export interface ScanTreeTemplate extends ScanTreeLayout {
    unlockOptionSets: [ScanItemId, ScanItemId][][][];
}

// Tree definition for a specific ship. Has a specific set of links between items.
export interface ScanTreeDefinition extends ScanTreeLayout {
    unlocks: [ScanItemId, ScanItemId][];
}

// Scan of a specific ship, by another ship. Minimal information that needs expanded to be useful.
export interface ScanTreeMinimalState extends ScanTreeDefinition {
    selectedItemIds: ScanItemId[];
}

// Scan of a specific ship, by another ship. State that is needed by a client.
export interface ScanTreeState extends ScanTreeMinimalState {
    //hiddenItemIds: ScanItemId[];
    availableItemIds: ScanItemId[];
    itemInfo: Partial<Record<ScanItemId, ScanItemDetail>>;
}

export type ScanTreeStateAction = {
    type: 'set',
    items: ShipScanItem[];
    unlocks: [ScanItemId, ScanItemId][];
    selectedItemIds: ScanItemId[];
} | {
    type: 'select';
    item: ScanItemId;
} | {
    type: 'reset';
} | {
    type: 'set info';
    item: ScanItemId;
    info: ScanItemDetail;
}