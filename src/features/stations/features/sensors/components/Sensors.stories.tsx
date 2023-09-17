import { StoryObj } from '@storybook/react';
import { Ship } from 'src/classes/Ship';
import { SensorsTraining } from './SensorsTraining';
import { RelationshipType } from 'src/types/RelationshipType';

export default {
  title: 'Sensors',
  component: SensorsTraining,
};

type Story = StoryObj<typeof SensorsTraining>;

export const Empty: Story = {
  args: {
    getInitialState: () => new Ship(1, RelationshipType.Friendly),
  },
};
