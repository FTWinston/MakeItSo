import React, { useState, useMemo, useCallback } from 'react';
import { System, allSystems } from '../data/System';
import { GameState, GameContext, GameAction } from './GameProvider';
import { PowerLevel } from '../data/PowerLevel';
import { commonCard, uncommonCard, rareCard, epicCard } from './Engineering/PowerCard.examples';

interface Props {
    initialSystem: System;
}

export const StoryGameProvider: React.FC<Props> = props => {
    const [paused, setPaused] = useState(false);
    const [currentSystem, setCurrentSystem] = useState(props.initialSystem);

    const update = useCallback((action: GameAction) => {
        switch (action.type) {
            case 'pause':
                setPaused(true);
                break;
            case 'resume':
                setPaused(false);
                break;
            case 'end game':
                alert('game ended');
                break;
            case 'select system':
                setCurrentSystem(action.system);
                break;
            case 'power draft':

                break;
            case 'power play':

                break;
        }
    }, []);

    const gameState: GameState = useMemo(
        () => ({
            update,
            paused,
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
                hand: [
                    commonCard,
                    commonCard,
                    uncommonCard,
                    rareCard,
                    epicCard
                ],
                draftChoices: [
                    [commonCard, commonCard, uncommonCard],
                    [commonCard, rareCard, commonCard],
                ],
            },
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