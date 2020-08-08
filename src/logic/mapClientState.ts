import { FieldMappings, extraFields, anyOtherFields } from 'filter-mirror';
import { GameState } from '../data/GameState';
import { ClientGameState } from '../data/ClientGameState';

export function mapClientState(client: string): FieldMappings<GameState, ClientGameState> {
    return {
        paused: true,
        ships: {
            [anyOtherFields]: {
                // [shouldMap]: ship => ship.systemsByClient[client] !== undefined,

                clientsBySystem: {
                    [anyOtherFields]: true,
                },
                powerLevels: {
                    [anyOtherFields]: true,
                },
                power: {
                    // [shouldMap]: power => power.client === client,
                    hand: {
                        [anyOtherFields]: {
                            type: true,
                            id: true,
                            name: true,
                            description: true,
                            rarity: true,
                            allowedSystems: true,
                        }
                    },
                    draftChoices: {
                        [0]: {
                            [anyOtherFields]: {
                                type: true,
                                id: true,
                                name: true,
                                description: true,
                                rarity: true,
                                allowedSystems: true,
                            }
                        },
                        [anyOtherFields]: {}
                    },
                    systemOrder: true,
                    effects: {
                        [anyOtherFields]: true,
                    }
                }
            }
        },
        [extraFields]: {
            localPlayer: {
                getValue: () => client,
            },
            localShipId: {
                getValue: state => state.shipsByClient[client], // TODO: just network the ID, resolve on the client, I guess! ClientGameState and EnhancedClientGameState?
            },
            currentSystem: {
                getValue: state => state.ships[state.shipsByClient[client]].systemsByClient[client],
            }
        }
    }
}