import React, { useState, useMemo } from 'react';
import { System } from '../data/System';

interface GameState {
    currentSystem: System;
    setCurrentSystem: (system: System) => void;

    paused: boolean;
    setPaused: (paused: boolean) => void;
    endGame: () => void;
}

export const GameContext = React.createContext<GameState>(undefined!);

// TODO: add an actual GameProvider component, which is hooked up to ... something

export const StoryGameProvider: React.FC = props => {
    const [paused, setPaused] = useState(false);
    const [currentSystem, setCurrentSystem] = useState(System.Helm);

    const gameState = useMemo(
        () => ({
            currentSystem,
            setCurrentSystem,
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
