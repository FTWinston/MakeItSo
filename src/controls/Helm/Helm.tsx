import React, { useState } from 'react';
import { Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Fab, Zoom, useTheme } from '@material-ui/core';
import { Screen } from '../common/Screen';
import { SystemHeader } from '../common/SystemHeader';
import AlphaIcon from '@material-ui/icons/SwapHoriz';
import BetaIcon from '@material-ui/icons/RotateRight';
import ManoeverIcon from '@material-ui/icons/OpenWith';
import TravelIcon from '@material-ui/icons/Navigation';
import EvasiveIcon from '@material-ui/icons/TrendingUp';
import { SpaceMap } from '../common/SpaceMap';

interface Props {
    
}

const useStyles = makeStyles(theme => ({
    map: {
        width: '100vw',
        height: `calc(100vh - ${theme.spacing(7)}px)`,
    },
    fabMode: {
        position: 'absolute',
        bottom: theme.spacing(12),
        right: theme.spacing(2),
    },
    fabEvade: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        color: theme.palette.warning.contrastText,
        backgroundColor: theme.palette.warning.main,
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
        },
    },
    evasiveHeader: {
        margin: '0 0.5em',
    }
}));

export const Helm: React.FC<Props> = () => {
    const classes = useStyles();

    const theme = useTheme();
    
    const [evasiveShowing, showEvasive] = useState(false);
    const closeEvasive = () => showEvasive(false);

    const [maneuverMode, setManeuverMode] = useState(false);

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (
        <Screen>
            <SystemHeader />

            <SpaceMap
                className={classes.map}
                gridColor={maneuverMode ? 'secondary' : 'primary'}
            />

            <Zoom
                in={maneuverMode}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${maneuverMode ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
            >
                <Fab
                    color="primary"
                    className={classes.fabMode}
                    aria-label="Travel"
                    onClick={() => setManeuverMode(false)}
                >
                    <TravelIcon />
                </Fab>
            </Zoom>

            <Zoom
                in={!maneuverMode}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${!maneuverMode ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
            >
                <Fab
                    color="secondary"
                    className={classes.fabMode}
                    aria-label="Maneuver"
                    onClick={() => setManeuverMode(true)}
                >
                    <ManoeverIcon />
                </Fab>
            </Zoom>

            <Fab
                className={classes.fabEvade}
                aria-label="Evasive Maneuvers"
                onClick={() => showEvasive(!evasiveShowing)}
            >
                <EvasiveIcon />
            </Fab>

            <Drawer
                anchor="right"
                open={evasiveShowing}
                onClose={closeEvasive}
            >
                <Typography
                    variant="h5"
                    className={classes.evasiveHeader}
                >
                    Evasive Maneuvers
                </Typography>

                <List>
                    <ListSubheader>Select a pattern to perform:</ListSubheader>
                    <ListItem button onClick={closeEvasive}> {/* TODO: actually select pattern */}
                        <ListItemIcon>
                            <AlphaIcon />
                        </ListItemIcon>
                        <ListItemText primary="Alpha" secondary="Strafe unpredictably" />
                    </ListItem>
                    
                    <ListItem button onClick={closeEvasive}> {/* TODO: actually select pattern */}
                        <ListItemIcon>
                            <BetaIcon />
                        </ListItemIcon>
                        <ListItemText primary="Beta" secondary="Loop the loop" />
                    </ListItem>
                </List>
            </Drawer>
        </Screen>
    )
}
