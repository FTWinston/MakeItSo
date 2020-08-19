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
                systemInfo: {
                    [anyOtherFields]: {
                        health: true,
                        power: true,
                        effects: {
                            [anyOtherFields]: {
                                type: true,
                                duration: true,
                                endTime: true,
                                positive: true,
                            }
                        }
                    }
                },
                position: {
                    // [shouldMap]: client system is helm/weapons/sensors
                    [anyOtherFields]: {
                        [anyOtherFields]: true,
                    },
                },
                angle: {
                    // [shouldMap]: client system is helm/weapons/sensors
                    [anyOtherFields]: true,
                },
                engineering: {
                    // [shouldMap]: engineering => engineering.client === client,
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
                        0: {
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
                    systemOrder: {
                        [anyOtherFields]: true,
                    },
                    cardGeneration: true,
                }
            }
        },
        [extraFields]: {
            localPlayer: {
                getValue: () => client,
            },
            localShipId: {
                getValue: state => state.shipsByClient[client],
            },
            currentSystem: {
                getValue: state => state.ships[state.shipsByClient[client]].systemsByClient[client],
            }
        }
    }
}