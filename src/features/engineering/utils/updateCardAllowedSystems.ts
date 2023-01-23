import type { ShipInfo } from 'src/types/ShipInfo';

export function updateCardAllowedSystems(state: ShipInfo) {
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