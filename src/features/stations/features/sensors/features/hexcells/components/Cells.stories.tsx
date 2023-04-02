import { StoryObj } from '@storybook/react';
import produce from 'immer';
import { useReducer } from 'react';
import { CellBoardDefinition } from '../types/CellBoard';
import { CellType, CountType } from '../types/CellState';
import { hexCellReducer } from '../utils/hexCellReducer';
import { Cells } from './Cells';

const CellsWithReducer: React.FC<CellBoardDefinition> = props => {
    const [board, dispatch] = useReducer(produce(hexCellReducer), props);

    return (
        <Cells
            cells={board.cells}
            columns={board.columns}
            revealCell={index => dispatch({ type: 'reveal', index })}
            flagCell={index => dispatch({ type: 'flag', index })}
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
