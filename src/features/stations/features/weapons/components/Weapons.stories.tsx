import { StoryObj } from '@storybook/react';
import { Ship } from 'src/classes/Ship';
import { WeaponsTraining } from './WeaponsTraining';
import { Space } from 'src/classes/Space';
import { playerShip } from 'src/assets/shipTypes';
import { standardFactions } from 'src/assets/factions';

export default {
  title: 'Weapons',
  component: WeaponsTraining,
};

type Story = StoryObj<typeof WeaponsTraining>;

export const Empty: Story = {
  args: {
    getInitialState: () => {
      const space = new Space(standardFactions);
      const ship = new Ship(space, playerShip, { x: 0, y: 0, angle: 0 });
      return ship;
    },
  },
};
