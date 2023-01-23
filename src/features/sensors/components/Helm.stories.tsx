import { StoryObj } from '@storybook/react';
import { getDefaultTrainingState } from 'src/utils/getDefaultSystemStates';
import { SensorsTraining } from './SensorsTraining';

export default {
    title: 'Sensors',
    component: SensorsTraining,
};

type Story = StoryObj<typeof SensorsTraining>;

export const Empty: Story = {
    args: {
        getInitialState: () => {
            return {
                ...getDefaultTrainingState(),
                sensors: {
                    
                },
            };
        },
    }
}
