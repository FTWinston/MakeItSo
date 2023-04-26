import type { CellBoardInfo } from '../types/CellBoard';
import { CellState, CellType, CountType, EmptyCell } from '../types/CellState';
import { areValuesContiguous } from './areValuesContiguous';
import { getAdjacentIndexes } from './getAdjacentIndexes';

export type MinimumResolvableBoardInfo = Pick<CellBoardInfo, 'cells' | 'columns'> & Partial<Pick<CellBoardInfo, 'numBombs'>>;

interface CellWithIndex {
    index: number;
    cell: CellState;
}

interface EmptyCellWithIndex {
    index: number;
    cell: EmptyCell;
}

export type ResolutionResult = CellType.Empty | CellType.Bomb;

export type ResolvableCells = Map<number, ResolutionResult>;

interface RevealedCellInfo {
    cellIndex: number;
    countType: CountType;
    numUnrevealedBombsAdjacent: number;
    adjacentObscuredCellIndexes: number[];
    adjacentCells: Array<CellWithIndex | null>;
}

export function getAdjacentCells(cellIndex: number, board: MinimumResolvableBoardInfo, rows: number) {
    return getAdjacentIndexes(cellIndex, board.columns, rows)
        .reduce((output, index) => {
            if (index === null) {
                output.push(null);
            }
            else {
                const cell = board.cells[index];
                
                if (cell !== null) {
                    output.push({ index, cell });
                }
                else {
                    output.push(null);
                }
            }
            return output;
        }, [] as Array<CellWithIndex | null>);
}

function getCellInfo(cellIndex: number, cell: EmptyCell, board: MinimumResolvableBoardInfo, rows: number): RevealedCellInfo {
    const adjacentCells = getAdjacentCells(cellIndex, board, rows);
        
    const numRevealedBombsAdjacent = adjacentCells.filter(adjacent => adjacent?.cell.type === CellType.Flagged).length;

    return {
        cellIndex,
        countType: cell.countType,
        numUnrevealedBombsAdjacent: cell.number - numRevealedBombsAdjacent,
        adjacentCells,
        adjacentObscuredCellIndexes: adjacentCells
            .reduce((adjacencyResults, adjacent) => {
                if (adjacent?.cell.type === CellType.Obscured) {
                    adjacencyResults.push(adjacent.index);
                }
                return adjacencyResults;
            }, [] as number[]),
    };
}

export function getRevealedCellInfo(board: MinimumResolvableBoardInfo) {
    const rows = Math.ceil(board.cells.length / board.columns);

    const allRevealedCells = board.cells
        .reduce((output, cell, index) => {
            if (cell?.type === CellType.Empty) {
                output.push({ index, cell });
            }
            return output;
        }, [] as EmptyCellWithIndex[]);

    return new Set(
        allRevealedCells
            .map(revealedCell => getCellInfo(revealedCell.index, revealedCell.cell, board, rows))
            .filter(revealedCell => revealedCell.adjacentObscuredCellIndexes.length > 0)
    );
}

function incrementCombination<TOtherValue = never>(combination: Array<ResolutionResult | TOtherValue>) {
    // Treat combination as a binary number, but potentially with holes in it. (i.e. indexes that aren't empty or bomb, to be ignored.)
    // Starting at the end, change every bomb value to be empty, until we find an empty value.
    // Change that empty value to a bomb and return true (there may be more combinations possible), or false if it's not found (all combinations have been handled.)
    let currentIndex = combination.length - 1;
    while (currentIndex >= 0 && combination[currentIndex] !== CellType.Empty) {
        if (combination[currentIndex] === CellType.Bomb) {
            combination[currentIndex] = CellType.Empty;
        }
        currentIndex--;
    }

    if (currentIndex >= 0) {
        combination[currentIndex] = CellType.Bomb;
        return true;
    }
    else {
        return false;
    }
}

