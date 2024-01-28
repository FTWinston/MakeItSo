import { EngineeringConfiguration } from '../features/engineering';
import { HelmConfiguration } from '../features/helm';
import { SensorsConfiguration } from '../features/sensors';
import { WeaponsConfiguration } from '../features/weapons';

export interface ShipConfiguration {
    engineering: EngineeringConfiguration;
    helm: HelmConfiguration;
    sensors: SensorsConfiguration;
    weapons: WeaponsConfiguration;
}