import React, { useState, useMemo, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import { SpaceMap } from '../../../common/components/SpaceMap/SpaceMap';
import { Vector2D } from '../../../common/data/Vector2D';
import { ClientShipState } from '../../../common/data/client/ClientShipState';
import { getWorldCoordinates } from '../../../common/components/SpaceMap/drawMap';
import { TouchEvents } from '../../../common/components/TouchEvents';
import { getPositionValue } from '../../../common/data/Animation';

const useStyles = makeStyles(theme => ({
    map: {
        width: '100vw',
        height: `calc(100vh - ${theme.spacing(7)}px)`,
    },
}));

interface Props {
    ships: Record<number, ClientShipState>;
    localShip: ClientShipState;
}

export const WeaponMap: React.FC<Props> = props => {
    const theme = useTheme();
    const classes = useStyles();

    const ships = useMemo(
        () => Object.values(props.ships),
        [props.ships]
    );

    const canvas = useRef<HTMLCanvasElement>(null);
    
    const position = props.localShip.position;

    const [cellRadius, setCellRadius] = useState(32);

    const [center, setCenter] = useState<Vector2D>(() => getPositionValue(position));

    // TODO: whatever's needed here

    return (
        <SpaceMap
            ref={canvas}
            className={classes.map}
            gridColor="primary"
            dragEnabled={true}
            cellRadius={cellRadius}
            setCellRadius={setCellRadius}
            center={center}
            setCenter={setCenter}
            vessels={ships}
            localVessel={props.localShip}
        />
    );
}
