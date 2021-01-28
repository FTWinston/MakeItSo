import { action } from '@storybook/addon-actions';
import React from 'react';
import { Theme } from '../../../common/theme';
import { CellState, ClientMinefield, ClueType } from '../data/MinefieldData';
import { Minefield } from './Minefield';

export default { title: 'Sensors/Minefield' };

const minefieldComprehensive: ClientMinefield = {
    grid: [
        [
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Marked
            },
            {
                state: CellState.Revealed,
                content: {
                    clue: {
                        number: 2,
                        type: ClueType.NonAdjacent,
                    }
                }
            },
        ],
        [
            {
                state: CellState.Marked
            },
            {
                state: CellState.Marked
            },
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Unknown
            },
        ],
        [
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Revealed,
                content: {
                    clue: {
                        number: 3,
                        type: ClueType.Normal,
                    }
                }
            },
            {
                state: CellState.Revealed,
                content: {}
            },
            {
                state: CellState.Unknown
            },
        ],
        [
            {
                state: CellState.Revealed,
                content: {
                    clue: {
                        number: 2,
                        type: ClueType.Adjacent,
                    }
                }
            },
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Revealed,
                content: {
                    clue: {
                        number: 2,
                        type: ClueType.Nearby,
                    }
                }
            },
        ]
    ]
};

const minefieldShaped: ClientMinefield = {
    grid: [
        [
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Unknown
            },
        ],
        [
            {
                state: CellState.Marked
            },
            null,
            {
                state: CellState.Unknown
            },
        ],
        [
            null,
            {
                state: CellState.Revealed,
                content: {
                    clue: {
                        number: 1,
                        type: ClueType.Normal,
                    }
                }
            },
            null,
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Unknown
            },
        ],
        [
            null,
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Revealed,
                content: {
                    clue: {
                        number: 2,
                        type: ClueType.Nearby,
                    }
                }
            },
        ]
    ]
};

const minefieldCols: ClientMinefield = {
    columns: [
        {
            number: 3,
            type: ClueType.Normal,
        },
        null,
        {
            number: 2,
            type: ClueType.Adjacent,
        },
        {
            number: 2,
            type: ClueType.NonAdjacent,
        }
    ],
    grid: [
        [
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Unknown
            },
        ],
        [
            {
                state: CellState.Marked
            },
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Unknown
            },
        ],
        [
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Unknown
            },
        ],
        [
            {
                state: CellState.Unknown
            },
            {
                state: CellState.Revealed,
                content: {
                    clue: {
                        number: 3,
                        type: ClueType.Normal,
                    }
                }
            },
            {
                state: CellState.Unknown
            },
        ],
    ]
};

export const everyCellType = () => (
    <Theme>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh'
        }}>
            <Minefield
                reveal={action("reveal")}
                mark={action("mark")}
                minefield={minefieldComprehensive}
            />
        </div>
    </Theme>
);

export const shaped = () => (
    <Theme>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh'
        }}>
            <Minefield
                reveal={action("reveal")}
                mark={action("mark")}
                minefield={minefieldShaped}
            />
        </div>
    </Theme>
);

export const columns = () => (
    <Theme>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh'
        }}>
            <Minefield
                reveal={action("reveal")}
                mark={action("mark")}
                minefield={minefieldCols}
            />
        </div>
    </Theme>
);
