import { EngineeringState } from 'src/features/engineering/types/EngineeringState';
import { DefiniteMap } from './DefiniteMap';
import { ShipSystem } from './ShipSystem';
import { SystemState } from './SystemState';

export interface ShipState {
    systems: DefiniteMap<ShipSystem, SystemState>;
    engineering: EngineeringState;
}