function resolveContiguousOrSplitCells(
    results: ResolvableCells,
    numUnrevealedBombs: number,
    cells: (CellWithIndex | null)[],
    contiguous: boolean,
    cellsAreLooped: boolean
) {
    const cellsThatCanBeEmpty = new Array<boolean>(cells.length).fill(false);
    const cellsThatCanBeBombs = new Array<boolean>(cells.length).fill(false);

    // Create an initial combination that won't bugger up based on existing values.
    const currentCombination = cells.map(cell => {
        if (cell === null || cell.cell.type === CellType.Empty) {
            return CellType.Unknown;
        }
        if (cell.cell.type === CellType.Obscured) {
            return CellType.Empty;
        }
        return cell.cell.type;
    });

    const isBomb = (type: CellType) => type === CellType.Bomb || type === CellType.Flagged;

    // Consider every valid combination (right number of bombs, bombs are contiguous or not).
    while (true) {
        if (currentCombination.filter(value => value === CellType.Bomb).length === numUnrevealedBombs
            && areValuesContiguous(currentCombination, isBomb, cellsAreLooped) === contiguous) {
            
            // Update cellsThatCanBeEmpty & cellsThatCanBeBombs with the results of this combination.
            for (let i = 0; i < currentCombination.length; i++) {
                const currentValue = currentCombination[i];
                if (currentValue === CellType.Bomb) {
                    cellsThatCanBeBombs[i] = true;
                }
                else if (currentValue === CellType.Empty) {
                    cellsThatCanBeEmpty[i] = true;
                }
            }
        }
        
        if (!incrementCombination(currentCombination)) {
            break;
        }
    }

    // If a cell is a bomb or empty in every combination, add that to results.
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (cell === null) {
            continue;
        }

        const canBeEmpty = cellsThatCanBeEmpty[i];
        const canBeBomb = cellsThatCanBeBombs[i];

        if (canBeBomb !== canBeEmpty) {
            results.set(cell.index, canBeBomb ? CellType.Bomb : CellType.Empty);
        }
    }
}

function resolveIndividualCellCounts(revealedCells: Set<RevealedCellInfo>, board: MinimumResolvableBoardInfo) {
    const results: ResolvableCells = new Map();

    for (const revealedCell of revealedCells) {
        // Where the number on an empty cell exactly matches the number of adjacent obscured cells minus the number of adjacent bombs,
        // all adjacent obscured cells can be resolved to be bombs.
        if (revealedCell.adjacentObscuredCellIndexes.length === revealedCell.numUnrevealedBombsAdjacent) {
            for (const adjacentObscuredCellIndex of revealedCell.adjacentObscuredCellIndexes) {
                results.set(adjacentObscuredCellIndex, CellType.Bomb);
            }
        }

        // Where the number on an empty cell exactly matches the number of adjacent (flagged) bombs,
        // all adjacent obscured cells can be resolved to be empty.
        else if (revealedCell.numUnrevealedBombsAdjacent === 0) {
            for (const adjacentObscuredCellIndex of revealedCell.adjacentObscuredCellIndexes) {
                results.set(adjacentObscuredCellIndex, CellType.Empty);
            }
        }

        // If we have more bombs than we have obscured cells, we have a problem.
        else if (revealedCell.numUnrevealedBombsAdjacent > revealedCell.adjacentObscuredCellIndexes.length) {
            throw new Error(`Cell ${revealedCell.cellIndex}'s number is greater than the number of bombs that could surround it. (${revealedCell.adjacentObscuredCellIndexes.length} obscured cells, ${revealedCell.numUnrevealedBombsAdjacent} bombs in them)`);
        }

        else if (board.numBombs !== undefined && revealedCell.numUnrevealedBombsAdjacent > board.numBombs) {
            throw new Error(`Cell ${revealedCell.cellIndex} has more bombs still to reveal (${revealedCell.numUnrevealedBombsAdjacent}) than the number of bombs remaining on the board (${board.numBombs}).`);
        }

        else if (revealedCell.countType === CountType.Contiguous || revealedCell.countType === CountType.Split) {
            resolveContiguousOrSplitCells(
                results,
                revealedCell.numUnrevealedBombsAdjacent,
                revealedCell.adjacentCells,
                revealedCell.countType === CountType.Contiguous,
                true
            );
        }
    }

    return results;
}

