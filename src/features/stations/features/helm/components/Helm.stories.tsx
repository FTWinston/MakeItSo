import { StoryObj } from '@storybook/react';
import initializeTestScenario from 'src/assets/scenarios/testScenario';
import { Ship } from 'src/classes/Ship';
import { ShipSystem } from 'src/types/ShipSystem';
import { HelmTraining } from './HelmTraining';

export default {
  title: 'Helm',
  component: HelmTraining,
};

type Story = StoryObj<typeof HelmTraining>;

export const Empty: Story = {
  args: {
    getInitialState: () => {
      const space = initializeTestScenario();

      const idsToRemove = [...space.objects.keys()]
        .filter(id => id !== 1);

      for (const id of idsToRemove) {
        space.objects.get(id)?.delete();
      }

      return space;
    }
  },
};

export const Others: Story = {
  args: {
    getInitialState: () => {
      const space = initializeTestScenario();
      const ship = space.objects.get(1) as Ship;
      ship.systems.get(ShipSystem.Engines).power = 4;
      return space;
    },
  },
};
