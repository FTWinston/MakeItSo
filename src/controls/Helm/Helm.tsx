import React, { useState, useContext, useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
import { SpaceMap } from '../common/SpaceMap';
import { ShipSystem } from '../common/ShipSystem';
import { ActionButtons } from './ActionButtons';
import { EvasiveSelection } from './EvasiveSelection';
import { GameContext } from '../GameProvider';

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

    return (
        <ShipSystem>
            <SpaceMap
                className={classes.map}
                gridColor={maneuverMode ? 'secondary' : 'primary'}
                vessels={ships}
                localVessel={gameState.localShip}
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
