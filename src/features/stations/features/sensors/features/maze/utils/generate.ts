import { Random } from 'src/utils/random';
import { CellLinks, Direction, Maze, north, east, south, west } from '../types/Maze';

export type GenerationConfig = {
    width: number;
    height: number;
    /** A number between 0 and 1, indicating the chance, on reaching a dead end while generating, of "punching through" a wall to an already-visited cell. */
    connectivity: number;
}

type GeneratingCellState = {
    links: [GeneratingCellState | null, GeneratingCellState | null, GeneratingCellState | null, GeneratingCellState | null];
    content?: 'start' | 'item' | 'goal';
    visited: boolean;
    x: number;
    y: number;
}

const oppositeDirectionsMap = new Map<Direction, Direction>(
    [
        [north, south],
        [south, north],
        [east, west],
        [west, east],
    ]
);

const orthogonalDirectionsMap = new Map<Direction, [Direction, Direction]>(
    [
        [north, [east, west]],
        [south, [east, west]],
        [east, [north, south]],
        [west, [north, south]],
    ]
);

const cardinalOffsets = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
]

export function generate(config: GenerationConfig, random: Random): Maze {
    const cells: GeneratingCellState[][] = createEmptyState(config.width, config.height);

    const startCell = getRandomCell(cells, random);

    iterateCells(startCell, cells, random, config.connectivity);

    return {
        cells: cells.map(col => col.map(cell => ({
            content: cell.content,
            links: cell.links.map(link => !!link) as CellLinks,
        }))),
    };
}

function createEmptyState(width: number, height: number): GeneratingCellState[][] {
    return new Array(height)
        .fill(null)
        .map((_, y) => new Array(width)
            .fill(null)
            .map((_, x) => ({
                links: [null, null, null, null],
                visited: false,
                x,
                y,
            }))
        );
}

function getRandomCell(cells: GeneratingCellState[][], random: Random) {
    const row = cells[random.getInt(cells.length)];
    const cell = row[random.getInt(row.length)];

    return cell;
}

function iterateCells(
    startCell: GeneratingCellState,
    cells: GeneratingCellState[][],
    random: Random,
    punchThroughChance: number
) {
    const stepsToProcess = new Array<[GeneratingCellState, Direction]>();

    startCell.content = 'goal';

    const junctionCells = new Set<GeneratingCellState>();
    const linearCells = new Set<GeneratingCellState>();

    let currentCell: GeneratingCellState | null = startCell;

    while (currentCell) {
        currentCell.visited = true;

        const directions = [north, east, south, west];
        random.shuffle(directions);

        let nextCell: GeneratingCellState | null = null;

        for (const direction of directions) {
            if (nextCell == null) {
                nextCell = attemptToAddLink(currentCell, direction, cells);
            }
            else {
                // TODO: only push steps to the backlog if they point at an unvisited cell?
                stepsToProcess.push([currentCell, direction]);
            }
        }

        // At the end of a branch, consider punching through a wall to an already-visited cell.
        if (nextCell === null && random.getFloat() < punchThroughChance) {
            for (const direction of directions) {
                if (currentCell.links[direction]) {
                    continue;
                }

                const potentialNextCell = getAdjacentCell(currentCell, direction, cells);

                if (potentialNextCell) {
                    // If the current cell and the cell we're potentially punching through to are both linked in the same orthogonal direction,
                    // then we don't link to it so as to avoid creating an "open area" in the maze.
                    const [orthogonalDir1, orthogonalDir2] = orthogonalDirectionsMap.get(direction)!;
                    if ((currentCell.links[orthogonalDir1] && potentialNextCell.links[orthogonalDir1])
                        || (currentCell.links[orthogonalDir2] && potentialNextCell.links[orthogonalDir2])) {
                        continue;
                    }

                    nextCell = potentialNextCell;
                    linkCells(currentCell, nextCell, direction);
                    junctionCells.add(nextCell); // A cell we've punched through to is a junction.
                    linearCells.delete(nextCell);
                    break;
                }
            }
        }

        if (!junctionCells.has(currentCell)) {
            if (nextCell === null) {
                // The end of a cul-de-sac is a good place for a goal.
                currentCell.content = 'goal';
            }
            else {
                linearCells.add(currentCell);
            }
        }

        // Backtrack up stepsToProcess until we find one that works, then continue from there.
        while (nextCell == null) {
            let stepToTest = stepsToProcess.pop();

            if (stepToTest === undefined) {
                break;
            }

            const [backtrackCell, direction] = stepToTest;
            nextCell = attemptToAddLink(backtrackCell, direction, cells);
            
            if (nextCell) {            
                junctionCells.add(backtrackCell); // A cell we've backtracked from is a junction.
                linearCells.delete(backtrackCell);
            }
        }

        currentCell = nextCell;
    }

    // Pick a random junction to be the start cell.
    random.pick([...junctionCells]).content = 'start';

    // Any linear cels (i.e. cells that are not dead ends or junctions) that are adjacent to other linear cells count as isolated. They're good places for items.
    for (const linearCell of linearCells) {
        let isolated = true;
        for (const linkedCell of linearCell.links) {
            if (linkedCell && !linearCells.has(linkedCell)) {
                isolated = false;
            }
        }
        if (isolated) {
            linearCell.content = 'item';
        }
    }
}

function attemptToAddLink(currentCell: GeneratingCellState, direction: Direction, cells: GeneratingCellState[][]): GeneratingCellState | null {
    const testCell = getAdjacentCell(currentCell, direction, cells);

    if (testCell && !testCell.visited) {
        linkCells(currentCell, testCell, direction);

        return testCell;
    }

    return null;
}

function getAdjacentCell(fromCell: GeneratingCellState, direction: Direction, cells: GeneratingCellState[][]): GeneratingCellState | undefined {
    const offset = cardinalOffsets[direction];

    return cells[fromCell.y + offset.y]?.[fromCell.x + offset.x];
}

function linkCells(from: GeneratingCellState, to: GeneratingCellState, direction: Direction) {
    from.links[direction] = to;
    to.links[oppositeDirectionsMap.get(direction)!] = from;
}
