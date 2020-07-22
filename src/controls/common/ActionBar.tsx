import React, { useState, useContext } from 'react';
import { makeStyles, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { SystemMenu } from '../SystemMenu/SystemMenu';
import { GameContext } from '../GameProvider';
import { getPowerName, PowerLevel } from '../../data/PowerLevel';
import { PowerIcon } from './PowerIcon';

export interface Props {
}

const useStyles = makeStyles({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    powerIcon: {
        color: 'rgba(0,0,0,0.55)',
    },
    powerIconDisabled: {
        color: 'rgba(160,0,0,0.55)',
    },
});

export const ActionBar: React.FC<Props> = props => {
    const gameState = useContext(GameContext);
    
    const classes = useStyles();

    const [showNav, setShowNav] = useState(false);

    const powerLevel = gameState.powerLevels.get(gameState.currentSystem);
    
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="open menu" onClick={() => setShowNav(true)}>
                    <MenuIcon />
                </IconButton>

                <IconButton color="inherit" disabled aria-label={getPowerName(powerLevel)}>
                    <PowerIcon
                        level={powerLevel}
                        className={powerLevel === PowerLevel.Off ? classes.powerIconDisabled : classes.powerIcon}
                    />
                </IconButton>

                <div className={classes.grow} />

                {props.children}
            </Toolbar>

            <SystemMenu
                isOpen={showNav}
                close={() => setShowNav(false)}
            />
        </AppBar>
    )
}