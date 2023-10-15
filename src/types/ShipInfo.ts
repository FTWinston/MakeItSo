import type { EngineeringState, HelmState, SensorsStateInfo, WeaponsState } from 'src/features/stations';
import type { DefiniteMap } from './DefiniteMap';
import type { ShipDestroyingSystem, ShipSystem } from './ShipSystem';
import type { SystemState } from './SystemState';
import type { GameObjectInfo } from './GameObjectInfo';

export interface ShipInfo extends GameObjectInfo {
    destroyed?: ShipDestroyingSystem;
    systems: DefiniteMap<ShipSystem, SystemState>;
    engineering: EngineeringState;
    helm: HelmState;
    sensors: SensorsStateInfo;
    weapons: WeaponsState;
}