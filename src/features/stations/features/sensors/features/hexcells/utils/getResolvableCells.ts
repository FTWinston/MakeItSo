import { current } from 'immer';
import type { CellBoardInfo } from '../types/CellBoard';
import { CellState, CellType, EmptyCell } from '../types/CellState';
import { getAdjacentCells } from './getAdjacentCells';

export type BoardInfoIgnoringErrors = Omit<CellBoardInfo, 'numErrors'>;

interface CellWithIndex {
    index: number;
    cell: CellState;
}

interface EmptyCellWithIndex {
    index: number;
    cell: EmptyCell;
}

type ResolutionResult = CellType.Empty | CellType.Bomb;

type ResolvableCells = Map<number, ResolutionResult>;

interface RevealedCellInfo {
    cellIndex: number;
    numUnrevealedBombsAdjacent: number;
    adjacentObscuredCellIndexes: number[];
}

function getCellInfo(cellIndex: number, cell: EmptyCell, board: BoardInfoIgnoringErrors, rows: number): RevealedCellInfo {
    const adjacentCells = getAdjacentCells(cellIndex, board.columns, rows)
        .reduce((output, index) => {
            if (index !== null) {
                const cell = board.cells[index];
                
                if (cell !== null) {
                    output.push({ index, cell });
                }
            }
            return output;
        }, [] as CellWithIndex[]);
        
    const numRevealedBombsAdjacent = adjacentCells.filter(adjacent => adjacent.cell.type === CellType.Flagged).length;

    return {
        cellIndex,
        numUnrevealedBombsAdjacent: cell.number - numRevealedBombsAdjacent,
        adjacentObscuredCellIndexes: adjacentCells
            .reduce((adjacencyResults, adjacent) => {
                if (adjacent.cell.type === CellType.Obscured) {
                    adjacencyResults.push(adjacent.index);
                }
                return adjacencyResults;
            }, [] as number[]),
    };
}

export function getRevealedCellInfo(board: BoardInfoIgnoringErrors) {
    const rows = Math.ceil(board.cells.length / board.columns);

    const allRevealedCells = board.cells
        .reduce((output, cell, index) => {
            if (cell?.type === CellType.Empty) {
                output.push({ index, cell });
            }
            return output;
        }, [] as EmptyCellWithIndex[]);

    return new Map(
        allRevealedCells
            .map(revealedCell => [
                    revealedCell.index,
                    getCellInfo(revealedCell.index, revealedCell.cell, board, rows)
            ])
    );
}

function resolveIndividualCellCounts(revealedCells: Map<number, RevealedCellInfo>, board: BoardInfoIgnoringErrors) {
    const results: ResolvableCells = new Map();

    for (const revealedCell of revealedCells.values()) {
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
            throw new Error(`Cell ${revealedCell.cellIndex}'s number is greater than the number of bombs that could surround it. (${revealedCell.adjacentObscuredCellIndexes.length} obscured cells, ${revealedCell.numUnrevealedBombsAdjacent} bombs remaining)`);
        }

        else if (revealedCell.numUnrevealedBombsAdjacent > board.numBombs) {
            throw new Error(`Cell ${revealedCell.cellIndex} has more bombs still to reveal (${revealedCell.numUnrevealedBombsAdjacent}) than the number of bombs remaining on the board (${board.numBombs}).`);
        }
    }

    return results;
}

function resolveRemainingBombCount(board: BoardInfoIgnoringErrors): ResolvableCells {
    const results: ResolvableCells = new Map();
    
    const allObscuredCellIndexes = board.cells
        .reduce((output, cell, index) => {
            if (cell?.type === CellType.Obscured) {
                output.push(index);
            }
            return output;
        }, [] as number[]);

    if (board.numBombs === 0) {
        // If there's no bombs left, every obscured cell can resolve to being empty.
        for (const obscuredCellIndex of allObscuredCellIndexes) {
            if (results.get(obscuredCellIndex) === CellType.Bomb) {
                throw new Error(`Trying to mark cell ${obscuredCellIndex} as a bomb and empty at the same time`);
            }
            results.set(obscuredCellIndex, CellType.Empty);
        }
    }
    else if (board.numBombs === allObscuredCellIndexes.length) {
        // If the number of bombs left matches the number of obscured cells left.
        for (const obscuredCellIndex of allObscuredCellIndexes) {
            if (results.get(obscuredCellIndex) === CellType.Empty) {
                throw new Error(`Trying to mark cell ${obscuredCellIndex} as empty and a bomb at the same time`);
            }
            results.set(obscuredCellIndex, CellType.Bomb);
        }
    }
    else if (board.numBombs > allObscuredCellIndexes.length) {
        // Number of bombs left is greater than the number of obscured cells left.
        throw new Error(`Board has ${board.numBombs} bomb(s) left, but only ${allObscuredCellIndexes.length} obscured cells.`);
    }

    return results;
}

function groupRelatedCells(revealedCells: Map<number, RevealedCellInfo>): RevealedCellInfo[][] {
    /*
    const results: RevealedCellInfo[][] = [];

    for (const cell of revealedCells.values()) {
        // TODO: work this out properly! Great performance gains for doing so!
    }

    return results;
    */

    return [[...revealedCells.values()]];
}

function cellCheckIsSatified(cellCheck: RevealedCellInfo, resolutions: ResolvableCells) {
    const numBombsInResolution = cellCheck.adjacentObscuredCellIndexes
        .filter(cellIndex => resolutions.get(cellIndex) === CellType.Bomb)
        .length;

    return numBombsInResolution === cellCheck.numUnrevealedBombsAdjacent;
}

function resolveRelatedCellGroup(cellChecks: RevealedCellInfo[], maxNumBombs: number): ResolvableCells | null {
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
        if (currentCombination.filter(value => value === CellType.Bomb).length <= maxNumBombs) {
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
        let currentIndex = currentCombination.length - 1;
        while (currentCombination[currentIndex] === CellType.Bomb) {
            currentCombination[currentIndex] = CellType.Empty;
            currentIndex--;
        }

        if (currentIndex >= 0) {
            currentCombination[currentIndex] = CellType.Bomb;
        }
        else {
            break;
        }
    };

    return validResults;
    
    // From reading around, this could also be done with matrices.
}

export function getResolvableCells(board: BoardInfoIgnoringErrors): ResolvableCells {
    let results: ResolvableCells;
    const revealedCells = getRevealedCellInfo(board);

    // For the simplest scenario, look at each revealed cell (with adjacent unrevealed cells) individually.
    // If any have the same number of outstanding bombs as they have unrevealed cells, those unrevealed cells can all resolve.
    results = resolveIndividualCellCounts(revealedCells, board);

    // If the simplest scenario gave us any resolutions, return those.
    if (results.size > 0) {
        return results;
    }

    // Next up, use the number of bombs remaining.
    // TODO: may be able to discard "single cell groups" (from the below relatedCellGroups) to reduce the number of remaining bombs here.
    results = resolveRemainingBombCount(board);

    if (results.size > 0) {
        return results;
    }

    const relatedCellGroups = groupRelatedCells(revealedCells);

    for (const relatedCellGroup of relatedCellGroups) {
        const groupResults = resolveRelatedCellGroup(relatedCellGroup, board.numBombs);
        
        if (groupResults) {
            groupResults.forEach((value, index) => results.set(index, value));
        }
    }

    return results;
}
