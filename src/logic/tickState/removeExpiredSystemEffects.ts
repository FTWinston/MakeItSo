import { ShipState } from '../../data/ShipState';
import { System } from '../../data/System';

export function removeExpiredEffects(ship: ShipState) {
    const currentTime = Date.now();
    
    for (const systemId in ship.systemInfo) {
        const system = systemId as unknown as System;
        const systemState = ship.systemInfo[system];
        
        const filteredEffects = systemState.effects.filter(effect => {
            if (effect.removeTime > currentTime) {
                return true;
            }
    
            effect.remove(systemState);
            return false;
        });
        
        if (filteredEffects.length < systemState.effects.length) {
            systemState.effects = filteredEffects;
        }
    }
}