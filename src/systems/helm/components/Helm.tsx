import React, { useState, useContext, useMemo, useCallback } from 'react';
import { ShipSystem } from '../../../common/components/ShipSystem';
import { ActionButtons } from './ActionButtons';
import { EvasiveSelection } from './EvasiveSelection';
import { GameContext } from '../../../common/components/GameProvider';
import { Vector2D } from '../../../common/data/Vector2D';
import { HelmMap } from './HelmMap';

export const Helm: React.FC = () => {
    const [gameState, dispatch] = useContext(GameContext);

    const [evasiveShowing, showEvasive] = useState(false);
    const closeEvasive = () => showEvasive(false);

    const [maneuverMode, setManeuverMode] = useState(false);

    const ships = useMemo(
        () => Object.values(gameState.ships),
        [gameState.ships]
    );

    const appendMove = useCallback(
        (target: Vector2D) => dispatch({
            type: 'helm move',
            target,
            append: true,
        }),
        [dispatch]
    );

    const replaceMove = useCallback(
        (target: Vector2D) => dispatch({
            type: 'helm move',
            target,
            append: false,
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
                replaceMove={replaceMove}
            />

            <ActionButtons
                maneuverMode={maneuverMode}
                setManeuverMode={setManeuverMode}
                showEvasive={() => showEvasive(true)}
            />

            <EvasiveSelection
                open={evasiveShowing}
                close={closeEvasive}
            />
        </ShipSystem>
    );
}
