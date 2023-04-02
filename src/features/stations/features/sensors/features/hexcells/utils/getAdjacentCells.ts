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

export function getAdjacentCells(index: number, columns: number, rows: number): number[] {
    const { row, col } = coordinateFromIndex(index, columns);

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

    return adjacentCoords
        .map(coord => indexFromCoordinate(coord, columns));
}
