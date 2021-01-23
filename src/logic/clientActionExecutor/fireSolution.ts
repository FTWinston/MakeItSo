import { GameState } from '../../common/data/server/GameState';
import { System } from '../../common/data/System';

export function fireSolution(state: GameState, client: string, points: number[][]) {
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
    if (solutions === undefined || weapons.targetSolution === undefined) {
        return;
    }

    const solution = solutions[weapons.targetSolution];

    if (solution === undefined) {
        return;
    }

    // TODO: test if `points` represents a success or a failure, do something either way.
    delete weapons.targetSolution;
}