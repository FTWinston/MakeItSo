import React, { useState, useContext, useMemo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { SpaceMap } from '../common/SpaceMap';
import { ShipSystem } from '../common/ShipSystem';
import { ActionButtons } from './ActionButtons';
import { EvasiveSelection } from './EvasiveSelection';
import { GameContext } from '../GameProvider';
import { Vector2D, vectorsEqual } from '../../data/Vector2D';

const useStyles = makeStyles(theme => ({
    map: {
        width: '100vw',
        height: `calc(100vh - ${theme.spacing(7)}px)`,
    },
}));

export const Helm: React.FC = () => {
    const [gameState, dispatch] = useContext(GameContext);
    const classes = useStyles();

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

    const { position, futurePositions } = gameState.localShip;

    const highlightCells = useMemo(
        () => ({
            primary: vectorsEqual(position.current.startValue, position.current.endValue)
                ? []
                : [position.current.endValue],
            secondary: position.next
                ? [
                    position.next.value,
                    ...futurePositions
                ]
                : [
                    ...futurePositions
                ],
        }),
        [position, futurePositions]
    );

    return (
        <ShipSystem>
            <SpaceMap
                className={classes.map}
                gridColor={maneuverMode ? 'secondary' : 'primary'}
                vessels={ships}
                localVessel={gameState.localShip}
                highlightCells={highlightCells}
                onCellTap={maneuverMode ? undefined : appendMove}
                onCellLongPress={maneuverMode ? undefined : replaceMove}
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
    )
}
