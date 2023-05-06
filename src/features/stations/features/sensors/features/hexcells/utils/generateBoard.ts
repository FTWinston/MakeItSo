import type { CellBoardDefinition } from '../types/CellBoard';
import { CellState, CellType, CountType, EmptyCell, RadiusClue, RowClue, RowDirection, UnderlyingCellState } from '../types/CellState';
import { Clue, ClueMap } from '../types/Clue';
import { areValuesContiguous } from './areValuesContiguous';
import { ShapeConfig, generateBoardShape } from './generateBoardShape';
import { addClue, updateClues } from './getClues';
import { ResolvableCells, getResolvableCells } from './getResolvableCells';
import { deleteRandom, getRandom, insertRandom } from 'src/utils/random';
import { shuffle } from 'src/utils/shuffle';
import { coordinateFromIndex, getAdjacentIndexes, getIndexesInRadius, getIndexesInRow } from './indexes';

export interface GenerationConfig extends ShapeConfig {
    /** Fraction of obscured cells that will be revealed to be bombs. Lower values are easier. */
    bombFraction: number;

    /** Fraction of obscured cells that will be revealed to show a ? instead of a cell count. Lower values are easier. */
    unknownFraction?: number;

    /** When generating, chance of having a new cell start revealed. */
    revealChance?: number;

    /** When generating, chance of adding a "radius" clue. */
    radiusClueChance?: number;

    /** When generating, chance of adding a "row" clue (along any axis). */
    rowClueChance?: number;

    /** When generating, chance of upgrading a "normal" clue to indicate that adjacent bombs are contiguous. */
    contiguousClueChance?: number;

    /** When generating, chance of upgrading a "normal" clue to indicate that adjacent bombs are not contiguous. */
    splitClueChance?: number;
}

type FullConfig = Required<GenerationConfig> & {
    fullChance: number;
}

interface GeneratingState extends CellBoardDefinition {
    config: FullConfig;
    clues: ClueMap;
    rows: number;
    numBombs?: number;
    numBombsSoFar: number;
    initiallyRevealedIndexes: Set<number>;
    obscuredIndexes: Set<number>;
    potentialContiguousClueCells: Clue[];
    potentialSplitClueCells: Clue[];
    potentialRowClueIndexes: number[];
    potentialRadiusClueIndexes: number[];
    nextResolvableCells?: ResolvableCells;
}

function expandConfig(config: GenerationConfig): FullConfig {
    const fullConfig: FullConfig = {
        ...config,
        orientation: config.orientation ?? 'portrait',
        unknownFraction: config.unknownFraction ?? 0,
        contiguousClueChance: config.contiguousClueChance ?? 0,
        splitClueChance: config.splitClueChance ?? 0,
        rowClueChance: config.rowClueChance ?? 0,
        radiusClueChance: config.radiusClueChance ?? 0,
        revealChance: config.revealChance ?? 0,
        fullChance: 0,
    };

    // Make the "chance" variables cumulative.
    fullConfig.splitClueChance += fullConfig.contiguousClueChance;
    fullConfig.rowClueChance += fullConfig.splitClueChance;
    fullConfig.radiusClueChance += fullConfig.rowClueChance;
    fullConfig.revealChance += fullConfig.radiusClueChance;
    if (fullConfig.revealChance === 0) {
        fullConfig.revealChance = 1;
    }
    fullConfig.fullChance = fullConfig.revealChance;

    return fullConfig;
}

/** Prepare the shape of the board, with every cell obscured, and any extra info needed for generation purposes. */
function createInitialState(config: FullConfig): GeneratingState {
    const { cells, rows, columns } = generateBoardShape<CellState>(config, { type: CellType.Obscured });

    const obscuredIndexes = new Set<number>();
    const underlying = cells.map((cell, index) => {
        if (cell === null) {
            return null;
        }

        obscuredIndexes.add(index);
        return { type: CellType.Exploded };
    }) as Array<UnderlyingCellState | null>;

    const potentialRowClueIndexes = cells.reduce((results, cell, index) => {
        if (cell === null && getAdjacentIndexes(index, columns, rows)
            .some(adjacentIndex => adjacentIndex !== null && cells[adjacentIndex] !== null)
        ) {
            insertRandom(results, index);
        }
        return results;
    }, [] as number[]);

    const potentialRadiusClueIndexes = cells.reduce((results, _cell, index) => {
        const coordinate = coordinateFromIndex(index, columns);

        if (coordinate.col > 1 && coordinate.col < columns - 2
            && coordinate.row > 1 && coordinate.row < rows - 2
        ) {
            insertRandom(results, index);
        }
        return results;
    }, [] as number[]);

    return {
        config,
        clues: new Map(),
        rows,
        columns,
        cells,
        underlying,
        numBombsSoFar: 0,
        initiallyRevealedIndexes: new Set(),
        obscuredIndexes,
        potentialContiguousClueCells: [],
        potentialSplitClueCells: [],
        potentialRowClueIndexes,
        potentialRadiusClueIndexes,
    };
}

