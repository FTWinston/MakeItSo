import { Random } from 'src/utils/random';
import { CellLinks, Direction, MazeState, north, east, south, west, CellType, UnderlyingCellState, playerEntityID, CellId, CellState } from '../types/Maze';
import { oppositeDirectionsMap, orthogonalDirectionsMap } from './directions';
import { updateVisibility } from './updateVisibility';
import { getCellById } from './getCell';
import { ShipSystem } from 'src/types/ShipSystem';

type CommonGenerationConfig = {
    seed?: string;
    width: number;
    height: number;
}

export type ShipOverviewGenerationConfig = CommonGenerationConfig & {
    shapeOutline: (boolean | 1 | 0)[][];
    /** A number between 0 and 1, indicating the chance, on reaching a dead end while generating, of "punching through" a wall to an already-visited cell. */
    connectivity: number;
    numFakeGoals: number;
}

export type SystemGenerationConfig = CommonGenerationConfig & {
    /** A number between 0 and 1, indicating the chance, on reaching a dead end while generating, of "punching through" a wall to an already-visited cell. */
    connectivity: number;
    /** How many "sub mazes" should be generated. Each sub-maze should only connect to the rest of the maze at e.g. a locked door. */
    numGroups: number;
}

type GeneratingCellGroup = {
    startCell: UnderlyingCellState;
    targetNumCells: number;
    cells: UnderlyingCellState[];
    nonGroupCellsByPriority: UnderlyingCellState[];
    borderCellsByGroup: Map<number, UnderlyingCellState[]>;
    goalCells: Set<UnderlyingCellState>;
    midPathCells: Set<UnderlyingCellState>;
}

export function generateShipOverview(config: ShipOverviewGenerationConfig): MazeState {
    const random = new Random(config.seed);

    // Create a set of unlinked cells, and assign them to groups.
    const cells: UnderlyingCellState[][] = createEmptyState(config.width, config.height, config.shapeOutline);

    const allCells = cells.flat();

    const cellsById = new Map(allCells.map(cell => [cell.id, cell]));

    const internalCells = allCells
        .filter(cell => cell.type !== CellType.Outside);

    const cellGroups = assignGroups(cellsById, internalCells, 1, random);

    // Generate an independent mini-maze in each group.
    for (const cellGroup of cellGroups) {
        iterateCells(cellsById, cellGroup, random, config.connectivity);
    }

    const startCell = random.pick([...cellGroups[0].midPathCells]);
    startCell.content = 'entrance';

    assignExits(cellGroups, config.numFakeGoals, random);

    random.shuffle(internalCells);

    return {
        cells: getCellsForDisplay(cells),
        underlyingCells: cells.map(row => row.map(cell => cell.id)),
        cellsById,
        visibleCells: new Set(),
        visibilityRange: 0,
        cellDamageOrder: internalCells.map(cell => cell.id),
        damagedCells: new Set(),
        ignoreDamageCells: new Set(),
        entities: {
            [playerEntityID]: {
                x: startCell.x,
                y: startCell.y,
                type: 'player'
            }
        },
        underlyingEntities: {
            [playerEntityID]: {
                x: startCell.x,
                y: startCell.y,
                type: 'player'
            }
        },
        moveQueue: [],
    };
}

export function generateSystem(config: SystemGenerationConfig): MazeState {
    const random = new Random(config.seed);

    // Create a set of unlinked cells, and assign them to groups.
    const cells: UnderlyingCellState[][] = createEmptyState(config.width, config.height);

    const allCells = cells.flat();

    const cellsById = new Map(allCells.map(cell => [cell.id, cell]));

    const internalCells = allCells
        .filter(cell => cell.type !== CellType.Outside);

    const cellGroups = assignGroups(cellsById, internalCells, config.numGroups, random);

    // Generate an independent mini-maze in each group.
    for (const cellGroup of cellGroups) {
        iterateCells(cellsById, cellGroup, random, config.connectivity);
    }

    const startCell = random.pick([...cellGroups[0].midPathCells]);
    startCell.content = 'entrance';

    // Link up each group to the rest of the maze, but only have one "door" between each group.
    connectGroups(cellsById, cellGroups, random);

    random.shuffle(internalCells);

    return {
        cells: getCellsForDisplay(cells),
        underlyingCells: cells.map(row => row.map(cell => cell.id)),
        cellsById,
        visibleCells: new Set(),
        visibilityRange: 0,
        cellDamageOrder: internalCells.map(cell => cell.id),
        damagedCells: new Set(),
        ignoreDamageCells: new Set(),
        entities: {
            [playerEntityID]: {
                x: startCell.x,
                y: startCell.y,
                type: 'player'
            }
        },
        underlyingEntities: {
            [playerEntityID]: {
                x: startCell.x,
                y: startCell.y,
                type: 'player'
            }
        },
        moveQueue: [],
    };
}

