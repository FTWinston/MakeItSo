import { Random } from 'src/utils/random';
import { CellLinks, Direction, MazeState, north, east, south, west, CellType, UnderylingCellState } from '../types/Maze';
import { oppositeDirectionsMap, orthogonalDirectionsMap } from './directions';
import { updateVisibility } from './updateVisibility';

export type GenerationConfig = {
    seed?: string;
    width: number;
    height: number;
    visibilityType: 'los' | 'range' | 'range-allseen' | 'all';
    visibilityRange: number;
    shapeOutline?: (boolean | 1 | 0)[][];
    /** A number between 0 and 1, indicating the chance, on reaching a dead end while generating, of "punching through" a wall to an already-visited cell. */
    connectivity: number;
    /** How many "sub mazes" should be generated. Each sub-maze should only connect to the rest of the maze at e.g. a locked door. */
    numGroups: number;
}

type GeneratingCellGroup = {
    startCell: UnderylingCellState;
    targetNumCells: number;
    cells: UnderylingCellState[];
    nonGroupCellsByPriority: UnderylingCellState[];
    borderCellsByGroup: Map<number, UnderylingCellState[]>;
    goalCells: Set<UnderylingCellState>;
    midPathCells: Set<UnderylingCellState>;
}

export function generate(config: GenerationConfig): MazeState {
    const random = new Random(config.seed);

    // Create a set of unlinked cells, and assign them to groups.
    const cells: UnderylingCellState[][] = createEmptyState(config.width, config.height, config.shapeOutline);

    const cellGroups = assignGroups(cells, config.numGroups, random);

    // Generate an independent mini-maze in each group.
    for (const cellGroup of cellGroups) {
        iterateCells(cellGroup, random, config.connectivity);
    }

    const startCell = random.pick([...cellGroups[0].midPathCells]);
    startCell.content = 'entrance';

    // Link up each group to the rest of the maze, but only have one "door" between each group.
    connectGroups(cellGroups, random);

    const mazeState: MazeState = {
        cells: cells.map(col => col.map(cell => ({
            type: cell.type === CellType.Outside ? cell.type : CellType.Unseen,
            links: getInitialLinkVisibility(cell),
        }))),
        visibleCells: new Set(),
        visibilityType: config.visibilityType,
        visibilityRange: config.visibilityRange,
        underlyingCells: cells,
        entities: {
            1: {
                x: startCell.x,
                y: startCell.y,
                type: 'player'
            }
        },
        underlyingEntities: {
            1: {
                x: startCell.x,
                y: startCell.y,
                type: 'player'
            }
        },
    };

    updateVisibility(mazeState, startCell);

    return mazeState;
}

const unassignedGroup = -1;

function getInitialLinkVisibility(cell: UnderylingCellState): CellLinks {
    if (cell.type === CellType.Outside) {
        return cell.links.map(link => link.linked) as CellLinks;
    }

    // You can't typically see borders for an unseen cell, but you can for borders on the outer edge of the maze.
    const visibleLinks = [true, true, true, true] as CellLinks;

    for (let i = 0; i < 4; i++) {
        const link = cell.links[i];
        if (!link.adjacentCell || link.adjacentCell.type === CellType.Outside) {
            visibleLinks[i] = false;
        }
    }

    return visibleLinks;
}

