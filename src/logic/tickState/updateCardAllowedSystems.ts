import { ShipState } from '../../common/data/server/ShipState';

export function updateCardAllowedSystems(ship: ShipState) {
    for (const card of ship.engineering.hand) {
        if (card.determineAllowedSystems) {
            const allowedSystems = card.determineAllowedSystems(ship);
            if (allowedSystems !== card.allowedSystems) {
                card.allowedSystems = allowedSystems;
            }
        }
    }
}
