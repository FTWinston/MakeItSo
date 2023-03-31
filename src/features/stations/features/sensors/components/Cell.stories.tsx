import { StoryObj } from '@storybook/react';
import { CellType, CountType } from '../types/CellState';
import { Cell } from './Cell';

export default {
    title: 'Sensors/Cell',
    component: Cell,
};

type Story = StoryObj<typeof Cell>;

export const Obscured: Story = {
    args: {
        cellType: CellType.Obscured
    }
}

export const Flagged: Story = {
    args: {
        cellType: CellType.Flagged
    }
}

export const Unknown: Story = {
    args: {
        cellType: CellType.Unknown
    }
}

export const Zero: Story = {
    args: {
        cellType: CellType.Revealed,
        countType: CountType.Normal,
        number: 0,
    }
}

export const Three: Story = {
    args: {
        cellType: CellType.Revealed,
        countType: CountType.Normal,
        number: 3,
    }
}

export const Split: Story = {
    args: {
        cellType: CellType.Revealed,
        countType: CountType.Split,
        number: 3,
    }
}

export const Contiguous: Story = {
    args: {
        cellType: CellType.Revealed,
        countType: CountType.Contiguous,
        number: 3,
    }
}

export const DoubleRadius: Story = {
    args: {
        cellType: CellType.Revealed,
        countType: CountType.DoubleRadius,
        number: 3,
    }
}

export const Indicator1: Story = {
    args: {
        cellType: CellType.IndicatorVertical,
        countType: CountType.Contiguous,
        number: 3,
    }
}

export const Indicator2: Story = {
    args: {
        cellType: CellType.IndicatorTLBR,
        countType: CountType.Normal,
        number: 3,
    }
}

export const Indicator3: Story = {
    args: {
        cellType: CellType.IndicatorTRBL,
        countType: CountType.Split,
        number: 3,
    }
}