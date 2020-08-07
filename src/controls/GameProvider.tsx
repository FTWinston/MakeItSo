import React from 'react';
import { EnhancedClientGameState } from '../data/ClientGameState';
import { ClientAction } from '../data/ClientAction';

export const GameContext = React.createContext<[EnhancedClientGameState, (action: ClientAction) => void]>(undefined!);

export const GameProvider: React.FC = props => {
    // TODO: populate this component, which should be hooked up to ... something

    return (
        <GameContext.Provider value={undefined!}>
            {props.children}
        </GameContext.Provider>
    );
};
