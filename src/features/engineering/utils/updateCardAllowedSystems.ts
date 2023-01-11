import type { ShipState } from 'src/types/ShipState';

export function updateCardAllowedSystems(state: ShipState) {
    for (const card of state.engineering.handCards) {
        if (!card.determineAllowedSystems) {
            continue;
        }

        const newAllowedSystems = card.determineAllowedSystems(state);
        
        if (newAllowedSystems !== card.allowedSystems) {
            card.allowedSystems = newAllowedSystems;
        }
    }
}