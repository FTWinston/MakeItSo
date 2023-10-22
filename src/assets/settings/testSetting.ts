import { Faction } from 'src/types/Faction';
import { RelationshipType } from 'src/types/RelationshipType';
import { ShipType } from 'src/types/ShipType'

type KnownFactionId = 'protectors' | 'civilians'
    | 'mindlessFighters' | 'destructiveFighters' | 'honorableFighters' | 'bullies'

export const factions: Faction<KnownFactionId>[] = [
    {
        id: 'protectors',
        relations: {
            protectors: RelationshipType.Defend,
            civilians: RelationshipType.Defend,
            mindlessFighters: RelationshipType.Attack,
            destructiveFighters: RelationshipType.Attack,
            honorableFighters: RelationshipType.Attack,
            bullies: RelationshipType.Attack,
        }
    },
    {
        id: 'civilians',
        relations: {
            protectors: RelationshipType.ProtectMe,
            civilians: RelationshipType.Ignore,
            mindlessFighters: RelationshipType.Fear,
            destructiveFighters: RelationshipType.Fear,
            honorableFighters: RelationshipType.Ignore,
            bullies: RelationshipType.Fear,
        }
    },
    {
        id: 'mindlessFighters',
        relations: {
            protectors: RelationshipType.Attack,
            civilians: RelationshipType.Attack,
            mindlessFighters: RelationshipType.Attack,
            destructiveFighters: RelationshipType.Attack,
            honorableFighters: RelationshipType.Attack,
            bullies: RelationshipType.Attack,
        },
    },
    {
        id: 'destructiveFighters',
        relations: {
            protectors: RelationshipType.Attack,
            civilians: RelationshipType.Attack,
            mindlessFighters: RelationshipType.Attack,
            destructiveFighters: RelationshipType.Defend,
            honorableFighters: RelationshipType.Attack,
            bullies: RelationshipType.Attack,
        },
    },
    {
        id: 'honorableFighters',
        relations: {
            protectors: RelationshipType.Attack,
            civilians: RelationshipType.Defend,
            mindlessFighters: RelationshipType.Attack,
            destructiveFighters: RelationshipType.Attack,
            honorableFighters: RelationshipType.Defend,
            bullies: RelationshipType.Ignore,
        },
    },
    {
        id: 'bullies',
        relations: {
            protectors: RelationshipType.Fear,
            civilians: RelationshipType.Attack,
            mindlessFighters: RelationshipType.Fear,
            destructiveFighters: RelationshipType.Fear,
            honorableFighters: RelationshipType.Fear,
            bullies: RelationshipType.Defend,
        },
    }
];

export const playerShip: ShipType = {
    id: 'player',
    draw: 'chevron',
    faction: 'protectors',
    scanTreeLayout: { items: [] },
}

export const neutralShip: ShipType = {
    id: 'neutral',
    draw: 'chevron',
    faction: 'civilians',
    scanTreeLayout: { items: [] },
}

export const hostileShip: ShipType = {
    id: 'hostile',
    draw: 'chevron',
    faction: 'destructiveFighters',
    scanTreeLayout: { items: [] },
}

export const friendlyShip: ShipType = {
    id: 'friendly',
    draw: 'chevron',
    faction: 'protectors',
    scanTreeLayout: { items: [] },
}

export const unknownShip: ShipType = {
    id: 'unknown',
    draw: 'chevron',
    faction: 'bullies',
    scanTreeLayout: { items: [] },
}