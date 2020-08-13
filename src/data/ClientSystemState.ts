import { PowerLevel } from './PowerLevel';
import { SystemStatusEffectInfo } from './SystemStatusEffect';

export interface ClientSystemState {
    power: PowerLevel;
    health: number;
    effects: SystemStatusEffectInfo[];
}
