import { StoryObj } from '@storybook/react';
import { getClosestCellCenter, worldScaleCellRadius } from '../../../features/spacemap';
import { FakeShip } from '../../../../../classes/FakeShip';
import { Ship } from 'src/classes/Ship';
import { ManeuverType } from '../features/maneuvers';
import { HelmTraining } from './HelmTraining';
import { ShipSystem } from 'src/types/ShipSystem';
import { RelationshipType } from 'src/types/RelationshipType';

export default {
  title: 'Helm',
  component: HelmTraining,
};

type Story = StoryObj<typeof HelmTraining>;

export const Empty: Story = {
  args: {
    getInitialState: () => {
      const ship = new Ship(1, RelationshipType.Self);

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

    getOtherObjects: () => {
      const other1 = new FakeShip(
        2,
        {
          ...getClosestCellCenter(103, 5, worldScaleCellRadius),
          angle: (Math.PI * 4) / 3,
        },
        RelationshipType.Unknown,
        [ManeuverType.HardLeft, ManeuverType.SlowForward]
      );
      const other2 = new FakeShip(
        3,
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
