import { CellType, CountType } from '../types/CellState';
import { BoardInfoIgnoringErrors, getResolvableCells } from './getResolvableCells';

describe('two cells', () => {
    test('obscured, 1', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ]
        ]));
    });

    test('1, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 1, CellType.Bomb ]
        ]));
    });
    
    test('obscured, 0', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Empty ]
        ]));
    });
    
    test('0, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 1, CellType.Empty ]
        ]));
    });
    
    test('obscured, obscured: two bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 2,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ],
            [ 1, CellType.Bomb ]
        ]));
    });

    test('obscured, obscured: no bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Empty ],
            [ 1, CellType.Empty ]
        ]));
    });

    test('obscured, obscured: one bomb', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map());
    });
    
    test('flag, flag', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Flagged,
            }, {
                type: CellType.Flagged,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map());
    });
    
    test('2, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 2,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 2,
        }
        
        expect(() => getResolvableCells(board)).toThrowError();
    });

    test('obscured, 2', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 2,
            }],
            numBombs: 2,
        }
        
        expect(() => getResolvableCells(board)).toThrowError();
    });
    
    test('flagged, 1', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Flagged,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map());
    });

    test('1, flagged', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Flagged,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map());
    });
    
    test('flagged, 0', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Flagged,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }],
            numBombs: 1,
        }
        
        expect(() => getResolvableCells(board)).toThrowError();
    });
    
    test('0, flagged', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }, {
                type: CellType.Flagged,
            }],
            numBombs: 1,
        }
        
        expect(() => getResolvableCells(board)).toThrowError();
    });
    
    test('flagged, obscured: one bomb', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Flagged,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 1, CellType.Bomb ]
        ]));
    });

    test('flagged, obscured: no bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Flagged,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 1, CellType.Empty ]
        ]));
    });
    test('obscured, flagged: one bomb', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Flagged,
            }],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ]
        ]));
    });

    test('obscured, flagged: no bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Flagged,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Empty ]
        ]));
    });
});

