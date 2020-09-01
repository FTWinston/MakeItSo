import React, { useState } from 'react';
import { Theme } from '../../theme';
import { makeStyles } from '@material-ui/core';
import { SpaceMap } from './SpaceMap';
import { Vector2D } from '../../data/Vector2D';

export default { title: 'Common/Space Map' };

const useStyles = makeStyles(theme => ({
    map: {
        width: '100vw',
        height: '100vh',
    },
}));
    
const Simple = () => {
    const classes = useStyles();
    
    const [cellRadius, setCellRadius] = useState(32);

    const [center, setCenter] = useState<Vector2D>({ x: 0, y: 0 });

    return (
        <SpaceMap
            gridColor="primary"
            className={classes.map}
            vessels={[]}
            cellRadius={cellRadius}
            setCellRadius={setCellRadius}
            center={center}
            setCenter={setCenter}
            dragEnabled={false}
        />
    )
}

export const example = () => (
    <Theme>
        <Simple />
    </Theme>
);
