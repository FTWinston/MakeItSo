import { StoryObj } from '@storybook/react';
import { getClosestCellCenter, worldScaleCellRadius } from '../../../features/spacemap';
import { FakeShip } from '../../../../../classes/FakeShip';
import { Ship } from 'src/classes/Ship';
import { ManeuverType } from '../features/maneuvers';
import { HelmTraining } from './HelmTraining';
import { ShipSystem } from 'src/types/ShipSystem';
import { RelationshipType } from 'src/types/RelationshipType';
import { Space } from 'src/classes/Space';

export default {
  title: 'Helm',
  component: HelmTraining,
};

type Story = StoryObj<typeof HelmTraining>;

export const Empty: Story = {
  args: {
    getInitialState: () => {
      const space = new Space();
      const ship = new Ship(space, RelationshipType.Self, { x: 0, y: 0, angle: 0 });

      const fromPos = getClosestCellCenter(0, 0, worldScaleCellRadius);
      const toPos = getClosestCellCenter(100, 0, worldScaleCellRadius);

      ship.motion = [
        {
          time: 0,
          val: {
            ...fromPos,
            angle: 0,
          },
        },
        {
          time: 5000,
          val: {
            ...toPos,
            angle: 0,
          },
        },
      ];

      return ship;
    },
    getOtherObjects: () => {
      return [];
    },
  },
};

export const Others: Story = {
  args: {
    getInitialState: () => {
      const state = Empty.args!.getInitialState!();
      state.systems.get(ShipSystem.Engines).power = 4;
      return state;
    },

    getOtherObjects: (space) => {
      const other1 = new FakeShip(
        space,
        {
          ...getClosestCellCenter(103, 5, worldScaleCellRadius),
          angle: (Math.PI * 4) / 3,
        },
        RelationshipType.Unknown,
        [ManeuverType.HardLeft, ManeuverType.SlowForward]
      );
      const other2 = new FakeShip(
        space,
        {
          ...getClosestCellCenter(98, -5, worldScaleCellRadius),
          angle: Math.PI / 3,
        },
        RelationshipType.Neutral,
        [ManeuverType.SweepRight]
      );

      return [other1, other2];
    },
  },
};
