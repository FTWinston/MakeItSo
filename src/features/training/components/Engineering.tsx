import { Ship } from 'src/classes/Ship';
import { EngineeringTraining } from 'src/features/engineering';
import { ShipSystem } from 'src/types/ShipSystem';

export const Component: React.FC = () => (
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