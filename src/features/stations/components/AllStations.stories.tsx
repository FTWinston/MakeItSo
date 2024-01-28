import { StoryObj } from '@storybook/react';
import { Ship } from 'src/classes/Ship';
import { Space } from 'src/classes/Space';
import { factions, initialize, playerShip } from 'src/assets/scenarios/testScenario';
import { CombinedTraining } from './CombinedTraining';

export default {
  title: 'All Stations',
  component: CombinedTraining,
};

type Story = StoryObj<typeof CombinedTraining>;

export const Empty: Story = {
  args: {
    getInitialState: () => { 
      const space = new Space(factions);
      const ship = new Ship(space, playerShip, { x: 0, y: 0, angle: 0 });
      return ship;
    },
  },
};

export const TestScenario: Story = {
  args: {
    getInitialState: initialize
  },
};
