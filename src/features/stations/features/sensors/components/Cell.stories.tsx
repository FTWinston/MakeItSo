import { StoryObj } from '@storybook/react';
import { CellState, CountType } from '../types/CellState';
import { Cell } from './Cell';

export default {
    title: 'Sensors/Cell',
    component: Cell,
};

type Story = StoryObj<typeof Cell>;

export const Obscured: Story = {
    args: {
        state: CellState.Obscured
    }
}

export const Flagged: Story = {
    args: {
        state: CellState.Flagged
    }
}

export const Unknown: Story = {
    args: {
        state: CellState.Unknown
    }
}

export const Zero: Story = {
    args: {
        state: CellState.Revealed,
        countType: CountType.Normal,
        number: 0,
    }
}

export const Three: Story = {
    args: {
        state: CellState.Revealed,
        countType: CountType.Normal,
        number: 3,
    }
}

export const Split: Story = {
    args: {
        state: CellState.Revealed,
        countType: CountType.Split,
        number: 3,
    }
}

export const Contiguous: Story = {
    args: {
        state: CellState.Revealed,
        countType: CountType.Contiguous,
        number: 3,
    }
}

export const DoubleRadius: Story = {
    args: {
        state: CellState.Revealed,
        countType: CountType.DoubleRadius,
        number: 3,
    }
}

export const Indicator1: Story = {
    args: {
        state: CellState.IndicatorVertical,
        countType: CountType.Contiguous,
        number: 3,
    }
}

export const Indicator2: Story = {
    args: {
        state: CellState.IndicatorTLBR,
        countType: CountType.Normal,
        number: 3,
    }
}

export const Indicator3: Story = {
    args: {
        state: CellState.IndicatorTRBL,
        countType: CountType.Split,
        number: 3,
    }
}