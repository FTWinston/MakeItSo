import { StoryObj } from '@storybook/react';
import { Ship } from 'src/classes/Ship';
import { SensorsTraining } from './SensorsTraining';
import { Space } from 'src/classes/Space';
import { FakeShip } from 'src/classes/FakeShip';
import { Position } from 'src/types/Position';
import { GameObject } from 'src/classes/GameObject';
import { playerShip, neutralShip, hostileShip, friendlyShip, unknownShip } from 'src/assets/shipTypes';
import { standardFactions } from 'src/assets/factions';

export default {
  title: 'Sensors',
  component: SensorsTraining,
};

type Story = StoryObj<typeof SensorsTraining>;

export const Empty: Story = {
  args: {
    getInitialState: () => new Ship(new Space(standardFactions), playerShip, { x: 0, y: 0, angle: 0 }),
  }
}

export const Busy: Story = {
  args: {
    getInitialState: () => {
      const space = new Space(standardFactions);
      const zero: Position = { x: 0, y: 0, angle: 0 };

      const ship = new Ship(space, playerShip, zero);

      const otherObjects: GameObject[] = [
        new FakeShip(space, neutralShip, zero),
        new FakeShip(space, hostileShip, zero),
        new FakeShip(space, friendlyShip, zero),
        new FakeShip(space, unknownShip, zero),
        
        // new StaticObject(space, zero, RelationshipType.None), // description: Class M Planet

        new FakeShip(space, hostileShip, zero),
        new FakeShip(space, neutralShip, zero),

        // new StaticObject(space, zero, RelationshipType.None), // description: Class K Planet
      ];


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
