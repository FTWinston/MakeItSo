import { ScanTreeTemplate } from 'src/features/stations';
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

const testTree: ScanTreeTemplate = {
    items: [
        {
            id: 'basic info',
            row: 1,
            column: 2,
            type: 'info'
        },
        {
            id: 'shield power',
            row: 1,
            column: 7,
            type: 'info'
        },
        {
            id: 'shield vulnerability',
            row: 2,
            column: 1,
            type: 'info'
        },
        {
            id: 'engine power',
            row: 2,
            column: 2,
            type: 'info'
        },
        {
            id: 'engine vulnerability',
            row: 2,
            column: 4,
            type: 'info'
        },
        {
            id: 'weapon power',
            row: 2,
            column: 6,
            type: 'info'
        },
        {
            id: 'weapon vulnerability',
            row: 2,
            column: 7,
            type: 'info'
        },
        {
            id: 'sensor power',
            row: 2,
            column: 8,
            type: 'info'
        },
        {
            id: 'sensor vulnerability',
            row: 3,
            column: 1,
            type: 'info'
        },
        {
            id: 'fake extra 1',
            row: 3,
            column: 3,
            type: 'info'
        },
        {
            id: 'fake extra 2',
            row: 3,
            column: 5,
            type: 'info'
        },
        {
            id: 'fake extra 3',
            row: 3,
            column: 7,
            type: 'info'
        }
    ],
    unlockOptionSets: [
        [ // Fixed options set for second column
            [
                ['basic info', 'shield vulnerability'],
                ['basic info', 'engine power'],
                ['shield power', 'weapon vulnerability'],
                ['shield power', 'sensor power']
            ]
        ],
        [ // Possible variations for the second column
            [
                ['basic info', 'engine vulnerability'],
                ['shield power', 'weapon power']
            ],
            [
                ['basic info', 'engine vulnerability'],
                ['shield power', 'engine vulnerability'],
                ['shield power', 'weapon power']
            ],
            [
                ['basic info', 'engine vulnerability'],
                ['basic info', 'weapon power'],
                ['shield power', 'weapon power']
            ],
            [
                ['basic info', 'engine vulnerability'],
                ['basic info', 'weapon power']
            ],
            [
                ['shield power', 'engine vulnerability'],
                ['shield power', 'weapon power']
            ]
        ],
        
        [ // Variations for top half of third column
            [
                ['shield vulnerability', 'sensor vulnerability'],
                ['engine power', 'sensor vulnerability'],
                ['engine power', 'fake extra 1'],
                ['engine vulnerability', 'fake extra 1']
            ],
            [
                ['shield vulnerability', 'sensor vulnerability'],
                ['shield vulnerability', 'fake extra 1']
            ],
            [
                ['engine power', 'sensor vulnerability'],
                ['engine power', 'fake extra 1']
            ],
            [
                ['engine vulnerability', 'sensor vulnerability'],
                ['engine vulnerability', 'fake extra 1']
            ],
            [
                ['shield vulnerability', 'sensor vulnerability'],
                ['shield vulnerability', 'fake extra 1'],
                ['engine vulnerability', 'fake extra 1']
            ],
            [
                ['shield vulnerability', 'sensor vulnerability'],
                ['engine vulnerability', 'sensor vulnerability'],
                ['engine vulnerability', 'fake extra 1']
            ],
        ],
        [ // Variations for bottom half of third column
            [
                ['engine vulnerability', 'fake extra 2'],
                ['weapon power', 'fake extra 2'],
                ['weapon power', 'fake extra 3'],
                ['weapon vulnerability', 'fake extra 3'],
                ['sensor power', 'fake extra 3']
            ],
            [
                ['engine vulnerability', 'fake extra 2'],
                ['weapon power', 'fake extra 2'],
                ['weapon vulnerability', 'fake extra 3'],
                ['sensor power', 'fake extra 3']
            ],
            [
                ['engine vulnerability', 'fake extra 2'],
                ['weapon power', 'fake extra 3'],
                ['weapon vulnerability', 'fake extra 3'],
                ['sensor power', 'fake extra 3']
            ],
            [
                ['weapon power', 'fake extra 2'],
                ['weapon power', 'fake extra 3'],
                ['weapon vulnerability', 'fake extra 3'],
                ['sensor power', 'fake extra 3']
            ],
            [
                ['engine vulnerability', 'fake extra 2'],
                ['weapon power', 'fake extra 2'],
                ['weapon vulnerability', 'fake extra 3']
            ],
            [
                ['engine vulnerability', 'fake extra 2'],
                ['weapon power', 'fake extra 3'],
                ['weapon vulnerability', 'fake extra 3']
            ],
            [
                ['engine vulnerability', 'fake extra 2'],
                ['weapon vulnerability', 'fake extra 3'],
                ['sensor power', 'fake extra 3']
            ]        
        ]
    ],
}


