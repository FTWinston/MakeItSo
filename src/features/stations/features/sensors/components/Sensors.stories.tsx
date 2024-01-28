import { StoryObj } from '@storybook/react';
import { SensorsTraining } from './SensorsTraining';
import initializeTestScenario from 'src/assets/scenarios/testScenario';

export default {
  title: 'Sensors',
  component: SensorsTraining,
};

type Story = StoryObj<typeof SensorsTraining>;

export const Empty: Story = {
  args: {
    getInitialState: () => {
      const ship = initializeTestScenario();
      
      for (const other of ship.space.objects.keys()) {
        ship.space.remove(other);
      }

      return ship;
    }
  }
}

export const Busy: Story = {
  args: {
    getInitialState: () => {
      const ship = initializeTestScenario();

      const otherObjects = [...ship.space.objects.values()]
        .filter(object => object.id !== ship.id);

      ship.sensors.possibleTargets = otherObjects.map(object => ({
        id: object.id,
        draw: object.draw,
        faction: object.faction,
        description: 'Some Target',
      }));

      return ship;
    },
  },
};
