import type { CellBoardDefinition } from '../types/CellBoard';
import { CellState, CellType, CountType, UnderlyingCellState } from '../types/CellState';
import { ShapeConfig, generateBoardShape } from './generateBoardShape';
import { CellWithIndex, getAdjacentCells, getResolvableCells } from './getResolvableCells';
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

interface GeneratingState extends CellBoardDefinition {
    config: GenerationConfig;
    rows: number;
    numBombs?: number;
    numBombsSoFar: number;
    initiallyRevealedIndexes: Set<number>;
    obscuredIndexes: Set<number>;
    normalClueIndexes: number[];
}

/** Prepare the shape of the board, with every cell obscured, and any extra info needed for generation purposes. */
function createInitialState(config: GenerationConfig): GeneratingState {
    const { cells, rows, columns } = generateBoardShape<CellState>(config, { type: CellType.Obscured });

    const obscuredIndexes = new Set<number>();
    const underlying = cells.map((cell, index) => {
        if (cell === null) {
            return null;
        }

        obscuredIndexes.add(index);
        return { type: CellType.Exploded };
    }) as Array<UnderlyingCellState | null>;

    return {
        config,
        rows,
        columns,
        cells,
        underlying,
        numBombsSoFar: 0,
        initiallyRevealedIndexes: new Set(),
        obscuredIndexes,
        normalClueIndexes: [],
    };
}

/** Determine what cells can be resolved. If they're bombs, mark them as such. If they're empty, mark them unknown, and add to state.revealableIndexes. */
function resolveCells(state: GeneratingState) {
    const resolvableCells = getResolvableCells(state);
    const revealableIndexes: number[] = [];

    // Allocate and reveal any just-resolved bombs. Allocate just-resolved empty cells to unknown, and don't reveal them yet.
    // (All just-resolved bombs must be resolved before these can be allocated to Empty, as these may affect the clues!)
    for (const [index, cellType] of resolvableCells) {
        state.obscuredIndexes.delete(index);

        if (cellType === CellType.Bomb) {
            state.cells[index] = state.underlying[index] = { type: CellType.Bomb };
            state.numBombsSoFar++;
        }
        else {
            state.underlying[index] = { type: CellType.Unknown };
            revealableIndexes.push(index);
        }
    }

    return revealableIndexes;
}

function chooseInitiallyRevealedCell(state: GeneratingState): number {
    // TODO: it's inefficient for this to be a Set here. But it's helpful elsewhere!
    const obscuredIndexes = [...state.obscuredIndexes]
        .filter(index => state.underlying[index]?.type !== CellType.Bomb);

    // TODO: pick an obscured cell that allows us to resolve more cells. (Or try all obscuredIndexes and just pick randomly.)
    
    return getRandom(obscuredIndexes);
}

function addEmptyCellClue(state: GeneratingState, index: number) {
    const adjacentCells = getAdjacentCells(index, state.underlying, state.columns, state.rows);
    
    let numBombs = adjacentCells.filter(cell => cell?.cell.type === CellType.Bomb).length;
    const unallocated = adjacentCells.filter(cell => cell?.cell.type === CellType.Exploded) as CellWithIndex[];

    // Allocate adjacent cells now, so that our clue won't be made incorrect by a later allocation.
    // But leave these cells obscured, for now.
    for (const unallocatedCell of unallocated) {
        const addBomb = Math.random() < state.config.bombFraction;

        if (addBomb) {
            numBombs ++;

            state.underlying[unallocatedCell.index] = {
                type: CellType.Bomb,
            }
        }
        else {
            state.underlying[unallocatedCell.index] = {
                type: CellType.Unknown,
            }
        }
    }

    // TODO: generate "excess" contiguous / split clues here?

    state.cells[index] = state.underlying[index] = {
        type: CellType.Empty,
        countType: CountType.Normal,
        number: numBombs,
    };

    if (numBombs > 1) {
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

    for (const indexToReveal of revealableIndexes) {
        addEmptyCellClue(state, indexToReveal);
    }

    // TODO: consider removing some indexes from revealableIndexes, if there are a lot. This will leave "unknown" cells on the board.
}

/** Prepare the initial "display" version of the board, which has all cells obscured except for initially-revealed ones. */
function createBoardDefinition(state: GeneratingState) {    
    const display: Array<CellState | null> = state.underlying
        .map((cell, index) => {
            if (cell === null || state.initiallyRevealedIndexes.has(index)) {
                return cell;
            }

            return { type: CellType.Obscured };
        });

    return {
        cells: display,
        columns: state.columns,
        underlying: state.underlying,
    };
}

export function generateBoard(config: GenerationConfig): CellBoardDefinition {
    const state: GeneratingState = createInitialState(config);

    // Repeat the following until there are no obscured cells left. Then the whole board has been resolved!
    while (state.obscuredIndexes.size > 0) {
        const revealableIndexes = resolveCells(state);
        
        addClues(state, revealableIndexes);
    }

    return createBoardDefinition(state);
}
