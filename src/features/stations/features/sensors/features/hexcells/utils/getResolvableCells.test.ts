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
    
    test('obscured, obscured', () => {
        const board: BoardInfoIgnoringErrors = {
            columns: 2,
            cells: [{
                type: CellType.Obscured,
            }, {
                type: CellType.Obscured,
            }],
            numBombs: 0,
        }
        
        expect(getResolvableCells(board)).toEqual(new Map());
    }); 
});

describe('three cells in a line', () => {
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
            numBombs: 0,
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
            numBombs: 0,
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
            numBombs: 0,
        }
        expect(getResolvableCells(board)).toEqual(new Map([
            [ 1, CellType.Bomb ]
        ]));
    });

    // TODO: test invalid scenarios, e.g. 1, obscured, 0
});

// TODO: 3 cells not in a line