function createEmptyState(width: number, height: number, shapeOutline?: (boolean | 1 | 0)[][]): UnderylingCellState[][] {
    // Create 2d array of cells.
    const cells: UnderylingCellState[][] = new Array(height)
        .fill(null)
        .map((_, y) => new Array(width)
            .fill(null)
            .map((_, x) => ({
                type: (shapeOutline && !shapeOutline[y][x]) ? CellType.Outside : CellType.Visible,
                links: [{ linked: false, adjacentCell: null }, { linked: false, adjacentCell: null }, { linked: false, adjacentCell: null }, { linked: false, adjacentCell: null }],
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
            if (fromCell === null) {
                continue;
            }

            if (fromY > 0) {
                const toCellNorth = cells[fromY - 1][fromX];
                fromCell.links[north].adjacentCell = toCellNorth;
                toCellNorth.links[south].adjacentCell = fromCell;

                if (fromCell.type === CellType.Outside && toCellNorth.type === CellType.Outside) {
                    fromCell.links[north].linked = true;
                    toCellNorth.links[south].linked = true;
                }
            }

            if (fromX > 0) {
                const toCellWest = row[fromX - 1];
                fromCell.links[west].adjacentCell = toCellWest;
                toCellWest.links[east].adjacentCell = fromCell;

                if (fromCell.type === CellType.Outside && toCellWest.type === CellType.Outside) {
                    fromCell.links[west].linked = true;
                    toCellWest.links[east].linked = true;
                }
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
    cells: UnderylingCellState[][],
    numGroups: number,
    random: Random
): GeneratingCellGroup[] {
    const allNonGroupStartCells = cells.flat()
        .filter(cell => cell.type !== CellType.Outside);

    if (numGroups <= 1) {
        // If there's not to be multiple groups, just put everything into one group.
        const startCell = random.delete(allNonGroupStartCells);
        const group: GeneratingCellGroup = {
            targetNumCells: allNonGroupStartCells.length,
            startCell,
            cells: [startCell, ...allNonGroupStartCells],
            nonGroupCellsByPriority: [],
            borderCellsByGroup: new Map(),
            goalCells: new Set(),
            midPathCells: new Set(),
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
                goalCells: new Set(),
                midPathCells: new Set(),
            };
        });

    const unallocatedCells = new Set(allNonGroupStartCells);

    function addCellToGroup(cell: UnderylingCellState, adjacentCell: UnderylingCellState) {
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
    cellGroup: GeneratingCellGroup,
    random: Random,
    punchThroughChance: number
) {
    const stepsToProcess = new Array<[UnderylingCellState, Direction]>();
    const junctionCells = new Set<UnderylingCellState>();
    const linearCells = new Set<UnderylingCellState>();

    const startCell = cellGroup.startCell;
    cellGroup.goalCells.add(startCell);
    let currentCell: UnderylingCellState | null = startCell;

    const visitedCells = new Set<UnderylingCellState>();

    while (currentCell) {
        visitedCells.add(currentCell);

        const directions = getRandomDirections(random);

        let nextCell: UnderylingCellState | null = null;

        for (const direction of directions) {
            if (nextCell == null) {
                nextCell = attemptToAddLink(currentCell, direction, visitedCells);
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

                const potentialNextCell: UnderylingCellState | null = currentCell.links[direction].adjacentCell;

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
                cellGroup.goalCells.add(currentCell);
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
            nextCell = attemptToAddLink(backtrackCell, direction, visitedCells);
            
            if (nextCell) {            
                // A cell we've backtracked from is a junction.
                junctionCells.add(backtrackCell);
                linearCells.delete(backtrackCell);
            }
        }

        currentCell = nextCell;
    }

    // Any linear cells (i.e. cells that are not dead ends or junctions) that are only linked to other linear cells count as isolated. They're good places for items.
    for (const linearCell of linearCells) {
        let isolated = true;
        for (const { linked, adjacentCell } of linearCell.links) {
            if (linked && adjacentCell && !linearCells.has(adjacentCell)) {
                isolated = false;
            }
        }
        if (isolated && !cellGroup.goalCells.has(linearCell)) {
            cellGroup.midPathCells.add(linearCell);
        }
    }

    // Display the important cells, for debugging.
    for (const cell of cellGroup.goalCells) {
        cell.content = 'goal';
    }
    for (const cell of cellGroup.midPathCells) {
        cell.content = 'item';
    }
}

function attemptToAddLink(currentCell: UnderylingCellState, direction: Direction, visitedCells: Set<UnderylingCellState>): UnderylingCellState | null {
    const testCell = currentCell.links[direction].adjacentCell;

    if (testCell && testCell.group === currentCell.group && !visitedCells.has(testCell)) {
        linkCells(currentCell, testCell, direction);

        return testCell;
    }

    return null;
}

function linkCells(from: UnderylingCellState, to: UnderylingCellState, direction: Direction) {
    from.links[direction].linked = true;
    to.links[oppositeDirectionsMap.get(direction)!].linked = true;
}

function isLinkedRoundCorner(fromCell: UnderylingCellState, direction: Direction, subsequentLeftOrRight: 0 | 1): boolean {    
    const firstLink = fromCell.links[direction];

    if (!firstLink.linked) {
        return false;
    }

    const orthogonalDirs = orthogonalDirectionsMap.get(direction)!;
    const orthogonalDir = orthogonalDirs[subsequentLeftOrRight];
    const nextCell = firstLink.adjacentCell;
    const secondLink = nextCell.links[orthogonalDir];

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
                
                // Neither cell is a dead end anymore.
                delete cellToLinkToTargetGroup.content;
                delete link.adjacentCell.content;
                break;
            }
            
            connectedGroups.add(groupToConnect);
            break;
        }
    }
}
