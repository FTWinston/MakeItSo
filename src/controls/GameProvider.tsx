import React from 'react';
import { ClientGameState } from '../data/ClientGameState';
import { ClientAction } from '../data/ClientAction';

export const GameContext = React.createContext<[ClientGameState, (action: ClientAction) => void]>(undefined!);

export const GameProvider: React.FC = props => {
    // TODO: populate this component, which should be hooked up to ... something

    return (
        <GameContext.Provider value={undefined!}>
            {props.children}
        </GameContext.Provider>
    );
};