function getAllObscuredCellIndexes(board: MinimumResolvableBoardInfo): Set<number> {
    const indexes = board.cells
        .reduce((output, cell, index) => {
            if (cell?.type === CellType.Obscured) {
                output.push(index);
            }
            return output;
        }, [] as number[]);

    return new Set(indexes);
}

function resolveCellsUsingBombCount(obscuredCellIndexes: Set<number>, numBombs: number): ResolvableCells {
    const results: ResolvableCells = new Map();
    
    if (numBombs === 0) {
        // If there's no bombs left, every obscured cell can resolve to being empty.
        for (const obscuredCellIndex of obscuredCellIndexes) {
            results.set(obscuredCellIndex, CellType.Empty);
        }
    }
    else if (numBombs === obscuredCellIndexes.size) {
        // If the number of bombs left matches the number of obscured cells left.
        for (const obscuredCellIndex of obscuredCellIndexes) {
            results.set(obscuredCellIndex, CellType.Bomb);
        }
    }
    else if (numBombs > obscuredCellIndexes.size) {
        // Number of bombs left is greater than the number of obscured cells left.
        throw new Error(`Board has ${numBombs} bomb(s) left, but only ${obscuredCellIndexes.size} obscured cells.`);
    }

    return results;
}

function discardObscuredCellsAdjacentToOnlyOneRevealedCell(
    obscuredCellIndexes: Set<number>,
    revealedCells: Set<RevealedCellInfo>,
): number {
    const revealedCellsByExclusiveAdjacentObscuredCellIndex = new Map<number, RevealedCellInfo>();
    const revealedCellsWithOnlyExclusiveAdjacentObscuredCells = new Set<RevealedCellInfo>(revealedCells);

    // Filter out any revealed cells whose adjacent cells aren't exclusive.
    for (const revealedCell of revealedCells.values()) {
        for (const obscuredCell of revealedCell.adjacentObscuredCellIndexes) {
            if (revealedCellsByExclusiveAdjacentObscuredCellIndex.has(obscuredCell)) {
                // This cell index isn't exclusive! gasp.
                revealedCellsWithOnlyExclusiveAdjacentObscuredCells.delete(revealedCell);
            }
            else {
                // This cell index is exclusive, so far.
                revealedCellsByExclusiveAdjacentObscuredCellIndex.set(obscuredCell, revealedCell);
            }
        }
    }

    if (revealedCellsWithOnlyExclusiveAdjacentObscuredCells.size === 0) {
        return 0;
    }

    // For each "all exclusive" revealed cell, reduce the bomb count by its value, and remove its adjacent cells from the set.
    let numBombsDiscarded = 0;
    for (const revealedCell of revealedCellsWithOnlyExclusiveAdjacentObscuredCells) {
        numBombsDiscarded += revealedCell.numUnrevealedBombsAdjacent;
        for (const obscuredCellIndex of revealedCell.adjacentObscuredCellIndexes) {
            obscuredCellIndexes.delete(obscuredCellIndex);
        }
    }

    return numBombsDiscarded;
}

function groupRelatedCells(revealedCells: Set<RevealedCellInfo>): RevealedCellInfo[][] {
    /*
    const results: RevealedCellInfo[][] = [];

    for (const cell of revealedCells.values()) {
        // TODO: work this out properly! Great performance gains for doing so!
    }

    return results;
    */

    return [[...revealedCells]];
}

function cellCheckIsSatified(cellCheck: RevealedCellInfo, resolutions: ResolvableCells) {
    const numBombsInResolution = cellCheck.adjacentObscuredCellIndexes
        .filter(cellIndex => resolutions.get(cellIndex) === CellType.Bomb)
        .length;

    return numBombsInResolution === cellCheck.numUnrevealedBombsAdjacent;
}

