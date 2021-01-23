import { GameState } from '../../common/data/server/GameState';
import { ClientAction } from '../../common/data/ClientAction';
import { selectSystem } from './selectSystem';
import { draftCard } from './draftCard';
import { playCard } from './playCard';
import { moveShip } from './moveShip';
import { maneuverShip } from './maneuverShip';
import { targetShip } from './targetShip';
import { targetSolution } from './targetSolution';
import { fireSolution } from './fireSolution';

export function clientActionExecutor(state: GameState, action: ClientAction, client: string) {
    switch (action.type) {
        case 'pause':
            state.paused = true;
            break;

        case 'resume':
            state.paused = false;
            break;

        case 'select system':
            selectSystem(state, client, action.system);
            break;

        case 'helm move':
            moveShip(state, client, action.waypoint, action.replace);
            break;

        case 'helm maneuver':
            maneuverShip(state, client, action.pattern);
            break;

        case 'eng draft':
            draftCard(state, client, action.card);
            break;

        case 'eng play':
            playCard(state, client, action.card, action.system)
            break;

        case 'wpn target':
            targetShip(state, client, action.ship);
            break;
        
        case 'wpn solution':
            targetSolution(state, client, action.solution);
            break;

        case 'wpn fire':
            fireSolution(state, client, action.points);
            break;

        default:
            return 1 as never;
    }
}