import { StoryObj } from '@storybook/react';
import { Ship } from 'src/classes/Ship';
import { SensorsTraining } from './SensorsTraining';
import { RelationshipType } from 'src/types/RelationshipType';
import { Space } from 'src/classes/Space';

export default {
  title: 'Sensors',
  component: SensorsTraining,
};

type Story = StoryObj<typeof SensorsTraining>;

export const Empty: Story = {
  args: {
    getInitialState: () => new Ship(new Space(), RelationshipType.Self, { x: 0, y: 0, angle: 0 }),
  }
}

export const Busy: Story = {
  args: {
    getInitialState: () => {
      const ship = new Ship(new Space(), RelationshipType.Self, { x: 0, y: 0, angle: 0 });

      ship.sensors.possibleTargets = [
        {
            id: 1,
            draw: 'chevron',
            rel: RelationshipType.Neutral,
            description: 'klingon cruiser',
        },
        {
            id: 2,
            draw: 'chevron',
            rel: RelationshipType.Hostile,
            description: 'romulan warbird',
        },
        {
            id: 3,
            draw: 'chevron',
            rel: RelationshipType.Friendly,
            description: 'federation scout',
        },
        {
            id: 4,
            draw: 'chevron',
            rel: RelationshipType.Unknown,
            description: 'ferengi maurauder',
        },
        {
            id: 5,
            draw: 'circle',
            rel: RelationshipType.None,
            description: 'Class M planet',
        },
        {
            id: 6,
            draw: 'chevron',
            rel: RelationshipType.Hostile,
            description: 'romulan scout',
        },
        {
            id: 7,
            draw: 'chevron',
            rel: RelationshipType.Neutral,
            description: 'klingon bird of prey',
        },
        {
            id: 8,
            draw: 'circle',
            rel: RelationshipType.None,
            description: 'Class K planet',
        },
      ];

      return ship;
    },
  },
};
