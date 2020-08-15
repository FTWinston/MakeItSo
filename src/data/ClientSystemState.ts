import { PowerLevel } from './PowerLevel';
import { ClientSystemStatusEffectInstance } from './SystemStatusEffect';

export interface ClientSystemState {
    power: PowerLevel;
    health: number;
    effects: ClientSystemStatusEffectInstance[];
}
