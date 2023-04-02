import { CellBoard, CellBoardDefinition } from "../types/CellBoard";

export function createCellBoardInstance(definition: CellBoardDefinition): CellBoard {
    return {
        ...definition,
        numErrors: 0,
    };
}