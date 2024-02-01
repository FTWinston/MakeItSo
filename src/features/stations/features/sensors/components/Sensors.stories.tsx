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
      const space = initializeTestScenario();
      
      const idsToRemove = [...space.objects.keys()]
        .filter(id => id !== 1);

      for (const id of idsToRemove) {
        space.objects.get(id)?.delete();
      }

      return space;
    }
  }
}

export const Busy: Story = {
  args: {
    getInitialState: () => {
      const space = initializeTestScenario();
      
      return space;
    },
  },
};
