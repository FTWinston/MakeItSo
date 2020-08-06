import React, { useReducer, useMemo } from 'react';
import { System, allSystems } from '../data/System';
import { GameContext } from './GameProvider';
import { commonCard, uncommonCard, rareCard, epicCard } from './Engineering/PowerCard.examples';
import { clientActionReducer } from '../data/clientActionReducer';
import { GameState } from '../data/GameState';
import { PowerLevel } from '../data/PowerLevel';
import { ClientGameState } from '../data/ClientGameState';
import { ClientAction } from '../data/ClientAction';

interface Props {
    initialSystem: System;
}

const localShipId = 1;
const localClientName = 'Local player';

const localClientReducer = (state: GameState, action: ClientAction) => clientActionReducer(state, action, localClientName);

function createInitialState(currentSystem?: System): GameState {
    const clientsBySystem: Partial<Record<System, string>> = {};
    const systemsByClient: Partial<Record<string, System>> = {};

    if (currentSystem !== undefined) {
        clientsBySystem[currentSystem] = localClientName;
        systemsByClient[localClientName] = currentSystem;
    }

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
                        commonCard(),
                        commonCard(),
                        uncommonCard(),
                        rareCard(),
                        epicCard()
                    ],
                    draftChoices: [
                        [commonCard(), commonCard(), uncommonCard()],
                        [commonCard(), rareCard(), commonCard()],
                        [commonCard(), uncommonCard(), commonCard()],
                        [uncommonCard(), commonCard(), commonCard()],
                        [commonCard(), uncommonCard(), epicCard()],
                    ],
                },
            },
        },
        shipsByClient: { [localClientName]: localShipId },
        paused: false,
    };
}

export const StoryGameProvider: React.FC<Props> = props => {
    const [gameState, dispatch] = useReducer(localClientReducer, props.initialSystem, createInitialState);

    const clientGameState: ClientGameState = useMemo(
        () => {
            const localShipId = gameState.shipsByClient[localClientName];
            const localShip = gameState.ships[localShipId];

            return {
                ...gameState,
                localPlayer: localClientName,
                localShip: localShip,
                currentSystem: localShip.systemsByClient[localClientName],
            };
        },
        [gameState]
    );

    return (
        <GameContext.Provider value={[clientGameState, dispatch]}>
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