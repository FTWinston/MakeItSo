import { useEffect } from 'react';
import { Ship } from 'src/classes/Ship';
import { HelmTraining } from 'src/features/helm';
import { enterFullscreen } from 'src/features/layout';
import { getClosestCellCenter, worldScaleCellRadius } from 'src/features/spacemap';

export const Component: React.FC = () => {
    useEffect(() => { enterFullscreen() }, []);
    
    return (
    <HelmTraining
        getInitialState={() => {
            const ship = new Ship(1);
            
            const fromPos = getClosestCellCenter(0, 0, worldScaleCellRadius);
            const toPos = getClosestCellCenter(100, 0, worldScaleCellRadius);

            ship.motion = [
                {
                    time: 0,
                    val: {
                        ...fromPos,
                        angle: 0,
                    }
                }, {
                    time: 5000,
                    val: {
                        ...toPos,
                        angle: 0,
                    }
                }
            ];
            
            return ship;
        }}
        getOtherObjects={() => []}
    />
    );
}
