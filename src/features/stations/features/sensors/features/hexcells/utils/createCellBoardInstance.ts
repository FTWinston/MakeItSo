import { Random } from 'src/utils/random';
import { CellBoard, CellBoardDefinition } from '../types/CellBoard';
import { CellType, DisplayCellState } from '../types/CellState';
import { GenerationConfig, generateBoard } from './generateBoard';
import { isClueCell } from './isClueCell';
import { isClueResolved } from './resolved';

export function createCellBoardInstance(definition: CellBoardDefinition, random: Random): CellBoard {
    const board: CellBoard = {
        columns: definition.columns,
        underlying: definition.underlying,
        cells: definition.cells.map((cell) => {
            if (cell === null) {
                return null;
            }
            
            // Intentionally skip targetIndexes and resolved properties now, will handle in subsequent loop.
            return { ...cell } as DisplayCellState;
        }),
        hints: definition.hints,
        numErrors: 0,
        numBombsLeft: definition.underlying
            .filter(cell => cell?.type === CellType.Bomb)
            .length,
        overriddenCells: [],
        overridableCells: [],
        protectErrors: false,
    };

    for (let index = 0; index < board.cells.length; index++) {
        const cell = board.cells[index];
        const underlying = board.underlying[index];
        
        if (isClueCell(cell) && isClueCell(underlying)) {
            cell.targetIndexes = underlying.targetIndexes;
            cell.resolved = isClueResolved(board, underlying.targetIndexes);
        }

        // Note all cell indexes that can be obscured later.
        if (underlying?.type === CellType.AdjacentClue) {
            board.overridableCells.push(index);
        }
    }

    // Ensure that cells aren't just obscured from top to bottom.
    random.shuffle(board.overridableCells);

    return board;
}

export function generateInstance(config: GenerationConfig) {
    return createCellBoardInstance(generateBoard(config), new Random(config.seed));
}
