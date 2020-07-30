import React from 'react';
import { System } from '../data/System';
import { PowerLevel } from '../data/PowerLevel';
import { PowerCardInfo } from '../data/PowerCard';

export interface GameState {
    localPlayer: string;
    currentSystem: System;

    systemOccupancy: Map<System, string>;
    powerLevels: Map<System, PowerLevel>;
    selectSystem: (system: System) => void;

    power: {
        systemOrder: System[];
        positiveEffects: Map<System, number>;
        negativeEffects: Map<System, number>;
        hand: PowerCardInfo[];
    }

    paused: boolean;
    setPaused: (paused: boolean) => void;
    
    endGame: () => void;
}

export const GameContext = React.createContext<GameState>(undefined!);

export const GameProvider: React.FC = props => {
    // TODO: populate this component, which should be hooked up to ... something

    return (
        <GameContext.Provider value={undefined!}>
            {props.children}
        </GameContext.Provider>
    );
};