const unassignedGroup = -1;

function getCellsForDisplay(cells: UnderlyingCellState[][]) {
    return cells.map(col => col.map(cell => {
        const result: CellState = {
            type: cell.type,
            links: cell.links.map(link => link.linked) as CellLinks,
        };

        // Exit cells should show hints (exit content but no associated system) from the outset when obscured.
        // As should exit hints (i.e. with no associated system), but they only ever show on obscured cells.
        if (cell.content === 'exit') {
            result.content = 'exit';
            if (cell.system === undefined) {
                delete cell.content;
            }
        }

        return result;
    }));
}

function assignExits(cellGroups: GeneratingCellGroup[], numFakeGoals: number, random: Random) {
    const allGoalCells: UnderlyingCellState[] = [];

    for (const cellGroup of cellGroups) {
        allGoalCells.push(...cellGroup.goalCells);
    }

    const goalSystems: ShipSystem[] = [
        ShipSystem.Engines,
        ShipSystem.Weapons,
        ShipSystem.Reactor,
        ShipSystem.Sensors,
        //ShipSystem.Shields,
    ]

    // Ensure there are enough goal cells. If not, take some additional cells.
    const numGoalsIncludingFakes = numFakeGoals + goalSystems.length;
    while (allGoalCells.length < numGoalsIncludingFakes) {
        allGoalCells.push(random.delete([...random.delete(cellGroups).midPathCells]));
    }

    random.shuffle(allGoalCells);

    // An exit cell for each ship system.
    for (const goalSystem of goalSystems) {
        const goalCell = allGoalCells.pop()!;
        goalCell.content = 'exit';
        goalCell.system = goalSystem;
    }

    // Some extra cells should look like hints while obscured, to make the real goals less obvious.
    for (let i = 0; i < numFakeGoals; i++) {
        const goalCell = allGoalCells.pop()!
        goalCell.content = 'exit';
    }

    // Any unused extra goal cells have no content.
    for (const emptyGoal of allGoalCells) {
        delete emptyGoal.content;
    }
}

