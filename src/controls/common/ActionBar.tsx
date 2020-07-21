import React, { useState } from 'react';
import { makeStyles, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavigationMenu } from './NavigationMenu';
import { System } from '../../data/System';

export interface Props {
    currentSystem: System;
    setCurrentSystem: (system: System) => void;
    paused: boolean;
    setPaused: (paused: boolean) => void;
    endGame: () => void;
}

const useStyles = makeStyles({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
});

export const ActionBar: React.FC<Props> = props => {
    const classes = useStyles();

    const [showNav, setShowNav] = useState(false);
    
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="open menu" onClick={() => setShowNav(true)}>
                    <MenuIcon />
                </IconButton>

                <div className={classes.grow} />

                {props.children}
            </Toolbar>

            <NavigationMenu
                isOpen={showNav || props.paused}
                close={() => setShowNav(false)}
                currentSystem={props.currentSystem}
                setCurrentSystem={props.setCurrentSystem}
                endGame={props.endGame}
                isPaused={props.paused}
                setPaused={props.setPaused}
            />
        </AppBar>
    )
}