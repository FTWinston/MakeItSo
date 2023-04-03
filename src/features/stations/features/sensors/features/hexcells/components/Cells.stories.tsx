import { StoryObj } from '@storybook/react';
import produce from 'immer';
import { useReducer } from 'react';
import { createCellBoardInstance } from '../utils/createCellBoardInstance';
import { generateBoard, GenerationConfig } from '../utils/generateBoard';
import { hexCellReducer } from '../utils/hexCellReducer';
import { Cells } from './Cells';

const CellsWithReducer: React.FC<GenerationConfig> = config => {
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


export default {
    title: 'Sensors/Cells',
    component: CellsWithReducer,
};

type Story = StoryObj<typeof CellsWithReducer>;

export const Basic: Story = {
    args: {
        orientation: 'portrait',
        numCells: 26,
        gapFraction: 0.15,
        bombFraction: 0.2,
    },
}

export const Complex: Story = {
    args: {
        orientation: 'landscape',
        numCells: 34,
        gapFraction: 0.3,
        bombFraction: 0.25,
        unknownFraction: 0.15,
        radiusClueFraction: 0.05,
        revealFraction: 0.1,
    },
}
