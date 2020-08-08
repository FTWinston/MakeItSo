import React, { useState, Dispatch, useMemo } from 'react';
import { multiFilter } from 'filter-mirror';
import { apply_patch } from 'jsonpatch';
import { System } from '../data/System';
import { GameContext } from './GameProvider';
import { clientActionExecutor } from '../logic/clientActionExecutor';
import { GameState } from '../data/GameState';
import { PowerLevel } from '../data/PowerLevel';
import { ClientGameState, EnhancedClientGameState, enhanceState } from '../data/ClientGameState';
import { ClientAction } from '../data/ClientAction';
import { createCard } from '../data/PowerCards';
import { mapClientState } from '../logic/mapClientState';

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
                powerLevels: {
                    [System.Helm]: PowerLevel.High,
                    [System.FTL]: PowerLevel.Low,
                    [System.Weapons]: PowerLevel.Off,
                    [System.Sensors]: PowerLevel.Full,
                    [System.Engineering]: PowerLevel.Med,
                    [System.DamageControl]: PowerLevel.High,
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
                    effects: {    
                        [System.Helm]: [],
                        [System.FTL]: [],
                        [System.Weapons]: [],
                        [System.Sensors]: [],
                        [System.Engineering]: [],
                        [System.DamageControl]: [],
                    },
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
                },
            },
        },
        shipsByClient: { [localClientName]: localShipId },
        paused: false,
    };
}

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
                setClientState(clientState => enhanceState(apply_patch(clientState, [patch])));
            });

            setClientState(enhanceState(JSON.parse(JSON.stringify(clientMirror))));

            return gameStateProxy;
        },
        [initialSystem]
    );

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
