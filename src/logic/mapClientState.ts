import { FieldMappings, extraFields, anyOtherFields } from 'filter-mirror';
import { GameState } from '../common/data/server/GameState';
import { ClientGameState } from '../common/data/client/ClientGameState';
import { CellState } from '../systems/sensors/data/MinefieldData';
import { ShipState } from '../common/data/server/ShipState';
import { System } from '../common/data/System';
import { EngineeringCardData } from '../systems/engineering/data/EngineeringCard';

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
                                startTime: true,
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
                helm: {
                    waypoints: {
                        // [shouldMap]: client system is helm
                        [anyOtherFields]: true,
                    },
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
                },
                weapons: {
                    // [shouldMap]: client system is weapons
                    targetVesselId: true,
                    targetSolution: true,
                    
                    [extraFields]: {
                        targetSolutions: {
                            getValue: weapons => weapons.targetVesselId === undefined
                                ? []
                                : weapons.solutionsByTarget[weapons.targetVesselId],
                        },
                    }
                },
                sensors: {
                    // [shouldMap]: client system is sensors
                    targetVesselId: true,
                    targetSystem: true,
                    minefield: {
                        grid: {
                            [anyOtherFields]: {
                                [anyOtherFields]: {
                                    [extraFields]: {
                                        state: {
                                            getValue: cell => cell?.state as any,
                                        },
                                        content: {
                                            getValue: cell => cell?.state === CellState.Revealed
                                                ? { clue: (cell.content as any)?.clue }
                                                : {},
                                        }
                                    }
                                }
                            }
                        },
                        columns: true,
                    }
                }
            }
        },
        [extraFields]: {
            localPlayer: {
                getValue: () => client,
            },
            localShipId: {
                getValue: state => state.shipsByClient[client]!,
            },
            currentSystem: {
                getValue: state => state.ships[state.shipsByClient[client]!]!.systemsByClient[client],
            }
        }
    }
}



// From here on is a hypothetical mapping ...
// It would require filter-mirror to be a bit different.

function filterKeys<TKey extends string | number | symbol, TValue>(
    source: Partial<Record<TKey, TValue>>,
    filter: (key: TKey, value: TValue) => boolean
) {
    return Object.entries(source)
        .reduce((result, [key, value]) => {
            if (filter(key as TKey, value as TValue)) {
                result[key as TKey] = value as TValue;
            }
            return result;
        }, {} as Record<TKey, TValue>);
}

function mapKeys<TKey extends string | number | symbol, TSourceValue, TDestValue>(
    source: Partial<Record<TKey, TSourceValue>>,
    map: (key: TKey, value: TSourceValue) => TDestValue,
) {
    return Object.entries(source)
        .reduce((result, [key, value]) => {
            result[key as TKey] = map(key as TKey, value as TSourceValue);
            return result;
        }, {} as Record<TKey, TDestValue>);
}

function filterAndMapKeys<TKey extends string | number | symbol, TSourceValue, TDestValue>(
    source: Partial<Record<TKey, TSourceValue>>,
    filter: (key: TKey, value: TSourceValue) => boolean,
    map: (key: TKey, value: TSourceValue) => TDestValue,
) {
    return Object.entries(source)
        .reduce((result, [key, value]) => {
            if (filter(key as TKey, value as TSourceValue)) {
                result[key as TKey] = map(key as TKey, value as TSourceValue);
            }
            return result;
        }, {} as Record<TKey, TDestValue>);
}


function mapEngineeringCard(card: EngineeringCardData) {
    return {
        type: card.type,
        id: card.id,
        name: card.name,
        description: card.description,
        rarity: card.rarity,
        allowedSystems: card.allowedSystems,
    };
}

// Hmm, this assumes objects are recreated when their contents changes,
// in a reducer-like way.

// That's not good for patching, though...

function mapClientShip(ship: ShipState, client: string) {
    const clientSystem = ship.systemsByClient[client];

    return {
        clientsBySystem: ship.clientsBySystem,

        systemInfo: mapKeys(ship.systemInfo, (_, info) => ({
            health: info.health,
            power: info.power,
            effects: info.effects
                .map(effect => ({
                    type: effect.type,
                    startTime: effect.startTime,
                    endTime: effect.endTime,
                    positive: effect.positive,
                })),
        })),

        position: clientSystem && (clientSystem & (System.Helm | System.Weapons | System.Sensors)) !== 0
            ? ship.position
            : undefined,
        
        helm: clientSystem == System.Helm
            ? {
                waypoints: ship.helm.waypoints,
            }
            : undefined,

        engineering: clientSystem == System.Engineering
            ? {
                cardGeneration: ship.engineering.cardGeneration,
                hand: ship.engineering.hand.map(mapEngineeringCard),
                choice: ship.engineering.draftChoices[0]
                    ?.map(mapEngineeringCard),
                systemOrder: ship.engineering.systemOrder,
            }
            : undefined,

        weapons: clientSystem == System.Weapons
            ? {
                targetVesselId: ship.weapons.targetVesselId,
                targetSolution: ship.weapons.targetSolution,
                targetSolutions: ship.weapons.targetVesselId === undefined
                    ? []
                    : ship.weapons.solutionsByTarget[ship.weapons.targetVesselId],
            }
            : undefined,

        sensors: clientSystem == System.Sensors
            ? {
                targetVesselId: ship.sensors.targetVesselId,
                targetSystem: ship.sensors.targetSystem,
                minefield: ship.sensors.minefield === undefined
                    ? undefined
                    : {
                        columns: ship.sensors.minefield.columns,
                        grid: ship.sensors.minefield.grid.map(col => col === null
                            ? null
                            : col.map(cell => cell === null
                                ? null
                                : {
                                    state: cell.state,
                                    content: cell && cell.state === CellState.Revealed && cell.content.mine === 0
                                        ? { clue: cell.content.clue }
                                        : undefined,
                            }))
                    }
            }
            : undefined,
}

export function mapClientState2(state: GameState, client: string) {
    return {
        paused: state.paused,
        ships: filterAndMapKeys(
            state.ships,
            (_id, ship) => ship?.systemsByClient[client] !== undefined,
            (_id, ship) => mapClientShip(ship, client)
        ),
        localPlayer: client,
        localShipId: state.shipsByClient[client]!,
        currentSystem: state.ships[state.shipsByClient[client]!]!.systemsByClient[client],
    };
}