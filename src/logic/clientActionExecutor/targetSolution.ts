import { GameState } from '../../common/data/server/GameState';
import { System } from '../../common/data/System';

export function targetSolution(state: GameState, client: string, solutionIndex?: number) {
    const clientShipId = state.shipsByClient[client];
    if (clientShipId === undefined) {
        return;
    }

    const clientShip = state.ships[clientShipId];
    if (clientShip === undefined) {
        return;
    }

    const weapons = clientShip.weapons;
    
    if (weapons.targetVesselId === undefined) {
        return;
    }

    const currentSystem = clientShip.systemsByClient[client];

    if (currentSystem !== System.Weapons) {
        return;
    }

    const solutions = weapons.solutionsByTarget[weapons.targetVesselId];

    if (solutionIndex === undefined || solutions === undefined 
        || solutionIndex < 0 || solutionIndex >= solutions.length) {
        delete weapons.targetSolution;
        return;
    }    
 
    clientShip.weapons.targetSolution = solutionIndex;
}