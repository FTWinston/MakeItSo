export type ScanItemId = string;

export type ScanType = 'info' | 'action';

// An item to be scanned. Will need more info added.
export interface ShipScanItem {
    id: ScanItemId;
    row: number;
    column: number;
    type: ScanType;
}

// Tree definition for all ships of a type. Doesn't include the links between items.
export interface ScanTreeLayout {
    items: ShipScanItem[];
}

// Tree definition for a specific ship. Adds links between items, which can vary.
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
    itemInfo: Partial<Record<ScanItemId, string>>;
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
    type: 'set info';
    item: ScanItemId;
    info: string;
}