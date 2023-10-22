import { Ship } from 'src/classes/Ship';
import { EngineeringTraining } from 'src/features/stations/features/engineering';
import { useFullscreen } from 'src/hooks/useFullscreen';
import { ShipSystem } from 'src/types/ShipSystem';
import { BackButton } from './BackButton';
import { Space } from 'src/classes/Space';
import { factions, playerShip } from 'src/assets/settings/testSetting';

export const Component: React.FC = () => {
    useFullscreen();

    return (
    <EngineeringTraining
        getInitialState={() => {
            const space = new Space(factions);
            const ship = new Ship(space, playerShip, { x: 0, y: 0, angle: 0 });
            return ship;
        }}
        getEffects={() => [
            {
                type: 'damage',
                system: ShipSystem.Shields,
                healthChange: -1,
            }
        ]}
        renderMenuItems={() => <BackButton />}
    />
    )
}
