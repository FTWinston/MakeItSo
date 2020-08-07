import React, { useReducer, useMemo, useState } from 'react';
import { multiFilter } from 'filter-mirror';
import { System, allSystems } from '../data/System';
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



export const StoryGameProvider: React.FC<Props> = props => {
    const [[gameState, clientGameState]] = useState<[GameState, ClientGameState]>(() => {
        const rawState = createInitialState(props.initialSystem);

        const {
            proxy,
            createMirror,
        } = multiFilter<GameState, ClientGameState, string>(rawState, mapClientState);

        const clientMirror = createMirror(localClientName);

        return [proxy, clientMirror];
    })

    const [enhancedClientState, setEnhancedClientState] = useState<EnhancedClientGameState>(() => enhanceState(clientGameState));

    const actionExecutor = (action: ClientAction) => {
        clientActionExecutor(gameState, action, localClientName);
        setEnhancedClientState(enhanceState(clientGameState));
    };

    return (
        <GameContext.Provider value={[enhancedClientState, actionExecutor]}>
            {props.children}
        </GameContext.Provider>
    );
};

function getNextSystem(system?: System) {
    if (system === undefined)
    {
        return allSystems[0];
    }

    let index = allSystems.indexOf(system) + 1;

    if (index >= allSystems.length) {
        index = 0;
    }

    return allSystems[index];
}