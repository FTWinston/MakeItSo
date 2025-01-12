import { Random } from 'src/utils/random';
import { CellLinks, Direction, Maze, north, east, south, west } from '../types/Maze';

export type GenerationConfig = {
    width: number;
    height: number;
    /** A number between 0 and 1, indicating the chance, on reaching a dead end while generating, of "punching through" a wall to an already-visited cell. */
    connectivity: number;
    /** How many "sub mazes" should be generated. Each sub-maze should only connect to the rest of the maze at e.g. a locked door. */
    numGroups: number;
}

type GeneratingLink = {
    linked: boolean;
    adjacentCell: GeneratingCellState | null;
}

type GeneratingCellState = {
    links: [GeneratingLink, GeneratingLink, GeneratingLink, GeneratingLink];
    content?: 'start' | 'item' | 'goal';
    visited: boolean;
    group: number;
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

export function generate(config: GenerationConfig, random: Random): Maze {
    // Create a set of unlinked cells, and assign them to groups.
    const cells: GeneratingCellState[][] = createEmptyState(config.width, config.height);

    const cellGroups = assignGroups(cells, config.numGroups);

    // Generate an independent mini-maze in each group.
    for (const cellGroup of cellGroups) {
        const startCell = random.pick(cellGroup);

        iterateCells(startCell, random, config.connectivity);
    }

    // TODO: link up each group to the rest of the maze, but only have one "door" between each group.

    return {
        cells: cells.map(col => col.map(cell => ({
            content: cell.content,
            group: cell.group,
            links: cell.links.map(link => link.linked) as CellLinks,
        }))),
    };
}

function createEmptyState(width: number, height: number): GeneratingCellState[][] {
    // Create 2d array of cells.
    const cells: GeneratingCellState[][] = new Array(height)
        .fill(null)
        .map((_, y) => new Array(width)
            .fill(null)
            .map((_, x) => ({
                links: [{ linked: false, adjacentCell: null }, { linked: false, adjacentCell: null }, { linked: false, adjacentCell: null }, { linked: false, adjacentCell: null }],
                visited: false,
                group: 1,
                x,
                y,
            }))
        );

    // Add links to each cell's adjacent cells.
    for (let fromY = 0; fromY < height; fromY++) {
        const row = cells[fromY];
        for (let fromX = 0; fromX < width; fromX++) {
            const fromCell = row[fromX];

            if (fromY > 0) {
                const toCellNorth = cells[fromY - 1][fromX];
                fromCell.links[north].adjacentCell = toCellNorth;
                toCellNorth.links[south].adjacentCell = fromCell;
            }

            if (fromX > 0) {
                const toCellWest = row[fromX - 1];
                fromCell.links[west].adjacentCell = toCellWest;
                toCellWest.links[east].adjacentCell = fromCell;
            }
        }
    }

    return cells;
}

function assignGroups(cells: GeneratingCellState[][], numGroups: number): GeneratingCellState[][] {
    const cellsByGroup: GeneratingCellState[][] = new Array<GeneratingCellState[]>(numGroups)
        .fill(null!)
        .map(() => []);

    // Split cells into a given number of groups.
    // For now, just split them into horizontal bands.
    // TODO: do this in a more interesting way.
    for (let cellY = 0; cellY < cells.length; cellY++) {
        const row = cells[cellY];
        let group = Math.round(cellY * (numGroups - 1) / cells.length);

        for (let cellX = 0; cellX < row.length; cellX++) {
            const cell = row[cellX];
            cell.group = group;

            cellsByGroup[group].push(cell);
        }
    }

    return cellsByGroup;
}

function iterateCells(
    startCell: GeneratingCellState,
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
                nextCell = attemptToAddLink(currentCell, direction);
            }
            else {
                // TODO: only push steps to the backlog if they point at an unvisited cell?
                stepsToProcess.push([currentCell, direction]);
            }
        }

        // At the end of a branch, consider punching through a wall to an already-visited cell.
        if (nextCell === null && random.getFloat() < punchThroughChance) {
            for (const direction of directions) {
                if (currentCell.links[direction].linked) {
                    continue;
                }

                const potentialNextCell: GeneratingCellState | null = currentCell.links[direction].adjacentCell;

                if (potentialNextCell && potentialNextCell.group === currentCell.group) {
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
            nextCell = attemptToAddLink(backtrackCell, direction);
            
            if (nextCell) {            
                junctionCells.add(backtrackCell); // A cell we've backtracked from is a junction.
                linearCells.delete(backtrackCell);
            }
        }

        currentCell = nextCell;
    }

    // Pick a random junction to be the start cell.
    random.pick([...junctionCells]).content = 'start';

    // Any linear cells (i.e. cells that are not dead ends or junctions) that are only linked to other linear cells count as isolated. They're good places for items.
    for (const linearCell of linearCells) {
        let isolated = true;
        for (const { linked, adjacentCell } of linearCell.links) {
            if (linked && adjacentCell && !linearCells.has(adjacentCell)) {
                isolated = false;
            }
        }
        if (isolated) {
            linearCell.content = 'item';
        }
    }
}

function attemptToAddLink(currentCell: GeneratingCellState, direction: Direction): GeneratingCellState | null {
    const testCell = currentCell.links[direction].adjacentCell;

    if (testCell && testCell.group === currentCell.group && !testCell.visited) {
        linkCells(currentCell, testCell, direction);

        return testCell;
    }

    return null;
}

function linkCells(from: GeneratingCellState, to: GeneratingCellState, direction: Direction) {
    from.links[direction].linked = true;
    to.links[oppositeDirectionsMap.get(direction)!].linked = true;
}
