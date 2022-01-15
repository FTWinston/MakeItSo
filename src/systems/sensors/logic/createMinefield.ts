import { System } from '../../../common/data/System';
import { MinefieldComplexity } from '../data/MinefieldComplexity';
import { CellState, ClueType, ServerMinefield } from '../data/MinefieldData';

export function createMinefield(system: System, complexity: MinefieldComplexity): ServerMinefield {
    switch (complexity) {
        case MinefieldComplexity.Simple:
            return {
                grid: [
                    [
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                                clue: {
                                    number: 1,
                                    type: ClueType.Adjacent
                                }
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 1,
                            }
                        },
                        {
                            state: CellState.Revealed,
                            content: {
                                mine: 0,
                                clue: {
                                    number: 1,
                                    type: ClueType.Adjacent
                                }
                            }
                        },
                    ],
                    [
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                                clue: {
                                    number: 1,
                                    type: ClueType.Adjacent
                                }
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                    ],
                    [
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                    ],
                ]
            };
        case MinefieldComplexity.Moderate:
            return {
                grid: [
                    [
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                                clue: {
                                    number: 1,
                                    type: ClueType.Adjacent
                                }
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 1,
                            }
                        },
                        {
                            state: CellState.Revealed,
                            content: {
                                mine: 0,
                                clue: {
                                    number: 1,
                                    type: ClueType.Adjacent
                                }
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                    ],
                    [
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                                clue: {
                                    number: 1,
                                    type: ClueType.Adjacent
                                }
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                    ],
                    [
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                    ],
                    [
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                    ],
                ]
            };
        
        case MinefieldComplexity.Complex:
            return {
                grid: [
                    [
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                                clue: {
                                    number: 1,
                                    type: ClueType.Adjacent
                                }
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 1,
                            }
                        },
                        {
                            state: CellState.Revealed,
                            content: {
                                mine: 0,
                                clue: {
                                    number: 1,
                                    type: ClueType.Adjacent
                                }
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                    ],
                    [
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                                clue: {
                                    number: 1,
                                    type: ClueType.Adjacent
                                }
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                    ],
                    [
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                    ],
                    [
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                    ],
                    [
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                        {
                            state: CellState.Unknown,
                            content: {
                                mine: 0,
                            }
                        },
                    ],
                ]
            };
    }
}