describe('four cells in a line', () => {
    test('obscured, obscured, obscured, 0: no bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Empty ],
            [ 1, CellType.Empty ],
            [ 2, CellType.Empty ]
        ]));
    });

    test('obscured, obscured, obscured, 0: one bomb', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 2, CellType.Empty ]
        ]));
    });

    test('obscured, obscured, obscured, 0: two bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }],
            numBombs: 2,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ],
            [ 1, CellType.Bomb ],
            [ 2, CellType.Empty ]
        ]));
    });

    test('obscured, obscured, obscured, 0: three bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }],
            numBombs: 3,
        }
        
        expect(() => getResolvableCells(board)).toThrowError();
    });

    test('obscured, obscured, obscured, 1: no bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }],
            numBombs: 0,
        }
        
        expect(() => getResolvableCells(board)).toThrowError();
    });

    test('obscured, obscured, obscured, 1: one bomb', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Empty ],
            [ 1, CellType.Empty ],
            [ 2, CellType.Bomb ]
        ]));
    });

    test('obscured, obscured, obscured, 1: two bomb', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }],
            numBombs: 2,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 2, CellType.Bomb ]
        ]));
    });

    test('obscured, obscured, obscured, 1: three bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }],
            numBombs: 3,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ],
            [ 1, CellType.Bomb ],
            [ 2, CellType.Bomb ]
        ]));
    });
    
    test('obscured, obscured, 0, obscured: no bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Empty ],
            [ 1, CellType.Empty ],
            [ 3, CellType.Empty ]
        ]));
    });

    test('obscured, obscured, 0, obscured: one bomb', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ],
            [ 1, CellType.Empty ],
            [ 3, CellType.Empty ]
        ]));
    });

    test('obscured, obscured, 0, obscured: two bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 2,
        }
        
        expect(() => getResolvableCells(board)).toThrowError();
    });

    test('obscured, obscured, 0, obscured: three bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 3,
        }
        
        expect(() => getResolvableCells(board)).toThrowError();
    });

    test('obscured, obscured, 1, obscured: no bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 0,
        }
        
        expect(() => getResolvableCells(board)).toThrowError();
    });

    test('obscured, obscured, 1, obscured: one bomb', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Empty ]
        ]));
    });

    test('obscured, obscured, 1, obscured: two bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 2,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ]
        ]));
    });

    test('obscured, obscured, 1, obscured: three bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 3,
        }
        
        expect(() => getResolvableCells(board)).toThrowError();
    });

    test('obscured, obscured, 2, obscured: no bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 0,
        }
        
        expect(() => getResolvableCells(board)).toThrowError();
    });

    test('obscured, obscured, 2, obscured: one bomb', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 2,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 1,
        }

        expect(() => getResolvableCells(board)).toThrowError();
    });

    test('obscured, obscured, 2, obscured: two bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 2,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 2,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Empty ],
            [ 1, CellType.Bomb ],
            [ 3, CellType.Bomb ]
        ]));
    });

    test('obscured, obscured, 2, obscured: three bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 2,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 3,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ],
            [ 1, CellType.Bomb ],
            [ 3, CellType.Bomb ]
        ]));
    });

    test('1, obscured, obscured, 1', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }],
            numBombs: 2,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 1, CellType.Bomb ],
            [ 2, CellType.Bomb ]
        ]));
    });

    test('obscured, 1, 1, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 2,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ],
            [ 3, CellType.Bomb ]
        ]));
    });

    test('0, obscured, obscured, 0', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 1, CellType.Empty ],
            [ 2, CellType.Empty ]
        ]));
    });

    test('obscured, 0, 0, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Empty ],
            [ 3, CellType.Empty ]
        ]));
    });

    test('1, obscured, 2, obscured: two bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 4,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 2,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 2,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 1, CellType.Bomb ],
            [ 3, CellType.Bomb ]
        ]));
    });
});

describe('two by two', () => {
    test('obscured, obscured, 0, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Empty ],
            [ 1, CellType.Empty ],
            [ 3, CellType.Empty ]
        ]));
    });

    test('obscured, obscured, 1, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 1, CellType.Empty ],
        ]));
    });

    test('obscured, obscured, 2, obscured: two bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 2,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 2,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ],
            [ 1, CellType.Empty ],
            [ 3, CellType.Bomb ],
        ]));
    });

    test('obscured, obscured, 2, obscured: three bombs', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 2,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 3,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ],
            [ 1, CellType.Bomb ],
            [ 3, CellType.Bomb ],
        ]));
    });

    test('obscured, 2, 2, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 2,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 2,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 2,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ],
            [ 3, CellType.Bomb ],
        ]));
    });

    test('obscured, 1, 1, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map());
    });

    test('1, 1, 1, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 3, CellType.Bomb ],
        ]));
    });
});

describe('Circle of seven cells', () => {
    test('0 in the middle', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 3,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }, {
                type: CellType.Obscured,
            }, 
            null, {
                type: CellType.Obscured,
            }, null],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Empty ],
            [ 1, CellType.Empty ],
            [ 2, CellType.Empty ],
            [ 3, CellType.Empty ],
            [ 5, CellType.Empty ],
            [ 7, CellType.Empty ],
        ]));
    });
    
    test('1 in the middle', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 3,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }, 
            null, {
                type: CellType.Obscured,
            }, null],
            numBombs: 1,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map());
    });
    
    test('6 in the middle', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 3,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 6,
            }, {
                type: CellType.Obscured,
            }, 
            null, {
                type: CellType.Obscured,
            }, null],
            numBombs: 6,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 0, CellType.Bomb ],
            [ 1, CellType.Bomb ],
            [ 2, CellType.Bomb ],
            [ 3, CellType.Bomb ],
            [ 5, CellType.Bomb ],
            [ 7, CellType.Bomb ],
        ]));
    });
});