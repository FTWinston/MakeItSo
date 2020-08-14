import React, { useState, Dispatch, useMemo, useEffect } from 'react';
import { multiFilter, PatchOperation } from 'filter-mirror';
import { apply_patch } from 'jsonpatch';
import { System } from '../data/System';
import { GameContext } from './GameProvider';
import { clientActionExecutor } from '../logic/clientActionExecutor';
import { GameState } from '../data/GameState';
import { PowerLevel } from '../data/PowerLevel';
import { ClientGameState, EnhancedClientGameState, enhanceState } from '../data/ClientGameState';
import { ClientAction } from '../data/ClientAction';
import { createCard } from '../data/EngineeringCards';
import { mapClientState } from '../logic/mapClientState';
import { tickState } from '../logic/tickState';

interface Props {
    initialSystem: System;
}

const localShipId = 1;
const localClientName = 'Local player';

function createInitialState(currentSystem?: System): GameState {
    const clientsBySystem: Partial<Record<System, string>> = {};
    const systemsByClient: Partial<Record<string, System>> = {};

    if (currentSystem !== undefined) {
        clientsBySystem[currentSystem] = localClientName;
        systemsByClient[localClientName] = currentSystem;
    }

    let nextCardId = 1;

    return {
        ships: {
            [localShipId]: {
                clientsBySystem,
                systemsByClient,
                systemInfo: {
                    [System.Helm]: {
                        power: PowerLevel.Med,
                        basePower: PowerLevel.Med,
                        health: 100,
                        effects: [],
                    },
                    [System.FTL]: {
                        power: PowerLevel.Med,
                        basePower: PowerLevel.Med,
                        health: 100,
                        effects: [],
                    },
                    [System.Weapons]: {
                        power: PowerLevel.Med,
                        basePower: PowerLevel.Med,
                        health: 100,
                        effects: [],
                    },
                    [System.Sensors]: {
                        power: PowerLevel.Med,
                        basePower: PowerLevel.Med,
                        health: 100,
                        effects: [],
                    },
                    [System.Engineering]: {
                        power: PowerLevel.Med,
                        basePower: PowerLevel.Med,
                        health: 100,
                        effects: [],
                    },
                    [System.DamageControl]: {
                        power: PowerLevel.Med,
                        basePower: PowerLevel.Med,
                        health: 100,
                        effects: [],
                    },
                },
                power: {
                    systemOrder: [
                        System.Helm,
                        System.FTL,
                        System.Weapons,
                        System.Sensors,
                        System.Engineering,
                        System.DamageControl,
                    ],
                    hand: [
                        createCard(nextCardId++),
                        createCard(nextCardId++),
                        createCard(nextCardId++),
                        createCard(nextCardId++),
                    ],
                    draftChoices: [
                        [createCard(nextCardId++), createCard(nextCardId++), createCard(nextCardId++)],
                        [createCard(nextCardId++), createCard(nextCardId++), createCard(nextCardId++)],
                        [createCard(nextCardId++), createCard(nextCardId++), createCard(nextCardId++)],
                        [createCard(nextCardId++), createCard(nextCardId++), createCard(nextCardId++)],
                    ],
                    nextCardId,
                    generationProgress: 0,
                },
            },
        },
        shipsByClient: { [localClientName]: localShipId },
        paused: false,
    };
}

const patches: PatchOperation[] = [];

function useGameStateReducer(initialSystem?: System): [EnhancedClientGameState, Dispatch<ClientAction>] {
    const [clientState, setClientState] = useState<EnhancedClientGameState>(undefined!);

    const gameState = useMemo(
        () => {
            const rawState = createInitialState(initialSystem);

            const {
                proxy: gameStateProxy,
                createMirror,
            } = multiFilter<GameState, ClientGameState, string>(rawState, mapClientState);

            const clientMirror = createMirror(localClientName, patch => {
                console.log('patch', patch);
                patches.push(patch);
            });

            setClientState(enhanceState(JSON.parse(JSON.stringify(clientMirror))));

            return gameStateProxy;
        },
        [initialSystem]
    );

    useEffect(() => {
        const interval = setInterval(() => {
            tickState(gameState, 0.05);

            if (patches.length === 0) {
                return;
            }

            let patchBatch = patches.slice();
            setClientState(clientState => enhanceState(apply_patch(clientState, patchBatch)));

            patches.splice(0, patches.length);
        }, 50);

        return () => {
            clearInterval(interval);
            patches.splice(0, patches.length);
        }
    }, [gameState]);

    const actionExecutor = (action: ClientAction) => {
        clientActionExecutor(gameState, action, localClientName);
        setClientState(clientState => enhanceState(clientState));
    };

    return [clientState, actionExecutor];
}

export const StoryGameProvider: React.FC<Props> = props => {
    const [clientGameState, actionExecutor] = useGameStateReducer(props.initialSystem);

    return (
        <GameContext.Provider value={[clientGameState, actionExecutor]}>
            {props.children}
        </GameContext.Provider>
    );
};
