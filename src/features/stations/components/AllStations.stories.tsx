import { StoryObj } from '@storybook/react';
import initializeTestScenario from 'src/assets/scenarios/testScenario';
import { CombinedTraining } from './CombinedTraining';

export default {
  title: 'All Stations',
  component: CombinedTraining,
};

type Story = StoryObj<typeof CombinedTraining>;

export const TestScenario: Story = {
  args: {
    getInitialState: initializeTestScenario,
  },
};
