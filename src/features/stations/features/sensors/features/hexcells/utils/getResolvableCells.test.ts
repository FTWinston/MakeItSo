import { CellType, CountType } from '../types/CellState';
import { BoardInfoIgnoringErrors, getResolvableCells } from './getResolvableCells';

describe('simplest cases', () => {
    test('two cells one bomb', () => {
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
        expect(getResolvableCells(board)).toEqual([{
            index: 0,
            type: CellType.Bomb,
        }]);
    });

    test('two cells one bomb, reversed', () => {
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
        expect(getResolvableCells(board)).toEqual([{
            index: 0,
            type: CellType.Bomb,
        }]);
    });
    
    test('two cells no bomb', () => {
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
        expect(getResolvableCells(board)).toEqual([{
            index: 0,
            type: CellType.Empty,
        }]);
    });
    
    test('three cells no bomb', () => {
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
        expect(getResolvableCells(board)).toEqual([{
            index: 0,
            type: CellType.Empty,
        }, {
            index: 2,
            type: CellType.Empty,
        }]);
    });
})
