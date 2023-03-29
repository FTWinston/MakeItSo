import { Ship } from 'src/classes/Ship';
import { EngineeringTraining } from 'src/features/stations/features/engineering';
import { useFullscreen } from 'src/hooks/useFullscreen';
import { ShipSystem } from 'src/types/ShipSystem';
import { BackButton } from './BackButton';

export const Component: React.FC = () => {
    useFullscreen();

    return (
    <EngineeringTraining
        getInitialState={() => new Ship(1)}
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
