import React, { useState, useMemo } from 'react';
import { System, allSystems } from '../data/System';
import { GameState, GameContext } from './GameProvider';
import { PowerLevel } from '../data/PowerLevel';

interface Props {
    initialSystem: System;
}

export const StoryGameProvider: React.FC<Props> = props => {
    const [paused, setPaused] = useState(false);
    const [currentSystem, setCurrentSystem] = useState(props.initialSystem);

    const gameState: GameState = useMemo(
        () => ({
            localPlayer: 'Your Name',
            currentSystem,
            systemOccupancy: new Map([
                [currentSystem, 'Your name'],
                [getNextSystem(currentSystem), 'Someone else'],
            ]),
            powerLevels: new Map([
                [System.Helm, PowerLevel.High],
                [System.FTL, PowerLevel.Low],
                [System.Weapons, PowerLevel.Off],
                [System.Sensors, PowerLevel.Full],
                [System.Engineering, PowerLevel.Med],
                [System.DamageControl, PowerLevel.High],
            ]),
            power: {
                systemOrder: [
                    System.Helm,
                    System.FTL,
                    System.Weapons,
                    System.Sensors,
                    System.Engineering,
                    System.DamageControl,
                ],
                positiveEffects: new Map([
                    [System.Helm, 1],
                    [System.Weapons, 2]
                ]),
                negativeEffects: new Map([
                    [System.DamageControl, 3],
                    [System.Weapons, 1]
                ]),
            },
            selectSystem: setCurrentSystem,
            paused,
            setPaused,
            endGame: () => alert('game ended'),
        }),
        [paused, currentSystem]
    );

    return (
        <GameContext.Provider value={gameState}>
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