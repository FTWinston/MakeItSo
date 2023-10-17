import { StoryObj } from '@storybook/react';
import { Ship } from 'src/classes/Ship';
import { WeaponsTraining } from './WeaponsTraining';
import { RelationshipType } from 'src/types/RelationshipType';
import { Space } from 'src/classes/Space';

export default {
  title: 'Weapons',
  component: WeaponsTraining,
};

type Story = StoryObj<typeof WeaponsTraining>;

export const Empty: Story = {
  args: {
    getInitialState: () => {
      const space = new Space();
      const ship = new Ship(space, RelationshipType.Self, { x: 0, y: 0, angle: 0 });
      return ship;
    },
  },
};
