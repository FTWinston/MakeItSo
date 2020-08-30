import React, { useState, useContext, useMemo, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { SpaceMap, getWorldCoordinates, getClosestCellCenter } from '../../../common/components/SpaceMap';
import { ShipSystem } from '../../../common/components/ShipSystem';
import { ActionButtons } from './ActionButtons';
import { EvasiveSelection } from './EvasiveSelection';
import { GameContext } from '../../../common/components/GameProvider';
import { Vector2D, vectorsEqual } from '../../../common/data/Vector2D';
import { useLongPress } from '../../../common/hooks/useLongPress';
import { continuousVectorValue } from '../../../common/data/Interpolation';

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

    const [cellRadius, setCellRadius] = useState(32);

    const [center, setCenter] = useState<Vector2D>(() => {
        if (!gameState.localShip) {
            return { x: 0, y: 0 };
        }

        return continuousVectorValue(gameState.localShip.position);
    });

    const canvas = useRef<HTMLCanvasElement>(null);

    return (
        <ShipSystem>
            <SpaceMap
                ref={canvas}
                className={classes.map}
                gridColor={maneuverMode ? 'secondary' : 'primary'}
                cellRadius={cellRadius}
                setCellRadius={setCellRadius}
                center={center}
                setCenter={setCenter}
                vessels={ships}
                localVessel={gameState.localShip}
                highlightCells={highlightCells}
                {...useLongPress(e => {
                    const { x, y } = getWorldCoordinates(canvas.current!, center, e);
                    replaceMove(getClosestCellCenter(x, y, cellRadius));
                },
                e => {
                    const { x, y } = getWorldCoordinates(canvas.current!, center, e);
                    appendMove(getClosestCellCenter(x, y, cellRadius));
                })}
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
