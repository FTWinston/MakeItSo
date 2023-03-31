import { StoryObj } from '@storybook/react';
import { CellType, CountType } from '../types/CellState';
import { Cells } from './Cells';

export default {
    title: 'Sensors/Cells',
    component: Cells,
};

type Story = StoryObj<typeof Cells>;

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
                type: CellType.Flagged,
            },
            {
                type: CellType.Revealed,
                countType: CountType.Normal,
                number: 2,
            },
            {
                type: CellType.Flagged,
            },
            {
                type: CellType.Obscured,
            },
            null,
            {
                type: CellType.Obscured,
            }
        ],
        onClick: index => console.log(`Clicked cell #${index}`),
    }
}