/** Determine what cells can be resolved. If they're bombs, mark them as such. If they're empty, mark them unknown, and add to state.revealableIndexes. */
function resolveCells(state: GeneratingState) {
    // If a previous step left some "pre-computed" resolvable cells, reuse those. Otherwise, resolve.
    const resolvableCells = state.nextResolvableCells
        ?? getResolvableCells(state, state.clues);
    delete state.nextResolvableCells;

    if (resolvableCells.size === 0) {
        return false;
    }
    
    const revealableIndexes: number[] = [];

    for (const [index, cellType] of resolvableCells) {
        state.obscuredIndexes.delete(index);

        // Allocate and reveal any just-resolved bombs.
        if (cellType === CellType.Bomb) {
            state.cells[index] = state.underlying[index] = { type: CellType.Bomb };
            state.numBombsSoFar++;
        }
        // Allocate just-resolved empty cells to unknown, but don't reveal them yet.
        // (All just-resolved bombs must be resolved before these can be allocated to Empty, as these may affect the clues we allocate!)
        else {
            state.underlying[index] = { type: CellType.Unknown };
            revealableIndexes.push(index);
        }
    }

    revealCells(state, revealableIndexes);
    return true;
}

function tryModifyClue(state: GeneratingState, cluesToTry: Clue[], countType: CountType): boolean {
    for (let tryIndex = 0; tryIndex < cluesToTry.length; tryIndex++) {
        const clue = cluesToTry[tryIndex];

        if (clue.associatedObscuredIndexes.length === 0) {
            // Nothing obscured next to this cell, it can't give us more info
            // if it is upgraded now, or in the future.
            cluesToTry.splice(tryIndex, 1);
            tryIndex--;
            continue;
        }

        const cell = state.cells[clue.clueIndex] as EmptyCell | RowClue;

        // Try each that remains, until we find one that lets more cells
        // be revealed if its type is changed.
        const prevType = clue.countType;
        clue.countType = cell.countType = countType;

        const nextResolvableCells = getResolvableCells(state, state.clues);
        if (nextResolvableCells.size > 0) {
            state.nextResolvableCells = nextResolvableCells;
            return true;
        }

        // Reset the count type on a cell that a cell that wasn't (yet) worth changing.
        clue.countType = cell.countType = prevType;
    }
    
    return false;
}

function tryAddRowClue(state: GeneratingState): boolean {
    // TODO: this
    const index = deleteRandom(state.potentialRowClueIndexes);
    if (index === null) {
        return false;
    }

    // addRowClue(state, index, direction)
    // return true;
    return false;
}

function tryAddRadiusClue(state: GeneratingState): boolean {
    const index = deleteRandom(state.potentialRadiusClueIndexes);
    if (index === null) {
        return false;
    }

    addRadiusClue(state, index);
    return true;
}

function revealInitialCell(state: GeneratingState) {
    // TODO: it's inefficient for this to be a Set here. But it's helpful elsewhere!
    const obscuredIndexes = [...state.obscuredIndexes]
        .filter(index => state.underlying[index]?.type !== CellType.Bomb);

    // If there's no cells that can be revealed, don't reveal any.
    // (Won't we know that they're all bombs?)
    if (obscuredIndexes.length === 0) {
        return;
    }

    // Reveal an obscured cell at random.
    const index = getRandom(obscuredIndexes)!;
    state.initiallyRevealedIndexes.add(index);
    state.obscuredIndexes.delete(index);
    addEmptyCellClue(state, index);
}

function completeNewClue(
    state: GeneratingState,
    index: number,
    cell: EmptyCell | RowClue | RadiusClue,
    associatedIndexes: Array<number | null>,
) {
    const associatedCells = associatedIndexes
        .map(index => index === null ? null : state.underlying[index]) as Array<CellState | null>;
    
    let numBombs = 0;
    let hasAnyUnallocated = false;

    // Allocate associated cells now, so that our clue won't be made incorrect by a later allocation.
    // But leave these cells obscured, for now.
    for (let associationIndex = 0; associationIndex < associatedCells.length; associationIndex++) {
        const associatedCell = associatedCells[associationIndex];

        if (associatedCell?.type === CellType.Exploded) {
            hasAnyUnallocated = true;

            const associatedCellIndex = associatedIndexes[associationIndex]!;
            const addBomb = Math.random() < state.config.bombFraction;

            if (addBomb) {
                numBombs ++;
    
                state.underlying[associatedCellIndex] = {
                    type: CellType.Bomb,
                }
            }
            else {
                state.underlying[associatedCellIndex] = {
                    type: CellType.Unknown,
                }
            }
        }
        else if (associatedCell?.type === CellType.Bomb) {
            numBombs++;
        }
    }

    cell.number = numBombs;
    
    state.cells[index] = state.underlying[index] = cell;

    const clue = addClue(state, state.clues, index, cell, associatedIndexes);

    if (cell.type !== CellType.RadiusClue && numBombs > 1) {
        const contiguous = areValuesContiguous(associatedCells, cell => cell?.type === CellType.Bomb, true);
        
        if (hasAnyUnallocated) {
            if (contiguous) {
                insertRandom(state.potentialContiguousClueCells, clue);
            }
            else {
                insertRandom(state.potentialSplitClueCells, clue);
            }
        }
        
        // TODO: generate "excess" contiguous / split clues here?
    }
}

