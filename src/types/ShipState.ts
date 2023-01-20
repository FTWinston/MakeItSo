import type { EngineeringState } from 'src/features/engineering/types/EngineeringState';
import type { HelmState } from 'src/features/helm/types/HelmState';
import type { SensorsState } from 'src/features/sensors/types/SensorsState';
import type { WeaponsState } from 'src/features/weapons/types/WeaponsState';
import type { DefiniteMap } from './DefiniteMap';
import type { ShipDestroyingSystem, ShipSystem } from './ShipSystem';
import type { SystemState } from './SystemState';
import type { VesselInfo } from './VesselInfo';

export interface ShipState extends VesselInfo {
    destroyed?: ShipDestroyingSystem;
    systems: DefiniteMap<ShipSystem, SystemState>;
    engineering: EngineeringState;
    helm: HelmState;
    sensors: SensorsState;
    weapons: WeaponsState;
}