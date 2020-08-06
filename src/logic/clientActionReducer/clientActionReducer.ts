import { GameState } from '../../data/GameState';
import { ClientAction } from '../../data/ClientAction';
import { selectSystem } from './selectSystem';
import { draftCard } from './draftCard';

export function clientActionReducer(state: GameState, action: ClientAction, client: string): GameState {
    switch (action.type) {
        case 'pause':
            return {
                ...state,
                paused: true,
            };

        case 'resume':
            return {
                ...state,
                paused: false,
            };

        case 'select system':
            return selectSystem(state, client, action.system);

        case 'power draft':
            return draftCard(state, client, action.card);

        default:
            return state;
    }
}