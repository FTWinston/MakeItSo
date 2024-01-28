import { FakeShip } from 'src/classes/FakeShip';
import { Ship } from 'src/classes/Ship';
import { Space } from 'src/classes/Space';
import { ScanTreeTemplate } from 'src/features/stations';
import { Faction } from 'src/types/Faction';
import { Position } from 'src/types/Position';
import { RelationshipType } from 'src/types/RelationshipType';
import { ShipConfiguration } from 'src/types/ShipConfiguration';
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

const distributedTree: ScanTreeTemplate = {
    items: [
        {
            id: 'basic info',
            row: 1,
            column: 3,
            type: 'info'
        },
        
        {
            id: 'shield power',
            row: 2,
            column: 1,
            type: 'info'
        },
        {
            id: 'shield vulnerability',
            row: 2,
            column: 3,
            type: 'info'
        },
        {
            id: 'engine power',
            row: 2,
            column: 5,
            type: 'info'
        },

        {
            id: 'engine vulnerability',
            row: 3,
            column: 2,
            type: 'info'
        },
        {
            id: 'weapon power',
            row: 3,
            column: 4,
            type: 'info'
        },

        {
            id: 'sensor power',
            row: 4,
            column: 1,
            type: 'info'
        },
        {
            id: 'sensor vulnerability',
            row: 4,
            column: 3,
            type: 'info'
        },
        {
            id: 'fake extra 1',
            row: 4,
            column: 5,
            type: 'info'
        },
        
        {
            id: 'fake extra 2',
            row: 5,
            column: 1,
            type: 'info'
        },
        {
            id: 'fake extra 3',
            row: 5,
            column: 2,
            type: 'info'
        },
        {
            id: 'fake extra 4',
            row: 5,
            column: 4,
            type: 'info'
        },
        {
            id: 'fake extra 5',
            row: 5,
            column: 5,
            type: 'info'
        }
    ],
    unlockOptionSets: [
        // Fixed options for second row
        [
            [
                ['basic info', 'shield vulnerability'],
                ['basic info', 'engine power'],
                ['basic info', 'shield power',],
            ]
        ],

        // First half of third row
        [
            [
                ['shield vulnerability', 'engine vulnerability']
            ],
            [
                ['shield power', 'engine vulnerability']
            ],
            [
                ['shield vulnerability', 'engine vulnerability'],
                ['shield power', 'engine vulnerability']
            ]
        ],

        // Second half of third row
        [
            [
                ['shield vulnerability', 'weapon power']
            ],
            [
                ['engine power', 'weapon power']
            ],
            [
                ['shield vulnerability', 'weapon power'],
                ['engine power', 'weapon power']
            ]
        ],

        // Fixed options for fourth row
        [
            
            [
                ['engine vulnerability', 'sensor power'],
                ['weapon power', 'fake extra 1']
            ]
        ],

        // Middle part of fourth row
        [
            [
                ['engine vulnerability', 'sensor vulnerability'],
            ],
            [
                ['weapon power', 'sensor vulnerability']
            ],
            [
                ['engine vulnerability', 'sensor vulnerability'],
                ['weapon power', 'sensor vulnerability']
            ]
        ],

        // First part of fifth row
        [
            [
                ['sensor power', 'fake extra 2'],
                ['sensor power', 'fake extra 3']
            ],
            [
                ['sensor power', 'fake extra 2'],
                ['sensor vulnerability', 'fake extra 3']
            ],
            [
                ['sensor vulnerability', 'fake extra 2'],
                ['sensor vulnerability', 'fake extra 3']
            ]
        ],

        // Second part of fifth row
        [
            [
                ['fake extra 1', 'fake extra 4'],
                ['fake extra 1', 'fake extra 5']
            ],
            [
                ['sensor vulnerability', 'fake extra 4'],
                ['fake extra 1', 'fake extra 5']
            ],
            [
                ['sensor vulnerability', 'fake extra 4'],
                ['sensor vulnerability', 'fake extra 5']
            ]
        ]
    ]
};

const bottomHeavyTree: ScanTreeTemplate = {
    items: [
        {
            id: 'basic info',
            row: 1,
            column: 3,
            type: 'info'
        },
        
        {
            id: 'shield power',
            row: 2,
            column: 2,
            type: 'info'
        },
        {
            id: 'shield vulnerability',
            row: 2,
            column: 4,
            type: 'info'
        },

        {
            id: 'engine power',
            row: 3,
            column: 2,
            type: 'info'
        },
        {
            id: 'engine vulnerability',
            row: 3,
            column: 3,
            type: 'info'
        },
        {
            id: 'weapon power',
            row: 3,
            column: 4,
            type: 'info'
        },

        {
            id: 'sensor power',
            row: 4,
            column: 2,
            type: 'info'
        },
        {
            id: 'sensor vulnerability',
            row: 4,
            column: 4,
            type: 'info'
        },

        {
            id: 'fake extra 1',
            row: 5,
            column: 1,
            type: 'info'
        },
        {
            id: 'fake extra 2',
            row: 5,
            column: 2,
            type: 'info'
        },
        {
            id: 'fake extra 3',
            row: 5,
            column: 3,
            type: 'info'
        },
        {
            id: 'fake extra 4',
            row: 5,
            column: 4,
            type: 'info'
        },
        {
            id: 'fake extra 5',
            row: 5,
            column: 5,
            type: 'info'
        }
    ],
    unlockOptionSets: [
        // TODO
    ],
}

export const playerShip: ShipType = {
    id: 'player',
    draw: 'chevron',
    faction: 'protectors',
    scanTree: distributedTree,
}

export const neutralShip: ShipType = {
    id: 'neutral',
    draw: 'chevron',
    faction: 'civilians',
    scanTree: distributedTree,
}

export const hostileShip: ShipType = {
    id: 'hostile',
    draw: 'chevron',
    faction: 'destructiveFighters',
    scanTree: bottomHeavyTree,
}

export const friendlyShip: ShipType = {
    id: 'friendly',
    draw: 'chevron',
    faction: 'protectors',
    scanTree: distributedTree,
}

export const unknownShip: ShipType = {
    id: 'unknown',
    draw: 'chevron',
    faction: 'bullies',
    scanTree: distributedTree,
}

function initialize(shipConfig: ShipConfiguration): Ship {
    const space = new Space(factions);

    const zero: Position = { x: 0, y: 0, angle: 0 };

    const ship = new Ship(space, playerShip, shipConfig, zero);

    new FakeShip(space, neutralShip, zero);
    new FakeShip(space, hostileShip, zero);
    new FakeShip(space, friendlyShip, zero);
    new FakeShip(space, unknownShip, zero);
      
    new FakeShip(space, hostileShip, zero);
    new FakeShip(space, neutralShip, zero);

    return ship;
}

export default initialize;