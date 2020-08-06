import { GameState } from './GameState';
import { ClientAction } from './ClientAction';

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
            const shipId = state.shipsByClient[client];
            if (shipId === undefined) {
                return state;
            }

            const ship = state.ships[shipId];
            const currentSystem = ship.systemsByClient[client];

            if (currentSystem === action.system) {
                return state;
            }

            const systemsByClient = {
                ...ship.systemsByClient,
            };

            const clientsBySystem = {
                ...ship.clientsBySystem,
            };

            if (action.system !== undefined) {
                systemsByClient[client] = action.system;
                clientsBySystem[action.system] = client;
            }
            else {
                delete systemsByClient[client];
            }

            if (currentSystem !== undefined) {
                delete clientsBySystem[currentSystem];
            }

            return {
                ...state,
                ships: {
                    ...state.ships,
                    [shipId]: {
                        ...ship,
                        systemsByClient,
                        clientsBySystem,
                    }
                }
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
           return state;

        default:
            return state;
    }
}