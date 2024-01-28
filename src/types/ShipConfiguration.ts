import { EngineeringConfiguration } from 'src/features/stations/features/engineering';
import { HelmConfiguration } from 'src/features/stations/features/helm';
import { SensorsConfiguration } from 'src/features/stations/features/sensors';
import { WeaponsConfiguration } from 'src/features/stations/features/weapons';

export interface ShipConfiguration {
    engineering: EngineeringConfiguration;
    helm: HelmConfiguration;
    sensors: SensorsConfiguration;
    weapons: WeaponsConfiguration;
}