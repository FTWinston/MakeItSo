import React, { useState, useContext, useMemo, useCallback } from 'react';
import { ShipSystem } from '../../../common/components/ShipSystem';
import { ActionButtons } from './ActionButtons';
import { EvasiveSelection } from './EvasiveSelection';
import { GameContext } from '../../../common/components/GameProvider';
import { HelmMap } from './HelmMap';
import { Waypoint } from '../../../common/data/Waypoint';

export const Helm: React.FC = () => {
    const [gameState, dispatch] = useContext(GameContext);

    const [evasiveShowing, setEvasiveShowing] = useState(false);
    const showEvasive = useCallback(
        () => setEvasiveShowing(true),
        []
    );
    const closeEvasive = useCallback(
        () => setEvasiveShowing(false),
        []
    );

    const [replaceMode, setReplaceMode] = useState(false);

    const ships = useMemo(
        () => Object.values(gameState.ships),
        [gameState.ships]
    );

    const appendMove = useCallback(
        (waypoint: Waypoint) => dispatch({
            type: 'helm move',
            waypoint,
            replace: replaceMode
        }),
        [dispatch, replaceMode]
    );

    const maneuver = useCallback(
        (pattern: string) => dispatch({
            type: 'helm maneuver',
            pattern,
        }),
        [dispatch]
    );

    return (
        <ShipSystem>
            <HelmMap
                replaceMode={replaceMode}
                ships={ships}
                localShip={gameState.localShip}
                addWaypoint={appendMove}
            />

            <ActionButtons
                replaceMode={replaceMode}
                setReplaceMode={setReplaceMode}
                showEvasive={showEvasive}
            />

            <EvasiveSelection
                open={evasiveShowing}
                close={closeEvasive}
                select={maneuver}
            />
        </ShipSystem>
    );
}
