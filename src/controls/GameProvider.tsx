import React from 'react';
import { System } from '../data/System';
import { PowerLevel } from '../data/PowerLevel';
import { PowerCardInfo } from '../data/PowerCard';

export interface GameState {
    update: (action: GameAction) => void;

    localPlayer: string;
    currentSystem: System;

    systemOccupancy: Map<System, string>;
    powerLevels: Map<System, PowerLevel>;

    power: {
        systemOrder: System[];
        positiveEffects: Map<System, number>;
        negativeEffects: Map<System, number>;
        hand: PowerCardInfo[];
        draftChoices: Array<PowerCardInfo[]>;
    };

    paused: boolean;
}

export type GameAction = {
    type: 'pause';
} | {
    type: 'resume';
} | {
    type: 'end game';
} | {
    type: 'select system';
    system: System;
} | {
    type: 'power draft';
    index: number;
} | {
    type: 'power play';
    cardIndex: number;
    systemIndex: number;
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
