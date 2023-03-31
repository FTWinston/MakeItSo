import { StoryObj } from '@storybook/react';
import { Ship } from 'src/classes/Ship';
import { WeaponsTraining } from './WeaponsTraining';

export default {
    title: 'Weapons',
    component: WeaponsTraining,
};

type Story = StoryObj<typeof WeaponsTraining>;

export const Empty: Story = {
    args: {
        getInitialState: () => new Ship(1),
    }
}