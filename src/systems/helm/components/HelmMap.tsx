import React, { useState, useMemo, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { SpaceMap, getWorldCoordinates, getClosestCellCenter } from '../../../common/components/SpaceMap';
import { Vector2D, vectorsEqual } from '../../../common/data/Vector2D';
import { useLongPress } from '../../../common/hooks/useLongPress';
import { continuousVectorValue } from '../../../common/data/Interpolation';
import { ClientShipState } from '../../../common/data/client/ClientShipState';

const useStyles = makeStyles(theme => ({
    map: {
        width: '100vw',
        height: `calc(100vh - ${theme.spacing(7)}px)`,
    },
}));

interface Props {
    ships: Record<number, ClientShipState>;
    appendMove: (target: Vector2D) => void;
    replaceMove: (target: Vector2D) => void;
    maneuverMode: boolean;
    localShip: ClientShipState;
}

export const HelmMap: React.FC<Props> = props => {
    const classes = useStyles();

    const ships = useMemo(
        () => Object.values(props.ships),
        [props.ships]
    );
    
    const { position, futurePositions } = props.localShip;

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

    const [center, setCenter] = useState<Vector2D>(() => continuousVectorValue(position));

    const canvas = useRef<HTMLCanvasElement>(null);

    return (
        <SpaceMap
            ref={canvas}
            className={classes.map}
            gridColor={props.maneuverMode ? 'secondary' : 'primary'}
            cellRadius={cellRadius}
            setCellRadius={setCellRadius}
            center={center}
            setCenter={setCenter}
            vessels={ships}
            localVessel={props.localShip}
            highlightCells={highlightCells}
            {...useLongPress(e => {
                const { x, y } = getWorldCoordinates(canvas.current!, center, e);
                props.replaceMove(getClosestCellCenter(x, y, cellRadius));
            },
            e => {
                const { x, y } = getWorldCoordinates(canvas.current!, center, e);
                props.appendMove(getClosestCellCenter(x, y, cellRadius));
            })}
        />
    );
}
