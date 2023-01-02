import { StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { Dice as DiceComponent } from './Dice';

const MultipleDice: React.FC<ComponentProps<typeof DiceComponent>> = (props) => (
    <div style={{display: 'flex', margin: '0.5em', gap: '0.5em'}}>
        <DiceComponent {...props} />
        <DiceComponent {...props} value={1} />
        <DiceComponent {...props} value={2} />
        <DiceComponent {...props} value={3} />
        <DiceComponent {...props} value={4} />
        <DiceComponent {...props} value={5} />
        <DiceComponent {...props} value={6} />
    </div>
);

export default {
    title: 'Weapons/Dice',
    component: MultipleDice,
}

type Story = StoryObj<typeof MultipleDice>;

export const Normal: Story = {
    args: {
        frozen: false,
    }
}

export const Frozen: Story = {
    args: {
        frozen: true,
    }
}