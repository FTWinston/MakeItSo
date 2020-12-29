import React, { useState, useMemo, useRef } from 'react';
import { Button, makeStyles, useTheme } from '@material-ui/core';
import { SpaceMap } from '../../../common/components/SpaceMap/SpaceMap';
import { Vector2D } from '../../../common/data/Vector2D';
import { ClientShipState } from '../../../common/data/client/ClientShipState';
import { getWorldCoordinates } from '../../../common/components/SpaceMap/drawMap';
import { TouchEvents } from '../../../common/components/TouchEvents';
import { getPositionValue } from '../../../common/data/Animation';

const useStyles = makeStyles(theme => ({
    
}));

interface Props {
    selected: (solution: number) => void;
    localShip: ClientShipState;
    targetShip: ClientShipState;
    solutions: number[];
}

export const SolutionSelection: React.FC<Props> = props => {
    const theme = useTheme();
    const classes = useStyles();

    const position = props.localShip.position;

    return (
        <div>
            Blah
            <div>
                <Button onClick={() => props.selected(13)}>Next</Button>
            </div>
        </div>
    );
}
