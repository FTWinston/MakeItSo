import produce from 'immer';
import { useReducer } from 'react';
import { Cells, hexCellReducer } from 'src/features/stations/features/sensors/features/hexcells';
import { createCellBoardInstance } from 'src/features/stations/features/sensors/features/hexcells/utils/createCellBoardInstance';
import { GenerationConfig, generateBoard } from 'src/features/stations/features/sensors/features/hexcells/utils/generateBoard';

const config: GenerationConfig = {
    orientation: 'portrait',
    numCells: 34,
    gapFraction: 0.3,
    bombFraction: 0.25,
    unknownFraction: 0.15,
    radiusClueFraction: 0.05,
    revealFraction: 0.1,
    contiguousClueFraction: 0.5,
    splitClueFraction: 0.4,
};

export const Component: React.FC = () => {
    const [board, dispatch] = useReducer(produce(hexCellReducer), undefined, () => createCellBoardInstance(generateBoard(config)));

    return (
        <Cells
            cells={board.cells}
            columns={board.columns}
            revealCell={index => setTimeout(() => dispatch({ type: 'reveal', index }), 200)}
            flagCell={index => setTimeout(() => dispatch({ type: 'flag', index }), 200)}
            numBombs={board.numBombs}
            numErrors={board.numErrors}
            result={board.result}
            errorIndex={board.errorIndex}
        />
    )
}
