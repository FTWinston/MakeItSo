import { getTime, hasCompleted } from '../../data/Progression';
import { SystemState } from '../../data/SystemState';

export function removeExpiredEffects(systemState: SystemState) {
    const currentTime = getTime();
        
    const filteredEffects = systemState.effects.filter(effect => {
        if (hasCompleted(effect, currentTime)) {
            effect.remove(systemState);
            return false;
        }

        return true;
    });
    
    if (filteredEffects.length < systemState.effects.length) {
        systemState.effects = filteredEffects;
    }
}
