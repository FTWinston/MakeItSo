import { StoryObj } from '@storybook/react';
import { getDefaultTrainingState } from 'src/utils/getDefaultTrainingState';
import { WeaponsTraining } from './WeaponsTraining';

export default {
    title: 'Weapons',
    component: WeaponsTraining,
};

type Story = StoryObj<typeof WeaponsTraining>;

export const Empty: Story = {
    args: {
        getInitialState: () => {
            return {
                ...getDefaultTrainingState(),
                weapons: {
                    
                },
            };
        },
    }
}
