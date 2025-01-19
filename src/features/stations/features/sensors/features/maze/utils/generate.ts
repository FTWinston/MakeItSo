import { Random } from 'src/utils/random';
import { CellLinks, Direction, Maze, north, east, south, west } from '../types/Maze';
import { oppositeDirectionsMap, orthogonalDirectionsMap } from './directions';
import { dir } from 'i18next';

export type GenerationConfig = {
    seed?: string;
    width: number;
    height: number;
    /** A number between 0 and 1, indicating the chance, on reaching a dead end while generating, of "punching through" a wall to an already-visited cell. */
    connectivity: number;
    /** How many "sub mazes" should be generated. Each sub-maze should only connect to the rest of the maze at e.g. a locked door. */
    numGroups: number;
}

type GeneratingLink = {
    linked: true;
    adjacentCell: GeneratingCellState;
} | {
    linked: false;
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

type GeneratingCellGroup = {
    startCell: GeneratingCellState;
    targetNumCells: number;
    cells: GeneratingCellState[];
    nonGroupCellsByPriority: GeneratingCellState[];
    borderCellsByGroup: Map<number, GeneratingCellState[]>;
}

export function generate(config: GenerationConfig): Maze {
    const random = new Random(config.seed);

    // Create a set of unlinked cells, and assign them to groups.
    const cells: GeneratingCellState[][] = createEmptyState(config.width, config.height);

    const cellGroups = assignGroups(cells, config.numGroups, random);

    // Generate an independent mini-maze in each group.
    for (const cellGroup of cellGroups) {
        iterateCells(cellGroup.startCell, random, config.connectivity);
    }

    // Link up each group to the rest of the maze, but only have one "door" between each group.
    connectGroups(cellGroups, random);

    return {
        cells: cells.map(col => col.map(cell => ({
            content: cell.content,
            group: cell.group,
            links: cell.links.map(link => link.linked) as CellLinks,
        }))),
        entities: {
            1: { x: 0, y: 0, type: 'player' }
        },
    };
}

const unassignedGroup = -1;

function createEmptyState(width: number, height: number): GeneratingCellState[][] {
    // Create 2d array of cells.
    const cells: GeneratingCellState[][] = new Array(height)
        .fill(null)
        .map((_, y) => new Array(width)
            .fill(null)
            .map((_, x) => ({
                links: [{ linked: false, adjacentCell: null }, { linked: false, adjacentCell: null }, { linked: false, adjacentCell: null }, { linked: false, adjacentCell: null }],
                visited: false,
                group: unassignedGroup,
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

function distanceSquared(from: { x: number, y: number }, to: { x: number, y: number }) {
    return (from.x - to.x) ** 2 + (from.y - to.y) ** 2;
}

function getRandomDirections(random: Random) {
    const directions = [north, east, south, west];
    random.shuffle(directions);
    return directions;
}

function assignGroups(
    cells: GeneratingCellState[][],
    numGroups: number,
    random: Random
): GeneratingCellGroup[] {
    const allNonGroupStartCells = cells.flat();

    if (numGroups <= 1) {
        // If there's not to be multiple groups, just put everything into one group.
        const startCell = random.delete(allNonGroupStartCells);
        const group = {
            targetNumCells: allNonGroupStartCells.length,
            startCell,
            cells: [startCell, ...allNonGroupStartCells],
            nonGroupCellsByPriority: [],
            borderCellsByGroup: new Map(),
        }
        group.cells = [startCell, ...allNonGroupStartCells];
        for (const cell of group.cells) {
            cell.group = 0;
        }
        return [group];
    }

    const groups: GeneratingCellGroup[] = new Array(numGroups).fill(null)
        .map((_, groupNum) => {
            // Pick a random cell to be the start of each group, and assign it into the group.
            const startCell = random.delete(allNonGroupStartCells);
            startCell.group = groupNum;

            // Give each group a target size.
            const targetNumCells = allNonGroupStartCells.length / numGroups;
            
            // Order all non-group cells by proximity to the start cell.
            const nonGroupCellsByPriority = [...allNonGroupStartCells]
                .sort((a, b) => distanceSquared(startCell, a) - distanceSquared(startCell, b))

            return {
                targetNumCells,
                startCell,
                cells: [startCell],
                nonGroupCellsByPriority,
                borderCellsByGroup: new Map(),
            };
        });

    const unallocatedCells = new Set(allNonGroupStartCells);

    function addCellToGroup(cell: GeneratingCellState, adjacentCell: GeneratingCellState) {
        cell.group = adjacentCell.group;
        groups[adjacentCell.group].cells.push(cell);
        unallocatedCells.delete(cell);
    }
    
    const incompleteGroups = [...groups];

    // Repeatedly assign the closest non-group cell to the group with the most remaining unfilled size.
    while (true) {
        let anyGroupHasGrown = false;
        // TODO: at each step, order the groups by "remaining unfilled size".
        // Otherwise, this only really achieves equal distribution of cells between groups, but as their target sizes are also equal right now, that doesn't matter much.    
        for (const group of incompleteGroups) {
            for (let iTestCell = 0; iTestCell < group.nonGroupCellsByPriority.length; iTestCell++) {
                const testCell = group.nonGroupCellsByPriority[iTestCell];

                // Don't assign a cell to a group if it's not adjacent to a cell that's already in that group.
                if (!testCell.links.some(link => link.adjacentCell?.group === group.startCell.group)) {
                    continue;
                }

                group.nonGroupCellsByPriority.splice(iTestCell, 1);

                // Don't assign a cell to a group if it's already in another group.
                if (testCell.group !== unassignedGroup) {
                    continue;
                }

                addCellToGroup(testCell, group.startCell)
                anyGroupHasGrown = true;

                // Remove groups from the list of incomplete groups once they've reached their target size.
                if (group.cells.length >= group.targetNumCells) {
                    incompleteGroups.splice(incompleteGroups.indexOf(group), 1);
                }

                break;
            }   
        }

        if (!anyGroupHasGrown) {
            break;
        }
    }

    // Any unallocated cells should be assigned to the group of a random adjacent (allocated) cell, 
    // repeating until all cells are allocated.
    while (unallocatedCells.size > 0) {
        for (const cell of unallocatedCells) {
            for (const direction of getRandomDirections(random)) {
                const adjacentCell = cell.links[direction].adjacentCell;
                if (adjacentCell && adjacentCell.group !== unassignedGroup) {
                    addCellToGroup(cell, adjacentCell);
                    break;
                }
            }
        }
    }

    // Once all group cells are assigned, each group's "border" cells, so we know what groups touch.
    for (const group of groups) {
        for (const groupCell of group.cells) {
            for (const { adjacentCell } of groupCell.links) {
                if (adjacentCell && adjacentCell.group !== group.startCell.group) {
                    const groupNum = adjacentCell.group;
                    let groupBorderCells = group.borderCellsByGroup.get(groupNum);
                    if (!groupBorderCells) {
                        groupBorderCells = [];
                        group.borderCellsByGroup.set(groupNum, groupBorderCells);
                    }
                    groupBorderCells.push(groupCell);
                    break;
                }
            }
        }
    }

    return groups;
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

        const directions = getRandomDirections(random);

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

                // The current cell and the cell we're potentially punching through to must be in the same group.
                if (potentialNextCell && potentialNextCell.group === currentCell.group) {
                    // If both cells are linked in the same orthogonal direction, to cells that also link to each other,
                    // then we don't link to it so as to avoid creating an "open area" in the maze.
                    const [orthogonalDirLeft, orthogonalDirRight] = orthogonalDirectionsMap.get(direction)!;
                    
                    if (isLinkedRoundCorner(currentCell, orthogonalDirLeft, 1)
                        || isLinkedRoundCorner(currentCell, orthogonalDirRight, 0)) {
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
    if (junctionCells.size > 0) {
        random.pick([...junctionCells]).content = 'start';
    }

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

function isLinkedRoundCorner(fromCell: GeneratingCellState, direction: Direction, subsequentLeftOrRight: 0 | 1): boolean {
    
    const firstLink = fromCell.links[direction];

    if (!firstLink.linked) {
        return false;
    }

    const nextCell = firstLink.adjacentCell;

    const orthogonalDirs = orthogonalDirectionsMap.get(direction)!;

    const secondLink = nextCell.links[orthogonalDirs[subsequentLeftOrRight]];

    return secondLink.linked;
}

function connectGroups(unconnectedGroups: GeneratingCellGroup[], random: Random) {
    const connectedGroups = new Set<GeneratingCellGroup>();
    connectedGroups.add(random.delete(unconnectedGroups));

    while (unconnectedGroups.length > 0) {
        const groupToConnect = random.delete(unconnectedGroups);
        
        for (const targetGroup of connectedGroups) {
            const cellsBorderingTargetGroup = groupToConnect.borderCellsByGroup.get(targetGroup.startCell.group);
            if (!cellsBorderingTargetGroup) {
                continue;
            }

            const cellToLinkToTargetGroup = random.pick(cellsBorderingTargetGroup);

            for (const direction of getRandomDirections(random)) {
                const link = cellToLinkToTargetGroup.links[direction];
                if (link.linked || !link.adjacentCell || link.adjacentCell.group !== targetGroup.startCell.group) {
                    continue;
                }

                linkCells(cellToLinkToTargetGroup, link.adjacentCell, direction);
                break;
            }
            
            connectedGroups.add(groupToConnect);
            break;
        }
    }
}
