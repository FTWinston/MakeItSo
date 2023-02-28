import { StoryObj } from '@storybook/react';
import { getClosestCellCenter, worldScaleCellRadius } from 'src/features/spacemap';
import { Ship } from 'src/types/Ship';
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
            const other1 = new Ship(2);
              
            other1.motion = [
                {
                    time: 0,
                    val: {
                        ...getClosestCellCenter(103, 5, worldScaleCellRadius),
                        angle: Math.PI * 4 / 3,
                        evade: 0,
                    }
                }
            ];

            const other2 = new Ship(2);
              
            other2.motion = [
                {
                    time: 0,
                    val: {
                        ...getClosestCellCenter(98, -5, worldScaleCellRadius),
                        angle: Math.PI / 3,
                        evade: 0,
                    }
                }
            ];

            return [other1, other2];
        },
    }
}
