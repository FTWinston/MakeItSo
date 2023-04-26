import type { CellBoardDefinition } from '../types/CellBoard';
import { CellState, CellType, CountType, UnderlyingCellState } from '../types/CellState';
import { ShapeConfig, generateBoardShape } from './generateBoardShape';
import { getAdjacentCells, getResolvableCells } from './getResolvableCells';
import { getRandom, getRandomInt } from 'src/utils/random';
import { shuffle } from 'src/utils/shuffle';

export interface GenerationConfig extends ShapeConfig {
    /** Fraction of valid cells that are bombs. Lower values are easier. */
    bombFraction: number;

    /** Fraction of cells that start revealed. Higher values are easier. */
    revealFraction?: number;

    /** Fraction of valid (non-bomb) cells that are replaced by a "radius" clue. Higher values are easier. */
    radiusClueFraction?: number;

    /** Fraction of valid (non-bomb) cells that show a ? instead of a cell count. Lower values are easier. */
    unknownFraction?: number;

    /** Fraction of rows (along any axis) that get a row clue. Higher values are easier. */
    rowClueFraction?: number;

    /** Chance of using a contiguous clue when a cell has contiguous bombs. */
    contiguousClueFraction?: number;

    /** Chance of using a split clue when a cell has non-contiguous bombs. */
    splitClueFraction?: number;
}

interface GeneratingState {
    config: GenerationConfig;
    rows: number;
    columns: number;
    cells: (CellState | null)[];
    numBombs?: number;
    numBombsSoFar: number;
    initiallyRevealedIndexes: Set<number>;
    obscuredIndexes: Set<number>;
    normalClueIndexes: number[];
}

/** Prepare the shape of the board, with every cell obscured, and any extra info needed for generation purposes. */
function createInitialState(config: GenerationConfig): GeneratingState {
    const shape = generateBoardShape<CellState>(config, { type: CellType.Obscured });

    const obscuredIndexes = new Set<number>();
    for (let i = 0; i < shape.cells.length; i++) {
        if (shape.cells[i] !== null) {
            obscuredIndexes.add(i);
        }
    }

    return {
        ...shape,
        config,
        numBombsSoFar: 0,
        initiallyRevealedIndexes: new Set(),
        obscuredIndexes,
        normalClueIndexes: [],
    };
}

/** Determine what cells can be resolved. If they're bombs, mark them as such. If they're empty, mark them unknown. Return the "empty" cell indexes. */
function resolveCells(state: GeneratingState): number[] {
    const resolvableCells = getResolvableCells(state);

    const revealableIndexes: number[] = [];

    // Reveal any just-resolved cells, but don't yet complete the clue on any empty cells. (Bombs must be resolved first, as they may affect the clues!)
    for (const [index, cellType] of resolvableCells) {
        state.obscuredIndexes.delete(index);

        if (cellType === CellType.Bomb) {
            state.cells[index] = { type: CellType.Bomb };
            state.numBombsSoFar++;
        }
        else if (cellType === CellType.Empty) {
            state.cells[index] = { type: CellType.Unknown };
            revealableIndexes.push(index);
        }
    }

    return revealableIndexes;
}

function chooseInitiallyRevealedCell(state: GeneratingState): number {
    // TODO: it's inefficient for this to be a Set here. But it's helpful elsewhere!
    const obscuredIndexes = [...state.obscuredIndexes];

    // TODO: pick an obscured cell with less than six adjacent obscured cells?
    return getRandom(obscuredIndexes);
}


function addEmptyCellClue(state: GeneratingState, index: number) {
    const adjacentCells = getAdjacentCells(index, state, state.rows);
    
    const numBombs = adjacentCells.filter(cell => cell?.cell.type === CellType.Bomb).length;
    const numObscured = adjacentCells.filter(cell => cell?.cell.type === CellType.Obscured).length;

    // TODO: generate "excess" contiguous / split clues here?

    const flagNum = numBombs + getRandomInt(numObscured + 1);

    state.cells[index] = {
        type: CellType.Empty,
        countType: CountType.Normal,
        number: flagNum,
    };

    if (flagNum > 1) {
        state.normalClueIndexes.push(index);
    }
}

/** Put an "empty" clue into each provided cell index. If they're empty, add a new initial clue instead. */
function addClues(state: GeneratingState, revealableIndexes: number[]) {
    // If no cells can currently be revealed, add an initial clue to help reveal things.
    if (revealableIndexes.length === 0) {
        // TODO: instead of revealing a new cell, consider upgrading a "normal" clue to be contiguous or split.
        // TODO: instead of revealing a new cell, consider adding a row clue.
        // TODO: instead of revealing a new cell, consider adding an area clue.
        // TODO: instead of revealing a new cell, consider setting numBombs to 0, or to the number of remaining cells.
        const index = chooseInitiallyRevealedCell(state);

        state.initiallyRevealedIndexes.add(index);
        state.obscuredIndexes.delete(index);
        revealableIndexes.push(index);
    }
    else {
        shuffle(revealableIndexes);
    }

    for (const index of revealableIndexes) {
        addEmptyCellClue(state, index);
    }
}

/** Prepare the initial "display" version of the board, which has all cells obscured except for initially-revealed ones. */
function createBoardDefinition(state: GeneratingState) {    
    const display: Array<CellState | null> = state.cells
        .map((cell, index) => {
            if (cell === null || state.initiallyRevealedIndexes.has(index)) {
                return cell;
            }

            return { type: CellType.Obscured };
        });

    return {
        cells: display,
        columns: state.columns,
        underlying: state.cells as Array<UnderlyingCellState | null>, // No underlying cells are still obscured, and none were ever flagged.
    };
}

export function generateBoard(config: GenerationConfig): CellBoardDefinition {
    const state: GeneratingState = createInitialState(config);

    // Repeat the following until there are no obscured cells left. Then the whole board has been resolved!
    while (state.obscuredIndexes.size > 0) {
        const revealableIndexes: number[] = resolveCells(state);
        
        addClues(state, revealableIndexes);
    }

    return createBoardDefinition(state);
}
