import { StoryObj } from '@storybook/react';
import { getClosestCellCenter, worldScaleCellRadius } from 'src/features/spacemap';
import { FakeShip } from 'src/types/FakeShip';
import { Ship } from 'src/types/Ship';
import { ManeuverType } from '../features/maneuvers';
import { HelmTraining } from './HelmTraining';

export default {
    title: 'Helm',
    component: HelmTraining,
};

type Story = StoryObj<typeof HelmTraining>;

export const Empty: Story = {
    args: {
        getInitialState: () => {
            const ship = new Ship(1);
            
            const fromPos = getClosestCellCenter(0, 0, worldScaleCellRadius);
            const toPos = getClosestCellCenter(100, 0, worldScaleCellRadius);

            ship.motion = [
                {
                    time: 0,
                    val: {
                        ...fromPos,
                        angle: 0,
                        evade: 0,
                    }
                }, {
                    time: 5000,
                    val: {
                        ...toPos,
                        angle: 0,
                        evade: 0,
                    }
                }
            ];
            
            return ship;
        },
        getOtherObjects: () => {
            return [];
        }
    }
}

export const Others: Story = {
    args: {
        getInitialState: Empty.args?.getInitialState,

        getOtherObjects: () => {
            const other1 = new FakeShip(
                2,
                {
                    ...getClosestCellCenter(103, 5, worldScaleCellRadius),
                    angle: Math.PI * 4 / 3,
                    evade: 0,  
                },
                [ManeuverType.HardLeft, ManeuverType.SlowForward]
            );
            const other2 = new FakeShip(
                3,
                {
                    ...getClosestCellCenter(98, -5, worldScaleCellRadius),
                    angle: Math.PI / 3,
                    evade: 0,
                },
                [ManeuverType.SweepRight]
            );

            return [other1, other2];
        }
    }
}
