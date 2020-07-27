import React from 'react';
import { Theme } from '../../style/theme';
import { makeStyles } from '@material-ui/core';
import { SpaceMap } from './SpaceMap';

export default { title: 'Common/Space Map' };

const useStyles = makeStyles(theme => ({
    map: {
        width: '100vw',
        height: '100vh',
    },
}));
    
const Simple = () => {
    const classes = useStyles();
    
    return (
        <SpaceMap gridColor="primary" className={classes.map} />
    )
}

export const example = () => (
    <Theme>
        <Simple />
    </Theme>
);
