import React, { useState, useContext, useMemo, useCallback } from 'react';
import { ShipSystem } from '../../../common/components/ShipSystem';
import { ActionButtons } from './ActionButtons';
import { EvasiveSelection } from './EvasiveSelection';
import { GameContext } from '../../../common/components/GameProvider';
import { Vector2D } from '../../../common/data/Vector2D';
import { HelmMap } from './HelmMap';

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

    const [maneuverMode, setManeuverMode] = useState(false);

    const ships = useMemo(
        () => Object.values(gameState.ships),
        [gameState.ships]
    );

    const appendMove = useCallback(
        (target: Vector2D, angle?: number) => dispatch({
            type: 'helm move',
            target,
            angle,
        }),
        [dispatch]
    );

    return (
        <ShipSystem>
            <HelmMap
                maneuverMode={maneuverMode}
                ships={ships}
                localShip={gameState.localShip}
                appendMove={appendMove}
            />

            <ActionButtons
                maneuverMode={maneuverMode}
                setManeuverMode={setManeuverMode}
                showEvasive={showEvasive}
            />

            <EvasiveSelection
                open={evasiveShowing}
                close={closeEvasive}
            />
        </ShipSystem>
    );
}