function resolveRelatedCellGroup(cellChecks: RevealedCellInfo[], maxNumBombs?: number): ResolvableCells | null {
    const allObscuredCellIndexes = [...cellChecks.reduce((obscuredCellIndexes, cell) => {
        for (const obscuredCellIndex of cell.adjacentObscuredCellIndexes) {
            obscuredCellIndexes.add(obscuredCellIndex);
        }
        return obscuredCellIndexes;
    }, new Set<number>())];

    let validResults: ResolvableCells | null = null;

    const currentCombination = new Array<ResolutionResult>(allObscuredCellIndexes.length).fill(CellType.Empty);

    while (true) {
        // Don't consider combinations with more bombs than remain on the board.
        if (maxNumBombs === undefined || currentCombination.filter(value => value === CellType.Bomb).length <= maxNumBombs) {
            const potentialResult = new Map(
                allObscuredCellIndexes.map((obscuredCellIndex, lookupIndex) => [obscuredCellIndex, currentCombination[lookupIndex]])
            );

            // For each combination, check that every cell in cellChecks is satisfied.
            let isValid = true;
            for (const cellCheck of cellChecks) {
                if (!cellCheckIsSatified(cellCheck, potentialResult)) {
                    isValid = false;
                    break;
                }
            }

            // If any cell check isn't satisfied, discard this combination.
            if (isValid) {
                if (validResults === null) {
                    // Save the results, as this is the first satisfactory combination uncovered.
                    validResults = potentialResult;
                }
                else {
                    // This isn't the first satisfactory combination, so there is no unique one.
                    return null;
                }
            }
        }

        // Treat currentCombination as a binary number, with CellTypes of Empty & Bomb in place of 0 and 1. Increment it by one each time.
        if (!incrementCombination(currentCombination)) {
            break;
        }
    };

    return validResults;
    
    // From reading around, this could also be done with matrices.
}

export function getResolvableCells(board: MinimumResolvableBoardInfo): ResolvableCells {
    let results: ResolvableCells;
    const revealedCells = getRevealedCellInfo(board);

    // For the simplest scenario, look at each revealed cell (with adjacent unrevealed cells) individually.
    // If any have the same number of outstanding bombs as they have unrevealed cells, those unrevealed cells can all resolve.
    results = resolveIndividualCellCounts(revealedCells, board);

    // If the simplest scenario gave us any resolutions, return those.
    if (results.size > 0) {
        return results;
    }

    // Get all obscured cell indexes remaining on the board.
    const obscuredCellIndexes = getAllObscuredCellIndexes(board);

    // If the number in that set matches the number of bombs remaining, then we know what they all are.
    let numBombs = board.numBombs;
    if (numBombs !== undefined) {
        results = resolveCellsUsingBombCount(obscuredCellIndexes, numBombs);

        if (results.size > 0) {
            return results;
        }
    }

    // Now resolve "related" groups of cells, where some info is known. Each group should not overlap at all.
    const relatedCellGroups = groupRelatedCells(revealedCells);

    for (const relatedCellGroup of relatedCellGroups) {
        // See if there's a single, unique combination for all cells in this group.
        const groupResults = resolveRelatedCellGroup(relatedCellGroup, numBombs);
        
        if (groupResults) {
            groupResults.forEach((value, index) => results.set(index, value));
        }
    }

    if (results.size > 0) {
        return results;
    }

    // Discard any cells from obscuredCellIndexes that are adjacent to only one revealed cell, reduce numBombs by that cell's amount, and re-run resolveCellsUsingBombCount on the obscured cells that remain.
    if (numBombs !== undefined) {
        const numRemainingBombsDiscarded = discardObscuredCellsAdjacentToOnlyOneRevealedCell(obscuredCellIndexes, revealedCells);
        if (numRemainingBombsDiscarded > 0) {
            results = resolveCellsUsingBombCount(obscuredCellIndexes, numBombs - numRemainingBombsDiscarded);
        }
    }

    return results;
}
