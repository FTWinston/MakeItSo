import { StoryObj } from '@storybook/react';
import produce from 'immer';
import { useReducer } from 'react';
import { CellBoardDefinition } from '../types/CellBoard';
import { CellType, CountType } from '../types/CellState';
import { createCellBoardInstance } from '../utils/createCellBoardInstance';
import { generateBoard } from '../utils/generateBoard';
import { hexCellReducer } from '../utils/hexCellReducer';
import { Cells } from './Cells';

const CellsWithReducer: React.FC<CellBoardDefinition> = definition => {
    const [board, dispatch] = useReducer(produce(hexCellReducer), undefined, () => createCellBoardInstance(definition));

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

export const Simple: Story = {
    args: {
        columns: 3,
        cells: [
            {
                type: CellType.Obscured,
            },
            {
                type: CellType.Obscured,
            },
            {
                type: CellType.Obscured,
            },
            {
                type: CellType.Obscured,
            },
            {
                type: CellType.Revealed,
                countType: CountType.Normal,
                number: 2,
            },
            {
                type: CellType.Obscured,
            },
            {
                type: CellType.Obscured,
            },
            null,
            {
                type: CellType.Obscured,
            }
        ],
        underlying: [
            {
                type: CellType.Revealed,
                countType: CountType.Normal,
                number: 1,
            },
            {
                type: CellType.Revealed,
                countType: CountType.Normal,
                number: 0,
            },
            {
                type: CellType.Revealed,
                countType: CountType.Normal,
                number: 1,
            },
            {
                type: CellType.Bomb,
            },
            {
                type: CellType.Revealed,
                countType: CountType.Normal,
                number: 2,
            },
            {
                type: CellType.Bomb,
            },
            {
                type: CellType.Revealed,
                countType: CountType.Normal,
                number: 1,
            },
            null,
            {
                type: CellType.Revealed,
                countType: CountType.Normal,
                number: 1,
            }
        ],
    }
}

export const Random: Story = {
    args: generateBoard(26, 5),
}
