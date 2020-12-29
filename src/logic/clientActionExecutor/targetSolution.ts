import { GameState } from '../../common/data/server/GameState';
import { System } from '../../common/data/System';

export function targetSolution(state: GameState, client: string, solutionId?: number) {
    const clientShipId = state.shipsByClient[client];
    if (clientShipId === undefined) {
        return;
    }

    const clientShip = state.ships[clientShipId];
    if (clientShip === undefined || clientShip.weapons.targetVesselId === undefined) {
        return;
    }

    const currentSystem = clientShip.systemsByClient[client];

    if (currentSystem !== System.Weapons) {
        return;
    }

    if (solutionId === undefined) {
        delete clientShip.weapons.targetSolutionId;
        return;
    }    
    
    // TODO: ensure this is a valid solution

    clientShip.weapons.targetSolutionId = solutionId;
}