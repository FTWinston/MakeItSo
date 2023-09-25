export type ScanItemId = string;

export type ScanType = 'info' | 'action';

// An item to be scanned. Will need more info added.
export interface ShipScanItem {
    id: ScanItemId;
    row: number;
    type: ScanType;
}

// A column of items to be scanned.
export interface ShipScanColumn {
    items: ShipScanItem[];
}

// Tree definition for all ships of a type. Doesn't include the links between items.
export interface ScanTreeLayout {
    columns: ShipScanColumn[];
}

// Tree definition for a specific ship. Adds links between items, which can vary.
export interface ScanTreeDefinition {
    layout: ScanTreeLayout;
    unlocks: Map<ScanItemId, ScanItemId[]>;
}

// Scan of a specific ship, by another ship.
export interface ScanTreeState {
    tree: ScanTreeDefinition;
    selectedItemsByColumn: ScanItemId[];
    hiddenItems: Set<ScanItemId>;
}
