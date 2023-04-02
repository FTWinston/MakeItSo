import { useEffect, useState } from 'react';
import { getAdjacentCells } from '../utils/getAdjacentCells';

/** Return a set of cell indexes that, once cascading is true, expands at a regular interval, adding all adjacent cells each time. */
export function useCellCascade(bombIndex: number, columns: number, rows: number): Set<number> {
    const [cascadeCells, setCascadeCells] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (bombIndex < 0) {
            return;
        }
        
        setCascadeCells(cells => new Set([...cells, bombIndex]));

        const interval = setInterval(() => {            
            setCascadeCells(cells => {
                // Add any cells that were expanded into to the list of bombed cells.
                const expandedCells = new Set([
                    ...[...cells]
                        .flatMap(cellIndex => getAdjacentCells(cellIndex, columns, rows)),
                    ...cells
                ]);

                if (cells.size === expandedCells.size) {
                    // Didn't expand to any new cells, so end the cascade.
                    clearInterval(interval);
                    console.log('cascade complete');
                    return cells;
                }
                else {
                    console.log('cascading');
                    return expandedCells;
                }
            });
        }, 333);
        return () => clearInterval(interval);
    }, [bombIndex]);

    return cascadeCells;
}
