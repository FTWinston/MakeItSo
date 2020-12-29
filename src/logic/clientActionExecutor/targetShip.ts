import { GameState } from '../../common/data/server/GameState';
import { System } from '../../common/data/System';

export function targetShip(state: GameState, client: string, targetVesselId?: number) {
    const clientShipId = state.shipsByClient[client];
    if (clientShipId === undefined) {
        return;
    }

    const clientShip = state.ships[clientShipId];
    if (clientShip === undefined) {
        return;
    }

    const currentSystem = clientShip.systemsByClient[client];

    if (currentSystem !== System.Weapons) {
        return;
    }

    if (targetVesselId !== undefined) {
        const targetVessel = state.ships[targetVesselId];

        if (!targetVessel) {
            targetVesselId = undefined;
        }
    }

    clientShip.weapons.targetVesselId = targetVesselId;
    delete clientShip.weapons.targetSolutionId;

    // TODO: get possible solutions?
}