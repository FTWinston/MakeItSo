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
            id: '1',
            column: 1,
            row: 2,
            type: 'info'
        },
        {
            id: '2',
            column: 1,
            row: 7,
            type: 'info'
        },
        {
            id: '11',
            column: 2,
            row: 1,
            type: 'info'
        },
        {
            id: '12',
            column: 2,
            row: 2,
            type: 'info'
        },
        {
            id: '13',
            column: 2,
            row: 4,
            type: 'info'
        },
        {
            id: '14',
            column: 2,
            row: 6,
            type: 'info'
        },
        {
            id: '15',
            column: 2,
            row: 7,
            type: 'info'
        },
        {
            id: '16',
            column: 2,
            row: 8,
            type: 'info'
        },
        {
            id: '21',
            column: 3,
            row: 1,
            type: 'info'
        },
        {
            id: '22',
            column: 3,
            row: 3,
            type: 'info'
        },
        {
            id: '23',
            column: 3,
            row: 5,
            type: 'info'
        },
        {
            id: '24',
            column: 3,
            row: 7,
            type: 'info'
        }
    ],
    unlockOptionSets: [
        [ // Fixed options set for second column
            [
                ["1", "11"],
                ["1", "12"],
                ["2", "15"],
                ["2", "16"]
            ]
        ],
        [ // Possible variations for the second column
            [
                ["1", "13"],
                ["2", "14"]
            ],
            [
                ["1", "13"],
                ["2", "13"],
                ["2", "14"]
            ],
            [
                ["1", "13"],
                ["1", "14"],
                ["2", "14"]
            ],
            [
                ["1", "13"],
                ["1", "14"]
            ],
            [
                ["2", "13"],
                ["2", "14"]
            ]
        ],
        
        [ // Variations for top half of third column
            [
                ["11", "21"],
                ["12", "21"],
                ["12", "22"],
                ["13", "22"]
            ],
            [
                ["11", "21"],
                ["11", "22"]
            ],
            [
                ["12", "21"],
                ["12", "22"]
            ],
            [
                ["13", "21"],
                ["13", "22"]
            ],
            [
                ["11", "21"],
                ["11", "22"],
                ["13", "22"]
            ],
            [
                ["11", "21"],
                ["13", "21"],
                ["13", "22"]
            ],
        ],
        [ // Variations for bottom half of third column
            [
                ["13", "23"],
                ["14", "23"],
                ["14", "24"],
                ["15", "24"],
                ["16", "24"]
            ],
            [
                ["13", "23"],
                ["14", "23"],
                ["15", "24"],
                ["16", "24"]
            ],
            [
                ["13", "23"],
                ["14", "24"],
                ["15", "24"],
                ["16", "24"]
            ],
            [
                ["14", "23"],
                ["14", "24"],
                ["15", "24"],
                ["16", "24"]
            ],
            [
                ["13", "23"],
                ["14", "23"],
                ["15", "24"]
            ],
            [
                ["13", "23"],
                ["14", "24"],
                ["15", "24"]
            ],
            [
                ["13", "23"],
                ["15", "24"],
                ["16", "24"]
            ]        
        ]
    ],
}


const balancedTree: ScanTreeTemplate = {
    items: [
        {
            id: '1',
            column: 1,
            row: 1,
            type: 'info'
        },
        {
            id: '2',
            column: 1,
            row: 8,
            type: 'info'
        },


        {
            id: '11',
            column: 2,
            row: 1,
            type: 'info'
        },
        {
            id: '12',
            column: 2,
            row: 3,
            type: 'info'
        },
        {
            id: '13',
            column: 2,
            row: 6,
            type: 'info'
        },
        {
            id: '14',
            column: 2,
            row: 8,
            type: 'info'
        },

        {
            id: '21',
            column: 3,
            row: 2,
            type: 'info'
        },
        {
            id: '22',
            column: 3,
            row: 4,
            type: 'info'
        },
        {
            id: '23',
            column: 3,
            row: 5,
            type: 'info'
        },
        {
            id: '24',
            column: 3,
            row: 7,
            type: 'info'
        },
        
        {
            id: '31',
            column: 4,
            row: 1,
            type: 'info'
        },
        {
            id: '32',
            column: 4,
            row: 3,
            type: 'info'
        },
        {
            id: '33',
            column: 4,
            row: 6,
            type: 'info'
        },
        {
            id: '34',
            column: 4,
            row: 8,
            type: 'info'
        },
    ],
    unlockOptionSets: [
        [ // Fixed options set for second column
            [
                ["1", "11"],
                ["2", "14"],
            ]
        ],
        [ // Possible variations for the second column
            [
                ["1", "12"],
                ["2", "13"],
            ],
            [
                
                ["1", "12"],
                ["1", "13"],
                ["2", "13"],
            ],
            [
                ["1", "12"],
                ["2", "12"],
                ["2", "13"],
            ],
            [
                ["1", "12"],
                ["1", "13"],
            ],
            [
                ["2", "12"],
                ["2", "13"],
            ]
        ],
        
        [ // Variations for top half of third column
            [
                ["11", "21"],
                ["12", "21"],
                ["12", "22"],
            ],
            [
                ["11", "21"],
                ["12", "21"],
                ["13", "22"],
            ],
            [
                ["11", "21"],
                ["12", "22"],
            ],
            [
                ["11", "21"],
                ["11", "22"],
            ],
            [
                ["12", "21"],
                ["12", "22"],
            ],
            [
                ["13", "21"],
                ["13", "22"],
            ],
        ],
        [ // Variations for bottom half of third column
            [
                ["14", "24"],
                ["13", "24"],
                ["13", "23"],
            ],
            [
                ["14", "24"],
                ["13", "24"],
                ["13", "23"],
            ],
            [
                ["14", "24"],
                ["13", "23"],
            ],
            [
                ["14", "24"],
                ["14", "23"],
            ],
            [
                ["13", "24"],
                ["13", "23"],
            ],
        ],
        [ // Variations for top half of fourth column
            [
                ["21", "31"],
                ["21", "32"],
            ],
            [
                ["21", "31"],
                ["21", "32"],
                ["22", "32"],
            ],
            [
                ["21", "31"],
                ["22", "32"],
            ],
            [
                ["22", "31"],
                ["22", "32"],
            ]
        ],
        [ // Variations for bottom half of fourth column
            [
                ["24", "34"],
                ["24", "33"],
            ],
            [
                ["24", "34"],
                ["24", "33"],
                ["23", "33"],
            ],
            [
                ["24", "34"],
                ["23", "33"],
            ],
            [
                ["23", "34"],
                ["23", "33"],
            ],
            [
                ["22", "34"],
                ["22", "33"],
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