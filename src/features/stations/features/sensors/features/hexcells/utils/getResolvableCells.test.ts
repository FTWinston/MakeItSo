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
    /*
    test('obscured, 0, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 3,
            cells: [{
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
            [ 2, CellType.Empty ]
        ]));
    });
    
    test('obscured, 1, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 3,
            cells: [{
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

        expect(getResolvableCells(board)).toEqual(new Map());
    });
    
    test('obscured, 2, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 3,
            cells: [{
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
            [ 2, CellType.Bomb ]
        ]));
    });
    
    test('0, obscured, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 3,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 1, CellType.Empty ]
        ]));
    });
    
    test('1, obscured, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 3,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
            }, {
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 0,
        }

        expect(getResolvableCells(board)).toEqual(new Map([
            [ 1, CellType.Bomb ]
        ]));
    });
    
    test('obscured, obscured, 0', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 3,
            cells: [{
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
            [ 1, CellType.Empty ]
        ]));
    });
    
    test('obscured, obscured, 1', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 3,
            cells: [{
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
            [ 1, CellType.Bomb ]
        ]));
    });
    
    test('0, obscured, 0', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 3,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 0,
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
            [ 1, CellType.Empty ]
        ]));
    });
    
    test('1, obscured, 1', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 3,
            cells: [{
                type: CellType.Empty,
                countType: CountType.Normal,
                number: 1,
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
            [ 1, CellType.Bomb ]
        ]));
    });

    // TODO: test invalid scenarios, e.g. 1, obscured, 0

    // TODO: test scenarios with revealed bombs
    */
});

// TODO: 4 cells not in a line