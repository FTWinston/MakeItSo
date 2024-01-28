import { StoryObj } from '@storybook/react';
import initializeTestScenario from 'src/assets/scenarios/testScenario';
import { WeaponsTraining } from './WeaponsTraining';

export default {
  title: 'Weapons',
  component: WeaponsTraining,
};

type Story = StoryObj<typeof WeaponsTraining>;

export const Empty: Story = {
  args: {
    getInitialState: initializeTestScenario,
  },
};