function addEmptyCellClue(state: GeneratingState, index: number) {
    const cell: EmptyCell = {
        type: CellType.Empty,
        countType: CountType.Normal,
        number: 0,
    }

    const associatedIndexes = getAdjacentIndexes(index, state.columns, state.rows);

    completeNewClue(state, index, cell, associatedIndexes);
}

function addRowClue(state: GeneratingState, index: number, direction: RowDirection) {
    const cell: RowClue = {
        type: CellType.RowClue,
        countType: CountType.Normal,
        direction,
        number: 0,
    }

    const associatedIndexes = getIndexesInRow(index, direction, state.columns, state.rows);

    completeNewClue(state, index, cell, associatedIndexes);
}

function addRadiusClue(state: GeneratingState, index: number) {
    const cell: RadiusClue = {
        type: CellType.RadiusClue,
        countType: CountType.Normal,
        number: 0,
    }

    const associatedIndexes = getIndexesInRadius(index, state.columns, state.rows);

    completeNewClue(state, index, cell, associatedIndexes);
}

/** Add a "normal" empty cell clue into each cell index provided. */
function revealCells(state: GeneratingState, revealableIndexes: number[]) {
    shuffle(revealableIndexes);

    // Ensure that at least one cell is revealed to be a empty (i.e. a clue), rather than unknown.
    let firstReveal = true;
    for (const indexToReveal of revealableIndexes) {
        if (!firstReveal && Math.random() <= state.config.unknownFraction) {
            state.cells[indexToReveal] = state.underlying[indexToReveal] = {
                type: CellType.Unknown,
            };
        }
        else {
            addEmptyCellClue(state, indexToReveal);
            firstReveal = false;
        }
    }
}

/** Add an initial clue of any allowed type onto the board, or enhance an existing clue. */
function pickAndAddClue(state: GeneratingState) {
    const chance = Math.random() * state.config.fullChance;

    if (chance <= state.config.contiguousClueChance) {
        if (tryModifyClue(state, state.potentialContiguousClueCells, CountType.Contiguous)) {
            return;
        }
    }
    else if (chance <= state.config.splitClueChance) {
        if (tryModifyClue(state, state.potentialSplitClueCells, CountType.Split)) {
            return;
        }
    }
    else if (chance <= state.config.rowClueChance) {
        if (tryAddRowClue(state)) {
            return;
        }
    }
    else if (chance <= state.config.radiusClueChance) {
        if (tryAddRadiusClue(state)) {
            return;
        }
    }

    // When no other type of clue has been added, reveal an additional cell.
    revealInitialCell(state);
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
    const fullConfig = expandConfig(config);

    let state: GeneratingState = createInitialState(fullConfig);
    let prevState = state;
    let turnsSinceLastResolution = 0;

    // Repeat the following until there are no obscured cells left. Then the whole board has been resolved!
    while (state.obscuredIndexes.size > 0) {
        if (!resolveCells(state)) {
            console.log('resolve cells failed, adding clue');

            // If a new clue was just added and it didn't help, discard it, unless we've been stuck for a while.
            if (++turnsSinceLastResolution < 20) {
                state = prevState;
            }

            // Copy the state when adding a clue, so we can roll back if the clue we add isn't helpful.
            state = copyState(state);
            pickAndAddClue(state);
        }
        else {
            prevState = state;
            turnsSinceLastResolution = 0;
            console.log('resolve cells succeeded');
        }

        updateClues(state, state.clues);
    }

    return createBoardDefinition(state);
}

function copyState(state: GeneratingState): GeneratingState {
    return {
        ...state,
        clues: new Map(state.clues),
        cells: [...state.cells],
        underlying: [...state.underlying],
        initiallyRevealedIndexes: new Set(state.initiallyRevealedIndexes),
        obscuredIndexes: new Set(state.obscuredIndexes),
        potentialContiguousClueCells: [...state.potentialContiguousClueCells],
        potentialSplitClueCells: [...state.potentialSplitClueCells],
        potentialRowClueIndexes: [...state.potentialRowClueIndexes],
        potentialRadiusClueIndexes: [...state.potentialRadiusClueIndexes],
    };
}

