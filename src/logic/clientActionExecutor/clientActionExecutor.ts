import { GameState } from '../../data/GameState';
import { ClientAction } from '../../data/ClientAction';
import { selectSystem } from './selectSystem';
import { draftCard } from './draftCard';
import { playCard } from './playCard';

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

        case 'power play':
            playCard(state, client, action.card, action.system)
            break;

        default:
            return 1 as never;
    }
}