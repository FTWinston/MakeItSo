import { RelationshipType } from 'src/types/RelationshipType';
import { ObjectAppearance } from 'src/types/ObjectAppearance';
import { ScanTreeLayout } from 'src/features/stations';

export interface ShipType {
    id: string;
    draw: ObjectAppearance,
    rel: RelationshipType,
    scanTreeLayout: ScanTreeLayout,
}

// TODO: remove the following, these are placeholders only.

export const playerShip: ShipType = {
    id: 'player',
    draw: 'chevron',
    rel: RelationshipType.Self,
    scanTreeLayout: { items: [] },
}

export const neutralShip: ShipType = {
    id: 'neutral',
    draw: 'chevron',
    rel: RelationshipType.Neutral,
    scanTreeLayout: { items: [] },
}

export const hostileShip: ShipType = {
    id: 'hostile',
    draw: 'chevron',
    rel: RelationshipType.Hostile,
    scanTreeLayout: { items: [] },
}

export const friendlyShip: ShipType = {
    id: 'friendly',
    draw: 'chevron',
    rel: RelationshipType.Friendly,
    scanTreeLayout: { items: [] },
}

export const unknownShip: ShipType = {
    id: 'unknown',
    draw: 'chevron',
    rel: RelationshipType.Unknown,
    scanTreeLayout: { items: [] },
}