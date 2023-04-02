import { useEffect, useRef } from 'react';
import { getAdjacentCells } from '../utils/getAdjacentCells';

/** Return a set of cell indexes that, once cascading is true, expands at a regular interval, adding all adjacent cells each time. */
export function useCellCascade(cascading: boolean, columns: number, rows: number): Set<number> {
    const cascadeCellsRef = useRef(new Set<number>());

    useEffect(() => {
        if (!cascading) {
            return;
        }

        const interval = setTimeout(() => {
            const cascadeCells = cascadeCellsRef.current;

            const expandedCells = new Set(
                [...cascadeCells]
                    .flatMap(cellIndex => getAdjacentCells(cellIndex, columns, rows))
            );
            
            if (expandedCells.size === cascadeCells.size) {
                // Didn't expand to any new cells, so end the cascade.
                clearInterval(interval);
            }
            else {
                // Did expand to new cells, so add the expanded set to the list of bombed cells.
                for (const cell of expandedCells) {
                    cascadeCells.add(cell);
                }
            }
        }, 333);
        return () => clearInterval(interval);
    }, [cascading]);

    return cascadeCellsRef.current;
}
