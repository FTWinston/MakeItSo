interface Coordinate {
    row: number;
    col: number;
}

function coordinateFromIndex(index: number, columns: number): Coordinate {
    const col = index % columns;
    const row = Math.floor(index / columns);

    return { row, col };
}

function indexFromCoordinate(coordinate: Coordinate, columns: number): number {
    return coordinate.row * columns + coordinate.col;
}

function getAdjacentCoordinates(col: number, row: number, columns: number, rows: number): Coordinate[] {
    const adjacentCoords: Coordinate[] = [];

    if (row > 0) {
        adjacentCoords.push({ row: row - 1, col });
    }
    if (row < rows - 1) {
        adjacentCoords.push({ row: row + 1, col });
    }

    if (col % 2 === 0) {
        // Even columns are shifted down.
        if (col > 0) {
            adjacentCoords.push({ row, col: col - 1 });
            if (row < rows - 1) {
                adjacentCoords.push({ row: row + 1, col: col - 1 })
            }
        }
        if (col < columns - 1) {
            adjacentCoords.push({ row, col: col + 1 });
            if (row < rows - 1) {
                adjacentCoords.push({ row: row + 1, col: col + 1 })
            }
        }
    }
    else {
        // Odd columns are shifted up.
        if (col > 0) {
            adjacentCoords.push({ row, col: col - 1 })
            
            if (row > 0) {
                adjacentCoords.push({ row: row - 1, col: col - 1 });
            }
        }
        if (col < columns - 1) {
            adjacentCoords.push({ row, col: col + 1 })
            if (row > 0) {
                adjacentCoords.push({ row: row - 1, col: col + 1 });
            }
        }
    }

    return adjacentCoords;
}

export function getAdjacentCells(index: number, columns: number, rows: number): number[] {
    const { row, col } = coordinateFromIndex(index, columns);

    return getAdjacentCoordinates(col, row, columns, rows)
        .map(coord => indexFromCoordinate(coord, columns));
}

export function getCellsInRadius(index: number, columns: number, rows: number): number[] {
    // TODO: this could be done a lot more efficiently.
    const { row, col } = coordinateFromIndex(index, columns);

    const results = new Set<number>();
    for (const { row: adjRow, col: adjCol } of getAdjacentCoordinates(col, row, columns, rows)) {
        const adjacentAdjacent = getAdjacentCoordinates(adjCol, adjRow, columns, rows);

        for (const coord of adjacentAdjacent) {
            results.add(indexFromCoordinate(coord, columns));
        }
    }

    results.delete(index);
    return [...results];
}
