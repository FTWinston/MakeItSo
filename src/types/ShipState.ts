import { EngineeringState } from 'src/features/engineering/types/EngineeringState';
import { ShipSystem } from './ShipSystem';
import { SystemState } from './SystemState';

export interface ShipState {
    systems: Record<ShipSystem, SystemState>;
    engineering: EngineeringState;
}