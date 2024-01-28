import { getDefaultEngineeringConfiguration } from '../features/engineering';
import { getDefaultHelmConfiguration } from '../features/helm';
import { getDefaultSensorsConfiguration } from '../features/sensors';
import { getDefaultWeaponsConfiguration } from '../features/weapons';
import { ShipConfiguration } from '../types/ShipConfiguration';

export function getDefaultShipConfiguration(): ShipConfiguration {
    return {
        engineering: getDefaultEngineeringConfiguration(),
        helm: getDefaultHelmConfiguration(),
        sensors: getDefaultSensorsConfiguration(),
        weapons: getDefaultWeaponsConfiguration(),
    };
}