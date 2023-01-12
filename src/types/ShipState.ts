import { EngineeringState } from 'src/features/engineering/types/EngineeringState';
import { HelmState } from 'src/features/helm/types/HelmState';
import { DefiniteMap } from './DefiniteMap';
import type { ShipDestroyingSystem, ShipSystem } from './ShipSystem';
import { SystemState } from './SystemState';

export interface ShipState {
    destroyed?: ShipDestroyingSystem;
    systems: DefiniteMap<ShipSystem, SystemState>;
    engineering: EngineeringState;
    helm: HelmState;
}