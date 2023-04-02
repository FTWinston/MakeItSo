import { CellBoard, CellBoardDefinition } from "../types/CellBoard";
import { CellType } from '../types/CellState';

export function createCellBoardInstance(definition: CellBoardDefinition): CellBoard {
    return {
        ...definition,
        numErrors: 0,
        numBombs: definition.cells
            .filter(cell => cell?.type === CellType.Bomb)
            .length
    };
}