import { StoryObj } from '@storybook/react';
import { getDefaultTrainingState } from 'src/utils/getDefaultTrainingState';
import { HelmTraining } from './HelmTraining';

export default {
    title: 'Helm',
    component: HelmTraining,
};

type Story = StoryObj<typeof HelmTraining>;

export const Empty: Story = {
    args: {
        getInitialState: () => {
            return getDefaultTrainingState();
        },
    }
}
