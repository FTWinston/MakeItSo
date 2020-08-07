import { GameState } from '../../data/GameState';
import { ClientAction } from '../../data/ClientAction';
import { selectSystem } from './selectSystem';
import { draftCard } from './draftCard';

// It strikes me that the server state doesn't need updated like a reducer at all...
// as long as we're using FilterMirror to produce client states. D'oh!
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

        case 'power draft':
            draftCard(state, client, action.card);
            break;

        default:
            return 1 as never;
    }
}