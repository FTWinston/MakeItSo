import { GameState } from './GameState';
import { ClientAction } from './ClientAction';

export function clientActionReducer(state: GameState, action: ClientAction): GameState {
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

        case 'power draft':
            /*
            if (statepowerDraftChoices.length > 0) {
                const chosen = powerDraftChoices[0].find(card => card.id === action.card);

                if (chosen) {
                    setPowerHand(hand => [...hand, chosen]);
                    setPowerDraftChoices(choices => {
                        const newChoices = [...choices];
                        newChoices.shift();
                        return newChoices;
                    });
                }
            }
            */
        default:
            return state;
    }
}