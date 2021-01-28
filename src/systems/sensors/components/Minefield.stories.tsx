import { action } from '@storybook/addon-actions';
import React from 'react';
import { Theme } from '../../../common/theme';
import { CellState, ClientMinefield, ClueType } from '../data/MinefieldData';
import { Minefield } from './Minefield';

export default { title: 'Sensors/Minefield' };

const minefield3x3: ClientMinefield = {
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
            }
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
            }
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
            }
        ]
    ]
};

const minefield4x2: ClientMinefield = {
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
            {
                state: CellState.Revealed,
                content: {
                    clue: {
                        number: 3,
                        type: ClueType.Normal,
                    }
                }
            },
        ],
    ]
};

const minefield2x4: ClientMinefield = {
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
        ],
    ]
};

export const threeByThree = () => (
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
                minefield={minefield3x3}
            />
        </div>
    </Theme>
);

export const fourByTwo = () => (
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
                minefield={minefield4x2}
            />
        </div>
    </Theme>
);

export const twoByFour = () => (
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
                minefield={minefield2x4}
            />
        </div>
    </Theme>
);
