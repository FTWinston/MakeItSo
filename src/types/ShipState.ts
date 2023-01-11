import { EngineeringState } from 'src/features/engineering/types/EngineeringState';
import { DefiniteMap } from './DefiniteMap';
import type { ShipDestroyingSystem, ShipSystem } from './ShipSystem';
import { SystemState } from './SystemState';

export interface ShipState {
    destroyed?: ShipDestroyingSystem;
    systems: DefiniteMap<ShipSystem, SystemState>;
    engineering: EngineeringState;
}