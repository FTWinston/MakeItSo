import React, { useContext } from 'react';
import { makeStyles, AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { GameContext } from '../GameProvider';
import { getPowerName, PowerLevel } from '../../data/PowerLevel';
import { PowerIcon } from './PowerIcon';
import { getSystemName } from '../../data/System';

export interface Props {
    showMenu: () => void;
}

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
    powerIcon: {
        color: 'rgba(0,0,0,0.55) !important',
    },
    powerIconDisabled: {
        color: 'rgba(160,0,0,0.55)',
    },
}));

export const SystemHeader: React.FC<Props> = props => {
    const [gameState] = useContext(GameContext);
    
    const classes = useStyles();

    const powerLevel = gameState.currentSystem === undefined
        ? PowerLevel.Off
        : gameState.localShip.powerLevels[gameState.currentSystem];
    
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                    onClick={props.showMenu}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" className={classes.title}>
                    {getSystemName(gameState.currentSystem)}
                </Typography>

                <Button
                    color="inherit"
                    disabled
                    className={classes.powerIcon}
                    
                    endIcon={<PowerIcon
                        level={powerLevel}
                        className={powerLevel === PowerLevel.Off ? classes.powerIconDisabled : classes.powerIcon}
                        aria-label={getPowerName(powerLevel)}
                    />}
                >
                    Power
                </Button>
            </Toolbar>

            {props.children}
        </AppBar>
    )
}