import { StoryObj } from '@storybook/react';
import initializeTestScenario from 'src/assets/scenarios/testScenario';
import { CombinedTraining } from './CombinedTraining';
import { ShipConfiguration } from 'src/types/ShipConfiguration';

export default {
  title: 'All Stations',
  component: CombinedTraining,
};

type Story = StoryObj<typeof CombinedTraining>;

const configuration: ShipConfiguration = {
  engineering: {},
  helm: {},
  sensors: {},
  weapons: {},
};

export const TestScenario: Story = {
  args: {
    getInitialState: () => initializeTestScenario(configuration),
  },
};
