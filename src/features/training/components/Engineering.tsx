import { useEffect } from 'react';
import { Ship } from 'src/classes/Ship';
import { EngineeringTraining } from 'src/features/engineering';
import { enterFullscreen } from 'src/features/layout';
import { ShipSystem } from 'src/types/ShipSystem';

export const Component: React.FC = () => {
    useEffect(() => { enterFullscreen() }, []);

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
    />
    )
}
