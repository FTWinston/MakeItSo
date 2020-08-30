import React, { useState, Dispatch, useMemo, useEffect } from 'react';
import { multiFilter, PatchOperation } from 'filter-mirror';
import { apply_patch } from 'jsonpatch';
import { System } from '../data/System';
import { GameContext } from './GameProvider';
import { clientActionExecutor } from '../../logic/clientActionExecutor';
import { GameState } from '../data/server/GameState';
import { ClientGameState, EnhancedClientGameState, enhanceState } from '../data/client/ClientGameState';
import { ClientAction } from '../data/ClientAction';
import { mapClientState } from '../../logic/mapClientState';
import { tickState } from '../../logic/tickState';
import { createShipState } from '../../logic/createShipState';

interface Props {
    initialSystem: System;
}

const localShipId = 1;
const localClientName = 'Local player';

function createInitialState(currentSystem?: System): GameState {
    const shipState = createShipState();

    if (currentSystem !== undefined) {
        shipState.clientsBySystem[currentSystem] = localClientName;
        shipState.systemsByClient[localClientName] = currentSystem;
    }

    return {
        ships: {
            [localShipId]: shipState,
        },
        shipsByClient: { [localClientName]: localShipId },
        paused: false,
    };
}

const patches: PatchOperation[] = [];

function useGameStateReducer(initialSystem?: System): [EnhancedClientGameState, Dispatch<ClientAction>] {
    const [clientState, setClientState] = useState<EnhancedClientGameState>(undefined!);

    const gameState = useMemo(
        () => {
            const rawState = createInitialState(initialSystem);

            const {
                proxy: gameStateProxy,
                createMirror,
            } = multiFilter<GameState, ClientGameState, string>(rawState, mapClientState);

            const clientMirror = createMirror(localClientName, patch => {
                console.log('patch', patch);
                patches.push(patch);
            });

            setClientState(enhanceState(JSON.parse(JSON.stringify(clientMirror))));

            return gameStateProxy;
        },
        [initialSystem]
    );

    useEffect(() => {
        const interval = setInterval(() => {
            tickState(gameState, 0.05);

            if (patches.length === 0) {
                return;
            }

            let patchBatch = patches.slice();
            setClientState(clientState => enhanceState(apply_patch(clientState, patchBatch)));

            patches.splice(0, patches.length);
        }, 50);

        return () => {
            clearInterval(interval);
            patches.splice(0, patches.length);
        }
    }, [gameState]);

    const actionExecutor = (action: ClientAction) => {
        clientActionExecutor(gameState, action, localClientName);
        setClientState(clientState => enhanceState(clientState));
    };

    return [clientState, actionExecutor];
}

export const StoryGameProvider: React.FC<Props> = props => {
    const [clientGameState, actionExecutor] = useGameStateReducer(props.initialSystem);

    return (
        <GameContext.Provider value={[clientGameState, actionExecutor]}>
            {props.children}
        </GameContext.Provider>
    );
};
