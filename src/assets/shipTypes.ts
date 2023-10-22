import { ShipType } from 'src/types/ShipType'

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