const balancedTree: ScanTreeTemplate = {
    items: [
        {
            id: 'basic info',
            row: 1,
            column: 1,
            type: 'info'
        },
        {
            id: 'shield power',
            row: 1,
            column: 8,
            type: 'info'
        },


        {
            id: 'shield vulnerability',
            row: 2,
            column: 1,
            type: 'info'
        },
        {
            id: 'engine power',
            row: 2,
            column: 3,
            type: 'info'
        },
        {
            id: 'engine vulnerability',
            row: 2,
            column: 6,
            type: 'info'
        },
        {
            id: 'weapon power',
            row: 2,
            column: 8,
            type: 'info'
        },

        {
            id: 'sensor vulnerability',
            row: 3,
            column: 2,
            type: 'info'
        },
        {
            id: 'fake extra 1',
            row: 3,
            column: 4,
            type: 'info'
        },
        {
            id: 'fake extra 2',
            row: 3,
            column: 5,
            type: 'info'
        },
        {
            id: 'fake extra 3',
            row: 3,
            column: 7,
            type: 'info'
        },
        
        {
            id: 'fake extra 4',
            row: 4,
            column: 1,
            type: 'info'
        },
        {
            id: 'fake extra 5',
            row: 4,
            column: 3,
            type: 'info'
        },
        {
            id: 'fake extra 6',
            row: 4,
            column: 6,
            type: 'info'
        },
        {
            id: 'fake extra 7',
            row: 4,
            column: 8,
            type: 'info'
        },
    ],
    unlockOptionSets: [
        [ // Fixed options set for second column
            [
                ['basic info', 'shield vulnerability'],
                ['shield power', 'weapon power'],
            ]
        ],
        [ // Possible variations for the second column
            [
                ['basic info', 'engine power'],
                ['shield power', 'engine vulnerability'],
            ],
            [
                
                ['basic info', 'engine power'],
                ['basic info', 'engine vulnerability'],
                ['shield power', 'engine vulnerability'],
            ],
            [
                ['basic info', 'engine power'],
                ['shield power', 'engine power'],
                ['shield power', 'engine vulnerability'],
            ],
            [
                ['basic info', 'engine power'],
                ['basic info', 'engine vulnerability'],
            ],
            [
                ['shield power', 'engine power'],
                ['shield power', 'engine vulnerability'],
            ]
        ],
        
        [ // Variations for top half of third column
            [
                ['shield vulnerability', 'sensor vulnerability'],
                ['engine power', 'sensor vulnerability'],
                ['engine power', 'fake extra 1'],
            ],
            [
                ['shield vulnerability', 'sensor vulnerability'],
                ['engine power', 'sensor vulnerability'],
                ['engine vulnerability', 'fake extra 1'],
            ],
            [
                ['shield vulnerability', 'sensor vulnerability'],
                ['engine power', 'fake extra 1'],
            ],
            [
                ['shield vulnerability', 'sensor vulnerability'],
                ['shield vulnerability', 'fake extra 1'],
            ],
            [
                ['engine power', 'sensor vulnerability'],
                ['engine power', 'fake extra 1'],
            ],
            [
                ['engine vulnerability', 'sensor vulnerability'],
                ['engine vulnerability', 'fake extra 1'],
            ],
        ],
        [ // Variations for bottom half of third column
            [
                ['weapon power', 'fake extra 3'],
                ['engine vulnerability', 'fake extra 3'],
                ['engine vulnerability', 'fake extra 2'],
            ],
            [
                ['weapon power', 'fake extra 3'],
                ['engine vulnerability', 'fake extra 3'],
                ['engine vulnerability', 'fake extra 2'],
            ],
            [
                ['weapon power', 'fake extra 3'],
                ['engine vulnerability', 'fake extra 2'],
            ],
            [
                ['weapon power', 'fake extra 3'],
                ['weapon power', 'fake extra 2'],
            ],
            [
                ['engine vulnerability', 'fake extra 3'],
                ['engine vulnerability', 'fake extra 2'],
            ],
        ],
        [ // Variations for top half of fourth column
            [
                ['sensor vulnerability', 'fake extra 4'],
                ['sensor vulnerability', 'fake extra 5'],
            ],
            [
                ['sensor vulnerability', 'fake extra 4'],
                ['sensor vulnerability', 'fake extra 5'],
                ['fake extra 1', 'fake extra 5'],
            ],
            [
                ['sensor vulnerability', 'fake extra 4'],
                ['fake extra 1', 'fake extra 5'],
            ],
            [
                ['fake extra 1', 'fake extra 4'],
                ['fake extra 1', 'fake extra 5'],
            ]
        ],
        [ // Variations for bottom half of fourth column
            [
                ['fake extra 3', 'fake extra 7'],
                ['fake extra 3', 'fake extra 6'],
            ],
            [
                ['fake extra 3', 'fake extra 7'],
                ['fake extra 3', 'fake extra 6'],
                ['fake extra 2', 'fake extra 6'],
            ],
            [
                ['fake extra 3', 'fake extra 7'],
                ['fake extra 2', 'fake extra 6'],
            ],
            [
                ['fake extra 2', 'fake extra 7'],
                ['fake extra 2', 'fake extra 6'],
            ],
            [
                ['fake extra 1', 'fake extra 7'],
                ['fake extra 1', 'fake extra 6'],
            ]
        ]
    ],
}

export const playerShip: ShipType = {
    id: 'player',
    draw: 'chevron',
    faction: 'protectors',
    scanTree: testTree,
}

export const neutralShip: ShipType = {
    id: 'neutral',
    draw: 'chevron',
    faction: 'civilians',
    scanTree: testTree,
}

export const hostileShip: ShipType = {
    id: 'hostile',
    draw: 'chevron',
    faction: 'destructiveFighters',
    scanTree: balancedTree,
}

export const friendlyShip: ShipType = {
    id: 'friendly',
    draw: 'chevron',
    faction: 'protectors',
    scanTree: testTree,
}

export const unknownShip: ShipType = {
    id: 'unknown',
    draw: 'chevron',
    faction: 'bullies',
    scanTree: testTree,
}