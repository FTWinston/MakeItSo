import { Ship } from 'src/classes/Ship';
import { HelmTraining } from 'src/features/stations/features/helm';
import { useFullscreen } from 'src/hooks/useFullscreen';
import { getClosestCellCenter, worldScaleCellRadius } from 'src/features/stations/features/spacemap';
import { BackButton } from './BackButton';
import { Space } from 'src/classes/Space';
import { playerShip } from 'src/types/ShipType';

export const Component: React.FC = () => {
    useFullscreen();
    
    return (
    <HelmTraining
        getInitialState={() => {
            const space = new Space();
            const fromPos = getClosestCellCenter(0, 0, worldScaleCellRadius);
            const toPos = getClosestCellCenter(100, 0, worldScaleCellRadius);

            const ship = new Ship(space, playerShip, { x: fromPos.x, y: fromPos.y, angle: 0 });
            
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
        renderMenuItems={() => <BackButton />}
    />
    );
}
