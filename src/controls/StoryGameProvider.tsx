import React, { useReducer, useMemo } from 'react';
import { System, allSystems } from '../data/System';
import { GameContext } from './GameProvider';
import { commonCard, uncommonCard, rareCard, epicCard } from './Engineering/PowerCard.examples';
import { clientActionReducer } from '../data/ClientActionReducer';
import { GameState } from '../data/GameState';
import { PowerLevel } from '../data/PowerLevel';
import { ClientGameState } from '../data/ClientGameState';

interface Props {
    initialSystem: System;
}

const localShipId = 1;
const localPlayerName = 'Local player';

function createInitialState(currentSystem: System): GameState {
    return {
        ships: {
            [localShipId]: {
                systemOccupancy: {
                    [currentSystem]: 'Your name',
                    [getNextSystem(currentSystem)]: 'Someone else',
                },
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
        shipsByClient: { [localPlayerName]: localShipId },
        paused: false,
    };
}

export const StoryGameProvider: React.FC<Props> = props => {
    const [gameState, dispatch] = useReducer(clientActionReducer, props.initialSystem, createInitialState);

    const clientGameState: ClientGameState = useMemo(
        () => {
            const localShipId = gameState.shipsByClient[localPlayerName];
            const systemOccupancy = gameState.ships[localShipId].systemOccupancy;
            const currentSystem = Object.keys(systemOccupancy)
                .find(system => systemOccupancy[system as unknown as System] === localPlayerName) as unknown as System | undefined;

            return {
                ...gameState,
                localPlayer: localPlayerName,
                localShip: localShipId,
                currentSystem,
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

function getNextSystem(system: System) {
    let index = allSystems.indexOf(system) + 1;

    if (index >= allSystems.length) {
        index = 0;
    }

    return allSystems[index];
}