function createEmptyState(width: number, height: number, shapeOutline?: (boolean | 1 | 0)[][]): UnderlyingCellState[][] {
    let nextId = 1;

    // Create 2d array of cells.
    const cells: UnderlyingCellState[][] = new Array(height)
        .fill(null)
        .map((_, y) => new Array(width)
            .fill(null)
            .map((_, x) => ({
                id: nextId++,
                type: (shapeOutline && !shapeOutline[y][x]) ? CellType.Outside : CellType.Normal,
                links: [{ linked: false, adjacentCellId: null }, { linked: false, adjacentCellId: null }, { linked: false, adjacentCellId: null }, { linked: false, adjacentCellId: null }],
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
                fromCell.links[north].adjacentCellId = toCellNorth.id;
                toCellNorth.links[south].adjacentCellId = fromCell.id;

                if (fromCell.type === CellType.Outside && toCellNorth.type === CellType.Outside) {
                    fromCell.links[north].linked = true;
                    toCellNorth.links[south].linked = true;
                }
            }

            if (fromX > 0) {
                const toCellWest = row[fromX - 1];
                fromCell.links[west].adjacentCellId = toCellWest.id;
                toCellWest.links[east].adjacentCellId = fromCell.id;

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
    cellsById: Map<CellId, UnderlyingCellState>,
    internalCells: UnderlyingCellState[],
    numGroups: number,
    random: Random
): GeneratingCellGroup[] {
    const allNonGroupStartCells = [...internalCells];

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

    function addCellToGroup(cell: UnderlyingCellState, adjacentCell: UnderlyingCellState) {
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
                if (!testCell.links.some(link => link.adjacentCellId !== null
                        && cellsById.get(link.adjacentCellId) ?.group === group.startCell.group)) {
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
                const adjacentCellId = cell.links[direction].adjacentCellId;
                if (adjacentCellId === null) {
                    continue;
                }
                const adjacentCell = getCellById(cellsById, adjacentCellId);
                if (adjacentCell.group !== unassignedGroup) {
                    addCellToGroup(cell, adjacentCell);
                    break;
                }
            }
        }
    }

    // Once all group cells are assigned, each group's "border" cells, so we know what groups touch.
    for (const group of groups) {
        for (const groupCell of group.cells) {
            for (const { adjacentCellId } of groupCell.links) {
                if (adjacentCellId === null) {
                    continue;
                }
                const adjacentCell = getCellById(cellsById, adjacentCellId);
                if (adjacentCell.group !== group.startCell.group) {
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
    cellsById: Map<CellId, UnderlyingCellState>,
    cellGroup: GeneratingCellGroup,
    random: Random,
    punchThroughChance: number
) {
    const stepsToProcess = new Array<[UnderlyingCellState, Direction]>();
    const junctionCells = new Set<UnderlyingCellState>();
    const linearCells = new Set<UnderlyingCellState>();

    const startCell = cellGroup.startCell;
    cellGroup.goalCells.add(startCell);
    let currentCell: UnderlyingCellState | null = startCell;

    const visitedCells = new Set<UnderlyingCellState>();

    while (currentCell) {
        visitedCells.add(currentCell);

        const directions = getRandomDirections(random);

        let nextCell: UnderlyingCellState | null = null;

        for (const direction of directions) {
            if (nextCell == null) {
                nextCell = attemptToAddLink(cellsById, currentCell, direction, visitedCells);
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

                const potentialNextCellId: CellId | null = currentCell.links[direction].adjacentCellId;
                if (potentialNextCellId === null) {
                    continue;
                }

                const potentialNextCell = getCellById(cellsById, potentialNextCellId);

                // The current cell and the cell we're potentially punching through to must be in the same group.
                if (potentialNextCell.group === currentCell.group) {
                    // If both cells are linked in the same orthogonal direction, to cells that also link to each other,
                    // then we don't link to it so as to avoid creating an "open area" in the maze.
                    const [orthogonalDirLeft, orthogonalDirRight] = orthogonalDirectionsMap.get(direction)!;
                    
                    if (isLinkedRoundCorner(cellsById, currentCell, orthogonalDirLeft, 1)
                        || isLinkedRoundCorner(cellsById, currentCell, orthogonalDirRight, 0)) {
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
            nextCell = attemptToAddLink(cellsById, backtrackCell, direction, visitedCells);
            
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
        for (const { linked, adjacentCellId } of linearCell.links) {
            if (!linked || adjacentCellId === null) {
                continue;
            }
            const adjacentCell = getCellById(cellsById, adjacentCellId);
            if (!linearCells.has(adjacentCell)) {
                isolated = false;
            }
        }
        if (isolated && !cellGroup.goalCells.has(linearCell)) {
            cellGroup.midPathCells.add(linearCell);
        }
    }

    // Display the important cells, for debugging.
    for (const cell of cellGroup.midPathCells) {
        cell.content = 'item';
    }
}

function attemptToAddLink(
    cellsById: Map<CellId, UnderlyingCellState>,
    currentCell: UnderlyingCellState,
    direction: Direction,
    visitedCells: Set<UnderlyingCellState>
): UnderlyingCellState | null {
    const testCellId = currentCell.links[direction].adjacentCellId;
    if (testCellId === null) {
        return null;
    }

    const testCell = getCellById(cellsById, testCellId);

    if (testCell.group === currentCell.group && !visitedCells.has(testCell)) {
        linkCells(currentCell, testCell, direction);

        return testCell;
    }

    return null;
}

function linkCells(from: UnderlyingCellState, to: UnderlyingCellState, direction: Direction) {
    from.links[direction].linked = true;
    to.links[oppositeDirectionsMap.get(direction)!].linked = true;
}

function isLinkedRoundCorner(
    cellsById: Map<CellId, UnderlyingCellState>,
    fromCell: UnderlyingCellState,
    direction: Direction,
    subsequentLeftOrRight: 0 | 1
): boolean {    
    const firstLink = fromCell.links[direction];

    if (!firstLink.linked) {
        return false;
    }

    const orthogonalDirs = orthogonalDirectionsMap.get(direction)!;
    const orthogonalDir = orthogonalDirs[subsequentLeftOrRight];
    const nextCellId = firstLink.adjacentCellId;
    const nextCell = getCellById(cellsById, nextCellId);
    const secondLink = nextCell.links[orthogonalDir];

    return secondLink.linked;
}

function connectGroups(cellsById: Map<CellId, UnderlyingCellState>, unconnectedGroups: GeneratingCellGroup[], random: Random) {
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
                if (link.linked || link.adjacentCellId === null) {
                    continue;
                }

                const adjacentCell = getCellById(cellsById, link.adjacentCellId);

                if (adjacentCell.group !== targetGroup.startCell.group) {
                    continue;
                }

                linkCells(cellToLinkToTargetGroup, adjacentCell, direction);
                
                // Neither cell is a dead end anymore.
                delete cellToLinkToTargetGroup.content;
                delete adjacentCell.content;
                break;
            }
            
            connectedGroups.add(groupToConnect);
            break;
        }
    }
}
